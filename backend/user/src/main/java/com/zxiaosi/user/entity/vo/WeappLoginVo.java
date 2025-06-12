package com.zxiaosi.user.entity.vo;

import com.zxiaosi.common.constants.DeviceTypeEnum;
import lombok.Data;

@Data
public class WeappLoginVo {
    /**
     * wx.login() 获取到的 code
     */
    private String code;

    /**
     * appId
     */
    private String appId;

    /**
     * 设备类型
     */
    private String deviceType = DeviceTypeEnum.WEAPP.getMsg();
}
