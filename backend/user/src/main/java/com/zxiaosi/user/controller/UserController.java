package com.zxiaosi.user.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.zxiaosi.common.utils.Result;
import com.zxiaosi.user.entity.vo.LoginVo;
import com.zxiaosi.user.entity.vo.UserVo;
import com.zxiaosi.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Result<?> login(@RequestBody LoginVo loginVo) {
        Boolean flag = userService.checkUsernamePasswordService(loginVo);
        if (flag) {
            return Result.success(StpUtil.getTokenValue(), "登录成功！");
        } else {
            return Result.fail("登录失败！");
        }
    }

    @PostMapping("/logout")
    public Result<String> logout() {
        StpUtil.logout();
        return Result.success("退出成功");
    }

    @GetMapping("/getUserInfo")
    public Result<UserVo> getUserInfo() {
        Integer loginId = StpUtil.getLoginIdAsInt();
        return Result.success(userService.getUserByIdService(loginId));
    }
}