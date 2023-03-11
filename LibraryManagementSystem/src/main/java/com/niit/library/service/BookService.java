package com.niit.library.service;

import com.niit.library.domain.Book;
import com.baomidou.mybatisplus.extension.service.IService;
import com.niit.library.vo.PaginationVO;

/**
* @author lenovo
* @description 针对表【book】的数据库操作Service
* @createDate 2022-12-02 10:05:40
*/
public interface BookService extends IService<Book> {
    PaginationVO<Book> getBookPage(Integer pageNo,Integer pageSize,Book book);

}
