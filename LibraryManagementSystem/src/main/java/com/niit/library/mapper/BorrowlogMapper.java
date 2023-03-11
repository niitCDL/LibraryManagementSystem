package com.niit.library.mapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.niit.library.domain.Book;
import com.niit.library.domain.Borrowlog;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

/**
* @author lenovo
* @description 针对表【borrowlog】的数据库操作Mapper
* @createDate 2022-12-02 10:05:40
* @Entity com.niit.library.domain.Borrowlog
*/
public interface BorrowlogMapper extends BaseMapper<Borrowlog> {

    Page<Borrowlog> selectPageVo(Page<Borrowlog> page,@Param("log") Borrowlog borrowlog);

}




