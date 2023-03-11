package com.niit.library.controller;

import com.niit.library.domain.Book;
import com.niit.library.domain.Kind;
import com.niit.library.service.BookService;
import com.niit.library.service.KindService;
import com.niit.library.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
    
    @Autowired
    BookService bookService;
    @Autowired
    KindService categoryService;

    @GetMapping("/")
    public String login() {
        return "login";
    }

    @GetMapping("/admin/adminMain.html")
    public String adminMain() {
        return "/admin/adminMain";
    }

    @GetMapping("/user/userMain.html")
    public String userMain() {
        return "/user/userMain";
    }

    @GetMapping("/admin/bookManage.html")
    public String bookManage() {
        return "/admin/bookManage";
    }

    @GetMapping("/admin/bookStyle.html")
    public String bookStyle() {
        return "/admin/bookStyle";
    }

    @GetMapping("/admin/borrowLog.html")
    public String borrowLog() {
        return "/admin/borrowLog";
    }

    @GetMapping("/user/index.html")
    public String userIndex() {
        return "/user/index";
    }

    @GetMapping("/user/personalCenter.html")
    public String personalCenter() {
        return "/user/personalCenter";
    }

    @GetMapping("/user/userAndBookManage.html")
    public String userAndBookManage() {
        return "/user/userAndBookManage";
    }


    @GetMapping("/book/detail.html/{id}")
    public ModelAndView bookDetail(@PathVariable("id")String bookId) {
        System.out.println(bookId);
        Book book = bookService.getById(bookId);
        Kind one = categoryService.getById(book.getCategoryId());
        book.setCategoryName(one.getCategory());
        book.setPublicationDateStr(DateUtil.getDateStr(book.getPublicationDate()).substring(0,11));
        ModelAndView mv = new ModelAndView();
        mv.addObject("book",book);
        mv.setViewName("/user/detail");
        return mv;
    }


}
