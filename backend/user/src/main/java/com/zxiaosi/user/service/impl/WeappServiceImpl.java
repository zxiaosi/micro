package com.zxiaosi.user.service.impl;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaFoxUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.Header;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.common.constants.DeviceTypeEnum;
import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.constants.WeappScanLoginEnum;
import com.zxiaosi.common.exception.CustomException;
import com.zxiaosi.user.entity.User;
import com.zxiaosi.user.entity.vo.WeappLoginVo;
import com.zxiaosi.user.mapper.UserMapper;
import com.zxiaosi.user.service.WeappService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

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

    @Autowired
    private UserMapper userMapper;

    @Override
    public String getAccessTokenService() {
        if (StrUtil.isAllBlank(appid, appSecret, accessTokenKey)) {
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
        if (StrUtil.isEmpty(envVersion)) {
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

    @Override
    public JSONObject getOpenIdSessionKeyService(String code) {
        if (StrUtil.isAllBlank(appid, appSecret, accessTokenKey)) {
            throw new CustomException(ResponseEnum.EMPTY_WEAPP.getMsg(), ResponseEnum.EMPTY_WEAPP.getCode());
        }

        // 设置请求url
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code";
        String replaceUrl = url.replace("{0}", appid).replace("{1}", appSecret).replace("{2}", code);

        // 发送请求
        String result = HttpUtil.get(replaceUrl);

        return JSON.parseObject(result);
    }

    @Override
    public String createTokenService(WeappLoginVo weappLoginVo) {
        if (appid.equals(weappLoginVo.getAppId())) {
            throw new CustomException("appId 错误");
        }

        JSONObject openIdSessionKey = this.getOpenIdSessionKeyService(weappLoginVo.getCode());

        String openId = openIdSessionKey.getString("openid");

        if (StrUtil.isEmpty(openId)) {
            throw new CustomException("向微信服务器发送请求: code换取openId请求错误!");
        }

        User user = userMapper.getUserByOpenId(openId);

        if (ObjectUtils.isEmpty(user)) {
            // 设置密码
            String text = "123456";  // 初始密码
            String md5 = SaSecureUtil.md5(text);  // md5加密
            String pw_hash = BCrypt.hashpw(md5, BCrypt.gensalt()); // BCrypt加密

            user = new User();
            user.setOpenId(openId);
            user.setUsername(SaFoxUtil.getRandomString(6));
            user.setPassword(pw_hash);
            userMapper.insertUser(user);
        }

        // 登录用户
        StpUtil.login(user.getId(), weappLoginVo.getDeviceType());

        return StpUtil.getTokenValue();
    }
}
