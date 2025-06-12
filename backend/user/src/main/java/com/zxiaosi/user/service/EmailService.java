package com.zxiaosi.user.service;

/**
 * <a href="https://blog.csdn.net/m0_56287495/article/details/136587403">邮箱服务</a>
 */
public interface EmailService {

    /**
     * 邮件发送
     *
     * @param to      发送对象
     * @param subject 主题
     * @param content 内容
     */
    void sendMailService(String to, String subject, String content);


    /**
     * 发送验证码
     */
    void sendVerifyCodeService(String email);
}
