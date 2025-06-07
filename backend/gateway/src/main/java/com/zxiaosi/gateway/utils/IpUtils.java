package com.zxiaosi.gateway.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.util.ObjectUtils;

import java.util.Objects;

public class IpUtils {
    private static final String UNKNOWN = "unknown";

    /**
     * 私有工具类, 防止 new 对象
     */
    private IpUtils() {
    }

    /**
     * 获取IP公网地址
     * <p>
     * 使用Nginx等反向代理软件， 则不能通过request.getRemoteAddr()获取IP地址
     * 如果使用了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP地址，X-Forwarded-For中第一个非unknown的有效IP字符串，则为真实IP地址
     */
    public static String getIpAddress(ServerHttpRequest request) {

        if (request == null) {
            return "unknown";
        } else {
            HttpHeaders headers = request.getHeaders();

            // 获取nginx等代理的ip
            String ip = headers.getFirst("x-forwarded-for");

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = headers.getFirst("Proxy-Client-IP");
            }

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = headers.getFirst("X-Forwarded-For");
            }

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = headers.getFirst("WL-Proxy-Client-IP");
            }

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = headers.getFirst("X-Real-IP");
            }

            if (ObjectUtils.isEmpty(ip) || UNKNOWN.equalsIgnoreCase(ip)) {
                ip = Objects.requireNonNull(request.getRemoteAddress()).getAddress().getHostAddress();
            }

            if ("0:0:0:0:0:0:0:1".equals(ip)) {
                ip = "127.0.0.1";
            }

            if (ip.contains(",")) {
                ip = ip.split(",")[0];
            }

            return ip;
        }
    }
}
