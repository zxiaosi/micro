package com.zxiaosi.common.utils;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * <a href="https://blog.csdn.net/u011291844/article/details/136387503">
 * SseClient
 * </a>
 */
@Slf4j
@Component
public class SseClient {
    private static final Map<String, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

    /**
     * 创建连接
     *
     * @param uid 标识
     */
    public SseEmitter createConnect(String uid) {
        // 默认30秒超时,设置为0L则永不超时
        SseEmitter sseEmitter = new SseEmitter(0L);

        // 完成后回调
        sseEmitter.onCompletion(() -> {
            log.info("[{}]结束连接...................", uid);
            sseEmitterMap.remove(uid);

        });

        // 超时回调
        sseEmitter.onTimeout(() -> {
            log.info("[{}]连接超时...................", uid);
        });

        // 异常回调
        sseEmitter.onError(
                throwable -> {
                    try {
                        log.info("[{}]连接异常,{}", uid, throwable.toString());
                        // 发送异常信息
                        sseEmitter.send(SseEmitter.event()
                                .id(uid)
                                .name("发生异常！")
                                .data("发生异常请重试！")
                                .reconnectTime(3000)); // 重连时间

                        // 添加到sseEmitterMap中
                        sseEmitterMap.put(uid, sseEmitter);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
        );

        // 发送默认信息
        try {
            sseEmitter.send(SseEmitter.event().reconnectTime(5000)); // 重连时间
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 添加到sseEmitterMap中
        sseEmitterMap.put(uid, sseEmitter);
        log.info("[{}]创建sse连接成功！", uid);

        return sseEmitter;

    }

    /**
     * 给指定用户发送消息
     *
     * @param uid     标识
     * @param message 消息内容
     */
    public boolean sendMessage(String uid, String message) {
        if (StrUtil.isBlank(message)) {
            log.info("参数异常uid:[{}]，msg为null", uid);
            return false;
        }

        SseEmitter sseEmitter = sseEmitterMap.get(uid);
        if (sseEmitter == null) {
            log.info("消息推送失败uid:[{}],没有创建连接，请重试。", uid);
            return false;
        }

        try {
            sseEmitter.send(SseEmitter.event().reconnectTime(60 * 1000L).data(message));
            log.info("用户{},推送成功:{}", uid, message);
            return true;
        } catch (Exception e) {
            sseEmitterMap.remove(uid);
            log.info("用户{},推送异常:{}", uid, e.getMessage());
            sseEmitter.complete();
            return false;
        }
    }

    /**
     * 断开
     *
     * @param uid 标识
     */
    public void closeSse(String uid) {
        if (sseEmitterMap.containsKey(uid)) {
            SseEmitter sseEmitter = sseEmitterMap.get(uid);
            sseEmitter.complete();
            sseEmitterMap.remove(uid);
        } else {
            log.info("用户{} 连接已关闭", uid);
        }

    }

}
