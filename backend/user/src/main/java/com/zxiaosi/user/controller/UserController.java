package com.zxiaosi.user.controller;

import cn.dev33.satoken.reactor.context.SaReactorHolder;
import cn.dev33.satoken.stp.StpUtil;
import com.zxiaosi.common.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/user")
public class UserController {

    // 示例接口，获取当前登录用户ID
    @GetMapping("/info")
    public Mono<Result<?>> getUserInfo() {
        // 模拟登录验证
        return SaReactorHolder.sync(() -> {
            return Result.success("用户信息: UID=" + StpUtil.getLoginId());
        });
    }
}