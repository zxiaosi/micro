package com.zxiaosi.common.exception;

import com.zxiaosi.common.constants.ResponseEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * 自定义异常
 */
@Setter
@Getter
public class CustomException extends RuntimeException  {
    private static final long serialVersionUID = 1L;

    private String msg;

    private int code = ResponseEnum.ERROR.getCode();

    public CustomException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public CustomException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    public CustomException(String msg, int code) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public CustomException(String msg, int code, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
    }
}
