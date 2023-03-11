package com.niit.library.service;

import com.niit.library.domain.Book;
import com.niit.library.domain.Borrow;
import com.baomidou.mybatisplus.extension.service.IService;
import com.niit.library.vo.PaginationVO;

/**
* @author lenovo
* @description 针对表【borrow】的数据库操作Service
* @createDate 2022-12-02 10:05:40
*/
public interface BorrowService extends IService<Borrow> {
    PaginationVO<Book> getBorrowBookPage(Integer pageNo, Integer pageSize,Book book);

    PaginationVO<Book> getNoReturnBookPage(Long uid);
}
