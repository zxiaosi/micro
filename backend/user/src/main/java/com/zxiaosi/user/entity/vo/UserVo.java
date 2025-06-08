package com.zxiaosi.user.entity.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zxiaosi.user.entity.Role;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

/**
 * 用户信息
 */
@Data
public class UserVo {
    /**
     * 用户id
     */
    private Integer id;

    /**
     * 用户昵称
     */
    private String username;

    /**
     * 用户手机号
     */
    private String phone;

    /**
     * 用户邮箱
     */
    private String email;

    /**
     * 用户头像
     */
    private String avatar;

    /**
     * 是否删除
     */
    private Integer isDeleted;

    /**
     * 创建时间
     */
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createTime;

    /**
     * 更新时间
     */
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date updateTime;

    /**
     * 用户角色
     */
    private List<Role> roles;
}
