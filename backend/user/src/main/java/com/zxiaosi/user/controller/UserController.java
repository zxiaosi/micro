package com.zxiaosi.user.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.zxiaosi.common.utils.Result;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/login")
    public Result<?> login(@RequestParam String username, @RequestParam String password) {
        if ("admin".equals(username) && "123456".equals(password)) {
            StpUtil.login(10001);
            return Result.success(StpUtil.getTokenInfo());
        }
        return Result.fail("登录失败！");
    }

    @GetMapping("/checkLogin")
    public Result<String> checkLogin() {
        if (StpUtil.isLogin()) {
            return Result.success("已登录，用户ID: " + StpUtil.getLoginId());
        }
        return Result.fail("未登录");
    }

    @PostMapping("/logout")
    public Result<String> logout() {
        StpUtil.logout();
        return Result.success("退出成功");
    }

    @GetMapping("/getUserInfo")
    public Result<String> getUserInfo() {
        return Result.success("用户信息" + StpUtil.getTokenInfo());
    }
}