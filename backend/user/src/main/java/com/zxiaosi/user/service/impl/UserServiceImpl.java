package com.zxiaosi.user.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.exception.CustomException;
import com.zxiaosi.user.entity.Role;
import com.zxiaosi.user.entity.User;
import com.zxiaosi.user.entity.vo.LoginVo;
import com.zxiaosi.user.entity.vo.UserVo;
import com.zxiaosi.user.mapper.RoleMapper;
import com.zxiaosi.user.mapper.UserMapper;
import com.zxiaosi.user.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleMapper roleMapper;


    @Override
    public Boolean checkUsernamePasswordService(LoginVo loginVo) {
        // 1. 查询用户
        User user = userMapper.getUserByUsername(loginVo.getUsername());
        if (ObjectUtils.isEmpty(user))
            throw new CustomException(ResponseEnum.EMPTY_USERNAME.getMsg(), ResponseEnum.EMPTY_USERNAME.getCode());

        // 2. 校验密码
        boolean flag = BCrypt.checkpw(loginVo.getPassword(), user.getPassword());

        if (flag) {
            StpUtil.login(user.getId(), loginVo.getDeviceType());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public UserVo getUserByIdService(Integer userId) {
        // 1. 查询用户
        User user = userMapper.getUserByUserId(userId);
        if (ObjectUtils.isEmpty(user))
            throw new CustomException(ResponseEnum.USERNAME_OR_PASSWORD_ERROR.getMsg(), ResponseEnum.USERNAME_OR_PASSWORD_ERROR.getCode());

        // 2. 转换为VO
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(user, userVo);

        // 2. 设置用户角色
        List<Role> roles = roleMapper.getRolesByUserId(user.getId());
        if (!roles.isEmpty()) {
            userVo.setRoles(roles);
        } else {
            throw new CustomException(ResponseEnum.FORBIDDEN.getMsg(), ResponseEnum.FORBIDDEN.getCode());
        }

        return userVo;
    }


}
