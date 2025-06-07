package com.zxiaosi.user.entity.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zxiaosi.user.entity.Role;
import lombok.Data;

import java.util.Date;
import java.util.List;

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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    /**
     * 更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    /**
     * 用户角色
     */
    private List<Role> roles;
}
