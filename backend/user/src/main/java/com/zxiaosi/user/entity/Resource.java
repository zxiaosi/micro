package com.zxiaosi.user.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Transient;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

/**
 * 资源实体类
 */
@Data
public class Resource implements Serializable {

    /**
     * 资源id
     */
    private Integer id;

    /**
     * 资源名称
     */
    private String name;

    /**
     * 层级 0:目录 1:菜单 2:按钮 10:小程序路由
     */
    @JsonIgnore
    private Integer level;

    /**
     * 父id
     */
    @JsonIgnore
    private Integer pid;

    /**
     * 资源图标
     */
    private String icon;

    /**
     * 页面路由
     */
    private String router;

    /**
     * 路由参数
     */
    private String router_attr;

    /**
     * 是否删除 0:未删除 1:已删除
     */
    private Integer isDeleted;

    /**
     * 创建时间
     */
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createTime;

    /**
     * 更新时间
     */
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date updateTime;

    /**
     * 是否是子节点
     */
    @Transient
    private ArrayList<Resource> children = new ArrayList<>();

}