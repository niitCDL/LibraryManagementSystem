package com.niit.library.mapper;

import com.niit.library.domain.Borrow;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

/**
* @author lenovo
* @description 针对表【borrow】的数据库操作Mapper
* @createDate 2022-12-02 10:05:40
* @Entity com.niit.library.domain.Borrow
*/
public interface BorrowMapper extends BaseMapper<Borrow> {

    Integer getBorrowedBooksCount(@Param("uid") String uid, @Param("bid") String bid);

}




