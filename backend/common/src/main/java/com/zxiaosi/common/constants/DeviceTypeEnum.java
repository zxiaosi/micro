package com.zxiaosi.common.constants;

import lombok.Getter;

/**
 * 登录设备枚举
 */
@Getter
public enum DeviceTypeEnum {
    WEB(1, "Web"),

    WEAPP(2, "Weapp"),

    APP(3, "App"),

    PC(4, "PC");


    /**
     * 二维码状态
     */
    private final Integer code;

    /**
     * 二维码状态描述
     */
    private final String msg;

    DeviceTypeEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    /**
     * 根据code获取message
     */
    public static String getMsgByCode(int code) {
        for (DeviceTypeEnum response : DeviceTypeEnum.values()) {
            if (response.getCode().equals(code)) {
                return response.getMsg();
            }
        }
        return null;
    }
}
