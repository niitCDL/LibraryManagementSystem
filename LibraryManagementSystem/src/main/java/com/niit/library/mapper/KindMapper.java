package com.niit.library.mapper;

import com.niit.library.domain.Kind;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
* @author lenovo
* @description 针对表【kind】的数据库操作Mapper
* @createDate 2022-12-02 10:05:40
* @Entity com.niit.library.domain.Kind
*/
public interface KindMapper extends BaseMapper<Kind> {

    Integer isBorrowBook(Long id);

    Integer getMaxOrder();

}




