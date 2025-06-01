package com.zxiaosi.gateway.filter;

import cn.dev33.satoken.reactor.context.SaReactorSyncHolder;
import cn.dev33.satoken.stp.StpUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/**
 * 自定义过滤器
 * <p>
 * 请求前添加satoken上下文, 请求后清除上下文
 */
//@Component
public class MyFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        System.out.println("进入自定义过滤器-------------------");

        try {
            // 先 set 上下文，再调用 Sa-Token 同步 API，并在 finally 里清除上下文
            SaReactorSyncHolder.setContext(exchange);
//            System.out.println(StpUtil.isLogin());
        } finally {
            SaReactorSyncHolder.clearContext();
        }
        return chain.filter(exchange);
    }
}
