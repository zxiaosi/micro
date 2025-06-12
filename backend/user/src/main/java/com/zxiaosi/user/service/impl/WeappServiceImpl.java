package com.zxiaosi.user.service.impl;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.hutool.http.Header;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.constants.WeappScanLoginEnum;
import com.zxiaosi.common.exception.CustomException;
import com.zxiaosi.user.service.WeappService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@RefreshScope // 刷新 Nacos 值
@Service
public class WeappServiceImpl implements WeappService {

    @Value("${config.weapp.appid}")
    private String appid;

    @Value("${config.weapp.appSecret}")
    private String appSecret;

    @Value("${config.weapp.accessTokenKey}")
    private String accessTokenKey;

    @Value("${config.weapp.envVersion}")
    private String envVersion;

    @Autowired
    private SaTokenDao saTokenDao;

    @Override
    public String getAccessTokenService() {
        if (appid == null || appSecret == null || accessTokenKey == null) {
            throw new CustomException(ResponseEnum.EMPTY_WEAPP.getMsg(), ResponseEnum.EMPTY_WEAPP.getCode());
        }

        // 从 redis 中获取 access_token
        long timeout = saTokenDao.getTimeout(accessTokenKey);

        // 如果不存在, 则从微信服务器获取, 否则从 redis 中获取
        if (timeout == SaTokenDao.NOT_VALUE_EXPIRE) {
            // 设置请求url
            String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}";
            String requestUrl = url.replace("{0}", appid).replace("{1}", appSecret);

            // 发送请求
            String result = HttpUtil.get(requestUrl);
            // 解析结果
            JSONObject object = JSON.parseObject(result);
            String accessToken = object.getString("access_token");
            Long expiresIn = object.getLong("expires_in");

            // 保存到 redis 中
            saTokenDao.set(accessTokenKey, accessToken, expiresIn);

            return accessToken;
        } else {
            return saTokenDao.get(accessTokenKey);
        }
    }

    @Override
    public byte[] getUnlimitedQRCodeService(String scene) {
        if (envVersion == null) {
            throw new CustomException(ResponseEnum.EMPTY_WEAPP.getMsg(), ResponseEnum.EMPTY_WEAPP.getCode());
        }

        // 获取 access_token
        String accessToken = this.getAccessTokenService();

        // 设置请求url
        String url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token={0}";
        String requestUrl = url.replace("{0}", accessToken);

        // 设置请求参数
        HashMap<String, Object> params = new HashMap<>();
        params.put("scene", scene);
        params.put("env_version", envVersion);
        params.put("is_hyaline", true);
        String requestParams = JSON.toJSONString(params);

        // 发送请求
        HttpResponse response = HttpRequest.post(requestUrl)
                .header(Header.CONTENT_TYPE, "application/json")
                .body(requestParams)
                .execute();

        // 设置登录周期
        String code = WeappScanLoginEnum.NO_SCAN.getCode().toString();
        saTokenDao.set(scene, code, SaTokenDao.NEVER_EXPIRE);

        return response.bodyBytes();
    }
}
