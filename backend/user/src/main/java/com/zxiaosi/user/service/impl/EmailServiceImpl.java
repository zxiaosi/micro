package com.zxiaosi.user.service.impl;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.util.SaFoxUtil;
import com.alibaba.nacos.common.utils.StringUtils;
import com.zxiaosi.common.constants.ResponseEnum;
import com.zxiaosi.common.exception.CustomException;
import com.zxiaosi.user.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;

/**
 * 邮件服务实现类
 */
@RefreshScope // 刷新 Nacos 值
@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender; //注入邮件工具类

    @Autowired
    private SaTokenDao saTokenDao;


    @Value("${custom.mail.name}")
    private String name;

    @Value("${spring.mail.username}")
    private String from;

    @Value("${custom.mail.time}")
    private long time;

    @Override
    public void sendMailService(String to, String subject, String content) {
        if (StringUtils.isAnyBlank(from, to, subject, content)) {
            throw new CustomException(ResponseEnum.EMPTY_EMAIL.getMsg(), ResponseEnum.EMPTY_EMAIL.getCode());
        }

        try {
            // true表示支持复杂类型
            MimeMessageHelper messageHelper = new MimeMessageHelper(javaMailSender.createMimeMessage(), true);
            // 邮件发信人
            messageHelper.setFrom(new InternetAddress(name + "<" + from + ">"));
            // 邮件收信人
            messageHelper.setTo(to.split(","));
            // 邮件主题
            messageHelper.setSubject(subject);
            // 邮件内容
            messageHelper.setText(content);
            // 邮件发送日期
            javaMailSender.send(messageHelper.getMimeMessage());
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new CustomException(e.getMessage());
        }
    }

    @Override
    public void sendVerifyCodeService(String email) {
        // 生成随机验证码
        String captcha = SaFoxUtil.getRandomString(6);

        // 获取邮箱验证码的剩余存活时间
        long timeout = saTokenDao.getTimeout(email);
        if (timeout != SaTokenDao.NOT_VALUE_EXPIRE) {
            saTokenDao.delete(email); // 删除旧的验证码
        }

        // 存储验证码
        saTokenDao.set(email, captcha, time);
        this.sendMailService(email, "验证码", "网站注册验证码：" + captcha + "。");
    }
}
