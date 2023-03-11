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
 * @TableName borrow
 */
@TableName(value = "borrow")
@Data
public class Borrow implements Serializable {
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

    /**
     *
     */
    private Long bookId;

    /**
     *
     */
    private Date startDate;
    private transient String startDateStr;

    /**
     *
     */
    private Date endDate;
    private transient String endDateStr;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}