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
 * 
 * @TableName user
 */
@TableName(value ="user")
@Data
public class User implements Serializable {
    /**
     * 
     */
    @JsonSerialize(using = ToStringSerializer.class)
    @TableId(type = IdType.ID_WORKER)
    private Long id;

    /**
     * 
     */
    private String userName;

    /**
     * 
     */
    private String password;

    /**
     * 
     */
    private String address;

    /**
     * 
     */
    private Date joinDate;
    private transient String joinDateStr;

    /**
     * 
     */
    private Integer noReturn;

    /**
     * 
     */
    private byte[] img;



    @TableField(exist = false)
    private static final long serialVersionUID = 1L;


}