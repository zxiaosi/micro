package com.zxiaosi.auth.controller;

import cn.dev33.satoken.reactor.context.SaReactorHolder;
import cn.dev33.satoken.stp.StpUtil;
import com.zxiaosi.common.utils.Result;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/login")
    public Mono<Result<?>> login(@RequestParam String username, @RequestParam String password) {
        // 模拟登录验证
        return SaReactorHolder.sync(() -> {
            if ("admin".equals(username) && "123456".equals(password)) {
                StpUtil.login(10001);
                return Result.success(StpUtil.getTokenInfo());
            }
            return Result.fail("登录失败！");
        });
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
}
