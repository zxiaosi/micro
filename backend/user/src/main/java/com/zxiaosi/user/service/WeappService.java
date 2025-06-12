package com.zxiaosi.user.service;

import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.user.entity.vo.WeappLoginVo;

/**
 * 微信小程序服务
 */
public interface WeappService {

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html">
     * 获取 access_token
     * </a>
     */
    String getAccessTokenService();

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qr-code/getUnlimitedQRCode.html">
     * 获取 二维码
     * </a>
     *
     * @param scene 扫码场景值
     */
    byte[] getUnlimitedQRCodeService(String scene);

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html">
     * 获取 登录凭证
     * </a>
     *
     * @param code wx.login() 获取的 code
     */
    JSONObject getOpenIdSessionKeyService(String code);

    /**
     * 根据 code 创建 token
     *
     * @param weappLoginVo  微信小程序登录信息
     */
    String createTokenService(WeappLoginVo weappLoginVo);
}
