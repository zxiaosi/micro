package com.zxiaosi.common.exception;

import cn.dev33.satoken.exception.SaTokenException;
import cn.dev33.satoken.util.SaResult;
import com.zxiaosi.common.constants.ResponseEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
    private final Logger LOGGER = LoggerFactory.getLogger(GlobalException.class);

    /**
     * 自定义异常
     */
    @ExceptionHandler(CustomException.class)
    public SaResult handleCustomException(CustomException e) {
        return SaResult.error(e.getMsg()).setCode(e.getCode());
    }

    /**
     * 全局异常
     */
    @ExceptionHandler(Exception.class)
    public SaResult handleException(Exception e) {
        LOGGER.error(e.getMessage(), e);
        return SaResult.error(e.getMessage()).setCode(ResponseEnum.INTERNAL_SERVER_ERROR.getCode());
    }
}
