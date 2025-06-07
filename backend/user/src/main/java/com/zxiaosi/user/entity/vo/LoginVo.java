package com.zxiaosi.user.entity.vo;

import lombok.Data;

@Data
public class LoginVo {

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 设备类型
     */
    private String deviceType = "Web";

}
