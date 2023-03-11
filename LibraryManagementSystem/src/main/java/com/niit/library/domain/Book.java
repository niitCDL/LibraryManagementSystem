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
 * @TableName book
 */
@TableName(value ="book")
@Data
public class Book implements Serializable {
    /**
     * 
     */
    @JsonSerialize(using = ToStringSerializer.class)
    @TableId(type = IdType.ID_WORKER)
    private Long id;

    /**
     * 
     */
    private String bookName;

    /**
     * 
     */
    private Long categoryId;
    private transient Long uid;
    @JsonSerialize(using = ToStringSerializer.class)
    private transient Long logId;
    private transient String status;

    private transient String categoryName;

    /**
     * 
     */
    private Integer stockNum;

    /**
     * 
     */
    private String author;

    /**
     * 
     */
    private Date publicationDate;

    private transient String publicationDateStr;

    /**
     * 
     */
    private String profile;

    /**
     * 
     */
    private Integer price;

    /**
     * 
     */
    private Long isbn;

    /**
     * 
     */
    private byte[] imgPath;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}