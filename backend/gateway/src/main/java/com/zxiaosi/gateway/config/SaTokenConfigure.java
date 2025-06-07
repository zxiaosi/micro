package com.zxiaosi.gateway.config;

import cn.dev33.satoken.SaManager;
import cn.dev33.satoken.context.SaHolder;
import cn.dev33.satoken.reactor.filter.SaReactorFilter;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * [Sa-Token 权限认证] 配置类
 */
@Configuration
public class SaTokenConfigure {
    /**
     * 注册 [sa-token全局过滤器]
     */
    @Bean
    public SaReactorFilter getSaReactorFilter() {
        return new SaReactorFilter()
                // 指定 [拦截路由]
                .addInclude("/**") // 拦截全部路由
                // 指定 [放行路由]
                .addExclude("/favicon.ico")
                // 指定[认证函数]: 每次请求执行
                .setAuth(obj -> {
                    // 输出 API 请求日志，方便调试代码
                    SaManager.getLog().debug("----- 请求path={}  提交token={}", SaHolder.getRequest().getRequestPath(), StpUtil.getTokenValue());

                    // 登录校验 -- 拦截所有路由，并排除 /api/user/login 用于开放登录
                    SaRouter.match("/**", "/api/user/login", r -> StpUtil.checkLogin());
                })
                // 异常处理方法：每次setAuth函数出现异常时进入
                .setError(e -> {
                    e.printStackTrace();
                    return SaResult.error(e.getMessage());
                });
    }
}
