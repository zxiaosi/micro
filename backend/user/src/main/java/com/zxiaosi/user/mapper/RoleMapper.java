package com.zxiaosi.user.mapper;

import com.zxiaosi.user.entity.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 角色 Mapper
 */
@Mapper
public interface RoleMapper {

    /**
     * 根据 用户id 获取角色集合
     */
    List<Role> getRolesByUserId(Integer userId);
}
