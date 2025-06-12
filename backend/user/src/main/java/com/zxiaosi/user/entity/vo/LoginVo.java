package com.zxiaosi.user.entity.vo;

import com.zxiaosi.common.constants.DeviceTypeEnum;
import lombok.Data;

/**
 * 登录参数
 */
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
    private String deviceType = DeviceTypeEnum.WEB.getMsg();

}
