package com.zxiaosi.gateway.controller;

import com.zxiaosi.common.utils.Result;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    @RequestMapping("/hello")
    public Result<?> hello() {
        return Result.success("Hello World!");
    }
}
