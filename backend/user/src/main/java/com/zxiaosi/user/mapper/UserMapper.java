package com.zxiaosi.user.mapper;

import com.zxiaosi.user.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 用户 Mapper
 */
@Mapper
public interface UserMapper {

    /**
     * 根据 用户id 获取用户信息
     */
    User getUserByUserId(Integer userId);

    /**
     * 根据 openId 获取用户信息
     */
    User getUserByOpenId(String openId);

    /**
     * 根据 用户名 获取用户信息
     */
    User getUserByUsername(String username);

    /**
     * 插入用户信息
     */
    void insertUser(User user);

    /**
     * 根据 用户id 更新用户信息
     */
    void updateUserByUserId(User user);

    /**
     * 根据 用户名 更新密码
     */
    Integer updatePasswordByUsername(@Param("username") String username, @Param("password") String password);

}
