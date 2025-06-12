package com.zxiaosi.user.controller;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.util.SaResult;
import com.zxiaosi.user.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 邮件接口
 */
@RestController
@RequestMapping("/email")
public class EmailController {


    @Autowired
    private EmailService emailService;

    @Autowired
    private SaTokenDao saTokenDao;

    @PostMapping("/send")
    public SaResult send(@RequestParam String email) {
        emailService.sendVerifyCodeService(email);
        return SaResult.ok();
    }

    @GetMapping("/verify")
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
