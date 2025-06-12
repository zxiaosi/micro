package com.zxiaosi.user.controller;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.util.SaResult;
import com.zxiaosi.common.constants.WeappScanLoginEnum;
import com.zxiaosi.user.service.WeappService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/qrcode")
    public SaResult qrcode(@RequestParam String scene) {
        byte[] bytes = weappService.getUnlimitedQRCodeService(scene);
        return SaResult.data(bytes);
    }

    @GetMapping("/qrcodeStatus")
    public SaResult qrcodeStatus(@RequestParam String scene) {
        String code = saTokenDao.get(scene);
        
        if (code == null) {
            return SaResult.data(WeappScanLoginEnum.EXPIRED.getCode()).setMsg(WeappScanLoginEnum.EXPIRED.getMsg());
        }

        return SaResult.data(code).setMsg(WeappScanLoginEnum.getMsgByCode(Integer.parseInt(code)));
    }

}
