package com.zxiaosi.user.controller;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.util.SaResult;
import com.zxiaosi.common.constants.WeappScanLoginEnum;
import com.zxiaosi.user.entity.vo.WeappLoginVo;
import com.zxiaosi.user.service.WeappService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getQrcodeStatus")
    public SaResult getQrcodeStatus(@RequestParam String scene) {
        String code = saTokenDao.get(scene);

        if (code == null) {
            return SaResult.data(WeappScanLoginEnum.EXPIRED.getCode()).setMsg(WeappScanLoginEnum.EXPIRED.getMsg());
        }

        return SaResult.data(code).setMsg(WeappScanLoginEnum.getMsgByCode(Integer.parseInt(code)));
    }

    @PostMapping("/updateQrcodeStatus")
    public SaResult updateQrcodeStatus(@RequestParam String scene, @RequestParam String code) {
        Integer codeInt = Integer.parseInt(code);

        if (codeInt.equals(WeappScanLoginEnum.SUCCESS.getCode()) || codeInt.equals(WeappScanLoginEnum.FAIL.getCode())) {
            // 用户已经走完登录流程,  删除二维码状态
            saTokenDao.delete(scene);
        } else {
            // 更新二维码状态
            saTokenDao.update(scene, code);
        }

        return SaResult.ok();
    }

    @PostMapping("/login")
    public SaResult login(@RequestBody WeappLoginVo weappLoginVo) {
        String token = weappService.createTokenService(weappLoginVo);
        return SaResult.ok(token);
    }

}
