package com.zxiaosi.user.service;

/**
 * 微信小程序服务
 */
public interface WeappService {

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html">
     * 获取 微信小程序 access_token
     * </a>
     */
    String getAccessTokenService();

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qr-code/getUnlimitedQRCode.html">
     * 获取 微信小程序 二维码
     * </a>
     *
     * @param scene 扫码场景值
     */
    byte[] getUnlimitedQRCodeService(String scene);
}
