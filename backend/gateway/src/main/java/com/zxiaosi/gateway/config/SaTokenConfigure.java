package com.zxiaosi.gateway.config;

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
                // 鉴权方法：每次访问进入
                .setAuth(obj -> {
                    System.out.println("---------- sa全局认证");
                    // 登录校验 -- 拦截所有路由，并排除 /auth/login 用于开放登录
//                    SaRouter.match("/**", "/auth/login", r -> StpUtil.checkLogin());

                    // 权限认证 -- 不同模块, 校验不同权限
//                    SaRouter.match("/user/**", r -> StpUtil.checkPermission("user"));
//                    SaRouter.match("/admin/**", r -> StpUtil.checkPermission("admin"));
//                    SaRouter.match("/goods/**", r -> StpUtil.checkPermission("goods"));
//                    SaRouter.match("/orders/**", r -> StpUtil.checkPermission("orders"));

                    // 更多匹配 ...  */
                })
                // 异常处理方法：每次setAuth函数出现异常时进入
                .setError(e -> {
                    System.out.println("---------- sa全局异常");
                    e.printStackTrace();
                    return SaResult.error(e.getMessage());
                });
    }
}
