package com.zxiaosi.user.service.impl;

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
@Service
@RefreshScope // 刷新 Nacos 值
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender; //注入邮件工具类

    @Value("${custom.mail.name}")
    private String name;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public void sendMail(String to, String subject, String content) {
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
}
