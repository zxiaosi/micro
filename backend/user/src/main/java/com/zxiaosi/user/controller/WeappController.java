package com.zxiaosi.user.controller;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.util.SaResult;
import com.zxiaosi.common.constants.WeappScanLoginEnum;
import com.zxiaosi.common.utils.SseClient;
import com.zxiaosi.user.entity.vo.WeappLoginVo;
import com.zxiaosi.user.service.WeappService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 * 微信小程序接口
 */
@RestController
@RequestMapping("/weapp")
public class WeappController {

    @Autowired
    private WeappService weappService;

    @Autowired
    private SaTokenDao saTokenDao;

    @Autowired
    private SseClient sseClient;


    @GetMapping("/qrcode")
    public SaResult qrcode(@RequestParam String scene) {
        byte[] bytes = weappService.getUnlimitedQRCodeService(scene);
        return SaResult.data(bytes);
    }

    @GetMapping(value = "/qrcode/status/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestParam String scene) {
        SseEmitter emitter = sseClient.createConnect(scene);
        String code = saTokenDao.get(scene);
        sseClient.sendMessage(scene, code);
        return emitter;
    }

    @PostMapping("/qrcode/status/update")
    public SaResult updateQrcodeStatus(@RequestParam String scene, @RequestParam String code) {

        Integer codeInt = Integer.parseInt(code);
        if (WeappScanLoginEnum.SUCCESS.getCode().equals(codeInt) || WeappScanLoginEnum.FAIL.getCode().equals(codeInt)) {
            // 用户已经走完登录流程, 删除二维码状态
            saTokenDao.delete(scene);
        } else {
            // 更新二维码状态
            saTokenDao.update(scene, code);
        }

        // 发送消息
        boolean flag = sseClient.sendMessage(scene, code);
        if (!flag) {
            sseClient.closeSse(scene);
            return SaResult.error("用户[0] 推送失败，请重试".replace("0", scene));
        } else {
            return SaResult.ok();
        }
    }

    @PostMapping("/login")
    public SaResult login(@RequestBody WeappLoginVo weappLoginVo) {
        String token = weappService.createTokenService(weappLoginVo);
        return SaResult.ok(token);
    }

}
