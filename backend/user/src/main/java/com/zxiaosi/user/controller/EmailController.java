package com.zxiaosi.user.controller;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.util.SaFoxUtil;
import cn.dev33.satoken.util.SaResult;
import com.zxiaosi.user.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 邮件接口
 */
@RestController
@RequestMapping("/email")
@RefreshScope // 刷新 Nacos 值
public class EmailController {

    @Autowired
    private SaTokenDao saTokenDao;

    @Autowired
    private EmailService emailService;

    @Value("${custom.mail.time}")
    private long time;

    @RequestMapping("/send")
    public SaResult send(@RequestParam String email) {
        // 生成随机验证码
        String captcha = SaFoxUtil.getRandomString(6);

        // 获取邮箱验证码的剩余存活时间
        long timeout = saTokenDao.getTimeout(email);
        if (timeout != SaTokenDao.NOT_VALUE_EXPIRE) {
            saTokenDao.delete(email); // 删除旧的验证码
        }

        // 存储验证码
        saTokenDao.set(email, captcha, time);
        emailService.sendMail(email, "验证码", "网站注册验证码：" + captcha + "。");
        return SaResult.ok();
    }

    @RequestMapping("/verify")
    public SaResult verify(@RequestParam String email, @RequestParam String code) {
        String number = saTokenDao.get(email);
        if (number == null) {
            return SaResult.error("验证码已过期");
        }
        if (!number.equals(code)) {
            return SaResult.error("验证码错误");
        }
        return SaResult.ok();
    }
}
