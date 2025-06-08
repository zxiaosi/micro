package com.zxiaosi.user.controller;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.zxiaosi.user.entity.vo.LoginVo;
import com.zxiaosi.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 登录接口
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public SaResult login(@RequestBody LoginVo loginVo) {
        Boolean flag = userService.checkUsernamePasswordService(loginVo);
        if (flag) {
            return SaResult.data(StpUtil.getTokenValue());
        } else {
            return SaResult.error("登录失败！");
        }
    }

    @PostMapping("/logout")
    public SaResult logout() {
        StpUtil.logout();
        return SaResult.ok("退出成功");
    }

    @GetMapping("/getUserInfo")
    public SaResult getUserInfo() {
        Integer loginId = StpUtil.getLoginIdAsInt();
        return SaResult.data(userService.getUserByIdService(loginId));
    }
}