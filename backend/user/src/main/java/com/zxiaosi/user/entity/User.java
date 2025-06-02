package com.zxiaosi.user.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户实体类
 */
@Data
public class User implements Serializable {

    /**
     * 用户id
     */
    private Integer id;

    /**
     * 微信id
     */
    @JsonIgnore
    private String openId;

    /**
     * 用户昵称
     */
    private String username;

    /**
     * 用户密码
     */
    @JsonIgnore
    private String password;

    /**
     * 用户手机号
     */
    private String phone;

    /**
     * 用户头像
     */
    private String avatar;

    /**
     * 是否删除 0:未删除 1:已删除
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
}
