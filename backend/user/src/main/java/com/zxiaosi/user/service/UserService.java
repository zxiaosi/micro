package com.zxiaosi.user.service;

import com.zxiaosi.user.entity.vo.LoginVo;
import com.zxiaosi.user.entity.vo.UserVo;

public interface UserService {

    /**
     * 检验用户名和密码
     *
     * @param loginVo 用户名密码
     */
    Boolean checkUsernamePasswordService(LoginVo loginVo);

    /**
     * 根据用户Id获取当前用户信息(包含权限)
     *
     * @param userId 用户Id
     */
    UserVo getUserByIdService(Integer userId);

}
