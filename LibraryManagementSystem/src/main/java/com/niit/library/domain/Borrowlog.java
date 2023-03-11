package com.niit.library.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

/**
 * @TableName borrowlog
 */
@TableName(value = "borrowlog")
@Data
public class Borrowlog implements Serializable {
    /**
     *
     */
    @JsonSerialize(using = ToStringSerializer.class)
    @TableId(type = IdType.ID_WORKER)
    private Long id;

    /**
     *
     */
    private Long userId;

    @TableField(exist = false)
    private String userName;

    /**
     *
     */
    private Long bookId;

    @TableField(exist = false)
    private String bookName;

    /**
     *
     */
    private Date recordTime;

    private transient String recordTimeStr;


    /**
     *
     */
    private String action;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}