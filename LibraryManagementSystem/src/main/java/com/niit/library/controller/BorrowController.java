package com.niit.library.controller;

import com.niit.library.domain.Book;
import com.niit.library.domain.Borrow;
import com.niit.library.domain.Borrowlog;
import com.niit.library.service.BookService;
import com.niit.library.service.BorrowService;
import com.niit.library.service.BorrowlogService;
import com.niit.library.vo.PaginationVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class BorrowController {

    @Autowired
    BorrowService borrowService;
    @Autowired
    BorrowlogService borrowlogService;
    @Autowired
    BookService bookService;

    @GetMapping("/borrow/getBorrowBookPage")
    public PaginationVO<Book> getBorrowBookPage(@Param("pageNo") int pageNo,
                                                @Param("pageSize") int pageSize,
                                                Book book) {
        PaginationVO<Book> page = borrowService.getBorrowBookPage(pageNo, pageSize, book);
        return page;
    }

    @GetMapping("/borrow/getNoReturnBookPage")
    public PaginationVO<Book> getNoReturnBookPage(@Param("uid") String uid) {
        return borrowService.getNoReturnBookPage(Long.valueOf(uid));
    }

    @GetMapping("/book/judgeStatus")
    public Map<String, String> judgeStatus(@Param("uid") String uid, @Param("bid") String bid) {
        HashMap<String, String> map = new HashMap<>();
        map.put("status", borrowlogService.judgeStatus(uid, bid));
        return map;
    }

    @PostMapping("/book/returnBook")
    @Transactional
    public boolean returnBook(@Param("id") String id) {
        Borrow borrow = borrowService.getById(id);
        Borrowlog borrowlog = new Borrowlog();
        borrowlog.setAction("还书");
        borrowlog.setBookId(borrow.getBookId());
        borrowlog.setUserId(borrow.getUserId());
        borrowlog.setRecordTime(new Date());
        boolean flag1 = borrowlogService.save(borrowlog);
        boolean flag2 = borrowService.removeById(id);
        Book update_Book = bookService.getById(borrow.getBookId());
        update_Book.setStockNum(update_Book.getStockNum() + 1);
        boolean update = bookService.updateById(update_Book);
        return flag1 && flag2 && update;
    }
}
