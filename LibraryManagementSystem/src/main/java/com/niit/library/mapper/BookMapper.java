package com.niit.library.mapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.niit.library.domain.Book;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
* @author lenovo
* @description 针对表【book】的数据库操作Mapper
* @createDate 2022-12-02 10:05:40
* @Entity com.niit.library.domain.Book
*/
public interface BookMapper extends BaseMapper<Book> {


    Page<Book> selectPageVo(Page<Book> page,@Param("book") Book book);
    Page<Book> selectPageVo2(Page<Book> page,@Param("book") Book book);
    Page<Book> selectPageVo3(Page<Book> page,@Param("uid") Long uid);

    List<Book> selectPageVo4(@Param("pageNo") Integer pageNo, @Param("pageSize") Integer pageSize, @Param("book") Book book);

    Integer countReturnBook(@Param("book")Book book);
}




