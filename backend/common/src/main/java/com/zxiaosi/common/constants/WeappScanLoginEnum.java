package com.zxiaosi.common.constants;

import lombok.Getter;

/**
 * 微信小程序 扫码登录枚举
 */
@Getter
public enum WeappScanLoginEnum {

    EXPIRED(-1, "已过期"),

    NO_SCAN(0, "未扫码"),

    SCAN(1, "已扫码"),

    SUCCESS(2, "成功"),

    FAIL(3, "失败");

    /**
     * 二维码状态
     */
    private final Integer code;

    /**
     * 二维码状态描述
     */
    private final String msg;

    WeappScanLoginEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    /**
     * 根据code获取message
     */
    public static String getMsgByCode(int code) {
        for (WeappScanLoginEnum response : WeappScanLoginEnum.values()) {
            if (response.getCode().equals(code)) {
                return response.getMsg();
            }
        }
        return null;
    }
}
