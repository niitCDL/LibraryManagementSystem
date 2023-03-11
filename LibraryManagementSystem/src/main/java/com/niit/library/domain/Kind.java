package com.niit.library.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

/**
 * 
 * @TableName kind
 */
@TableName(value ="kind")
@Data
public class Kind implements Serializable {
    /**
     * 
     */
    @JsonSerialize(using = ToStringSerializer.class)
    @TableId(type = IdType.ID_WORKER)
    private Long id;

    /**
     * 
     */
    private String category;


    private Integer orderBy;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}