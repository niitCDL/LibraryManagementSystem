package com.niit.library.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.niit.library.domain.*;
import com.niit.library.service.*;
import com.niit.library.util.DateUtil;
import com.niit.library.util.LikeQueryWrapperUtil;
import com.niit.library.vo.PaginationVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class BookControlller {

    @Autowired
    BookService bookService;
    @Autowired
    KindService kindService;
    @Autowired
    BorrowService borrowService;
    @Autowired
    BorrowlogService borrowlogService;
    @Autowired
    UserService userService;

    @GetMapping("/book/getBookPage")
    public PaginationVO<Book> getBookPage(@Param("pageNo") int pageNo,
                                          @Param("pageSize") int pageSize,
                                          Book book) {
//        Page<Book> page = new Page<>(pageNo, pageSize);
//        bookService.page(page, LikeQueryWrapperUtil.getWrapper(book));
//        for (Book record : page.getRecords()) {
//            Kind rsCategory = kindService.getById(record.getCategoryId());
//            record.setCategoryName(rsCategory.getCategory());
//        }
//        PaginationVO<Book> vo = new PaginationVO<>();
//        vo.setDataList(page.getRecords());
//        vo.setPages(page.getPages());
//        vo.setTotal(page.getTotal());
        System.out.println(book);
        PaginationVO<Book> bookPage = bookService.getBookPage(pageNo, pageSize, book);
        for (Book book1 : bookPage.getDataList()) {
            book1.setPublicationDateStr(DateUtil.getDateStr(book1.getPublicationDate()));
        }
        return bookPage;
    }

    @PostMapping("/book/deleteBook")
    @Transactional
    public Map<String, String> deleteBook(Long id) {
        HashMap<String, String> map = new HashMap<>();
        Borrow borrow = new Borrow();
        borrow.setBookId(id);
        List<Borrow> list = borrowService.list(new QueryWrapper<>(borrow));
        if (list.size() > 0) {
            map.put("msg", "该图书存在未归还的记录");
            map.put("success", "false");
            return map;
        }
        Borrowlog borrowlog = new Borrowlog();
        borrowlog.setBookId(id);
        QueryWrapper<Borrowlog> borrowlogQueryWrapper = new QueryWrapper<>(borrowlog);
        if (borrowlogService.getOne(borrowlogQueryWrapper) != null) {
            if (!borrowlogService.remove(borrowlogQueryWrapper)) {
                map.put("msg", "借阅记录信息删除失败");
                map.put("success", "false");
                return map;
            }
        }
        if (!bookService.removeById(id)) {
            map.put("msg", "该图书删除失败");
            map.put("success", "false");
            return map;
        }
        map.put("success", "true");
        return map;
    }

    @GetMapping("/book/fillUpdateBookModal")
    public Book fillUpdateBookModal(Long id) {
        Book book = bookService.getById(id);
        String categoryName = kindService.getById(book.getCategoryId()).getCategory();
        book.setCategoryName(categoryName);
        return book;
    }

    @PostMapping("/book/updateBook")
    public boolean updateBook(Book book) {
        Kind kind = new Kind();
        kind.setCategory(book.getCategoryName());
        Kind one = kindService.getOne(new QueryWrapper<>(kind));
        book.setCategoryId(one.getId());
        return bookService.updateById(book);
    }

    @GetMapping("/book/fillTypeList")
    public List<Kind> fillTypeList() {
        return kindService.list();
    }

    @PostMapping("/book/saveBook")
    public boolean saveBook(Book book) {
        Kind kind = new Kind();
        kind.setCategory(book.getCategoryName());
        Kind one = kindService.getOne(new QueryWrapper<>(kind));
        book.setCategoryId(one.getId());
        book.setPublicationDate(new Date());
        return bookService.save(book);
    }


    @GetMapping("/book/queryByType")
    public PaginationVO<Book> queryByType() {
        return null;
    }

    @GetMapping("/book/getAllType")
    public List<Kind> getAllType() {
        return kindService.list();
    }

    @GetMapping("/book/borrowBook")
    @Transactional
    /**
     * 将借阅信息添加到借阅表中
     * 添加借阅日志信息
     *
     */
    public Map<String,String> borrowBook(@Param("uid") String uid,@Param("bid")String bid){
        HashMap<String, String> map = new HashMap<>();
        Borrow bCase = new Borrow();
        bCase.setUserId(Long.valueOf(uid));
        QueryWrapper<Borrow> wrapper = new QueryWrapper<>(bCase);
        Book book = bookService.getById(bid);
        if(book.getStockNum() == 0){
            map.put("msg","该书籍暂无存货,不可借阅。敬请谅解！");
            map.put("status","false");
            return map;
        }
        int count = borrowService.count(wrapper);
        if (count == 3){
            map.put("msg","您借阅的书籍已超过三本,不可借阅。");
            map.put("status","false");
            return map;
        }

        Borrow borrow = new Borrow();
        borrow.setUserId(Long.valueOf(uid));
        borrow.setBookId(Long.valueOf(bid));
        borrow.setStartDate(new Date());
        Date endDate = new Date();
        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.DATE,30);
        endDate = instance.getTime();
        borrow.setEndDate(endDate);
        boolean save1 = borrowService.save(borrow);

        Borrowlog borrowlog = new Borrowlog();
        borrowlog.setUserId(Long.valueOf(uid));
        borrowlog.setBookId(Long.valueOf(bid));
        borrowlog.setRecordTime(new Date());
        borrowlog.setAction("借书");
        boolean save2 = borrowlogService.save(borrowlog);

        Book update_Book = new Book();
        update_Book.setId(Long.valueOf(bid));
        update_Book.setStockNum(book.getStockNum() - 1);
        boolean update = bookService.updateById(update_Book);

        if (save1 && save2 && update){
            map.put("status","true");
        }else {
            map.put("status","failed");
            map.put("msg","借阅失败");
        }

        return map;
    }

    @GetMapping("/book/isBorrowBook")
    public boolean isBorrowBook(@Param("uid") String uid,
                                @Param("bid") String bid){
        Borrow borrow = new Borrow();
        borrow.setUserId(Long.valueOf(uid));
        borrow.setBookId(Long.valueOf(bid));
        QueryWrapper<Borrow> wrapper = new QueryWrapper<>(borrow);
        Borrow one = borrowService.getOne(wrapper);
        return one == null;
    }


}
