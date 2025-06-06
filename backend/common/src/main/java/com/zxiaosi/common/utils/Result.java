package com.zxiaosi.common.utils;

import com.zxiaosi.common.constants.ResponseEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 结果工具类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> implements Serializable {

    /**
     * 状态码
     */
    private Integer code;

    /**
     * 数据体
     */
    private T data;

    /**
     * 描述
     */
    private String msg;

    /**
     * 成功状态码
     */
    private static Integer SUCCESS_CODE = ResponseEnum.SUCCESS.getCode();

    /**
     * 成功描述
     */
    private static String SUCCESS_MSG = ResponseEnum.SUCCESS.getMsg();

    /**
     * 失败状态码
     */
    private static int ERROR_CODE = ResponseEnum.ERROR.getCode();

    /**
     * 失败描述
     */
    private static String ERROR_MSG = ResponseEnum.ERROR.getMsg();


    public static <T> Result<T> success() {
        return new Result<>(SUCCESS_CODE, null, SUCCESS_MSG);
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(SUCCESS_CODE, data, SUCCESS_MSG);
    }


    public static <T> Result<T> success(T data, String msg) {
        return new Result<>(SUCCESS_CODE, data, msg);
    }

    public static <T> Result<T> fail() {
        return new Result<>(ERROR_CODE, null, ERROR_MSG);
    }

    public static <T> Result<T> fail(String msg) {
        return new Result<>(ERROR_CODE, null, msg);
    }

    public static <T> Result<T> fail(T data, String msg) {
        return new Result<>(ERROR_CODE, data, msg);
    }

    public static <T> Result<T> fail(Integer code, String msg) {
        return new Result<>(code, null, msg);
    }

    public static <T> Result<T> fail(Integer code, T data, String msg) {
        return new Result<>(code, data, msg);
    }
}
