package com.niit.library.service;

import com.niit.library.domain.Book;
import com.niit.library.domain.Borrowlog;
import com.baomidou.mybatisplus.extension.service.IService;
import com.niit.library.vo.PaginationVO;

/**
* @author lenovo
* @description 针对表【borrowlog】的数据库操作Service
* @createDate 2022-12-02 10:05:40
*/
public interface BorrowlogService extends IService<Borrowlog> {
    PaginationVO<Borrowlog> getBorrowLogPage(Integer pageNo, Integer pageSize,Borrowlog borrowlog);

    String judgeStatus(String uid, String bid);
}
