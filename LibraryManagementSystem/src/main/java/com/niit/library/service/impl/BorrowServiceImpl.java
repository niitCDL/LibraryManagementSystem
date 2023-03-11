package com.niit.library.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.niit.library.domain.Book;
import com.niit.library.domain.Borrow;
import com.niit.library.domain.Borrowlog;
import com.niit.library.domain.Kind;
import com.niit.library.mapper.BookMapper;
import com.niit.library.mapper.BorrowlogMapper;
import com.niit.library.service.BorrowService;
import com.niit.library.mapper.BorrowMapper;
import com.niit.library.service.BorrowlogService;
import com.niit.library.service.KindService;
import com.niit.library.util.DateUtil;
import com.niit.library.vo.PaginationVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author lenovo
 * @description 针对表【borrow】的数据库操作Service实现
 * @createDate 2022-12-02 10:05:40
 */
@Service
public class BorrowServiceImpl extends ServiceImpl<BorrowMapper, Borrow>
        implements BorrowService {

    @Autowired
    BookMapper bookMapper;
    @Autowired
    KindService kindService;
    @Autowired
    BorrowlogService borrowlogService;

    @Override
    public PaginationVO<Book> getBorrowBookPage(Integer pageNo, Integer pageSize, Book book) {
        List<Book> bookList = bookMapper.selectPageVo4((pageNo - 1) * pageSize, pageSize, book);
        int total = 0;
        total = bookMapper.countReturnBook(book);
        PaginationVO<Book> vo = new PaginationVO<>();
        vo.setDataList(bookList);
        vo.setTotal(Long.valueOf(total));
        if (total <= pageSize) {
            vo.setPages((long) (total == 0 ? 0 : 1));
        } else {
            vo.setPages((long) (total / pageSize == 0 ? total / pageSize : total / pageSize + 1));
        }
        return vo;
    }

    public PaginationVO<Book> getNoReturnBookPage(Long uid) {
        Page<Book> page = new Page<>(1, 3);
        bookMapper.selectPageVo3(page, uid);
        for (Book record : page.getRecords()) {
            record.setPublicationDateStr(DateUtil.getDateStr(record.getPublicationDate()));
        }
        PaginationVO<Book> vo = new PaginationVO<>();
        vo.setDataList(page.getRecords());
        vo.setPages(page.getPages());
        vo.setTotal(page.getTotal());
        return vo;
    }

    private void customizeClone(Long bid, Long uid, Book book1, ArrayList list) {
        Borrowlog wrapperBorrowlog = new Borrowlog();
        wrapperBorrowlog.setBookId(bid);
        wrapperBorrowlog.setUserId(uid);
        wrapperBorrowlog.setAction("还书");
        QueryWrapper<Borrowlog> wrapper = new QueryWrapper<>(wrapperBorrowlog);
        int count = borrowlogService.count(wrapper) - 1;
        for (int i = 1; i <= count; i++) {
            Book clone = new Book();
            clone.setId(book1.getId());
            clone.setBookName(book1.getBookName());
            clone.setStockNum(book1.getStockNum());
            clone.setIsbn(book1.getIsbn());
            clone.setProfile(book1.getProfile());
            clone.setPrice(book1.getPrice());
            clone.setAuthor(book1.getAuthor());
            clone.setCategoryId(book1.getCategoryId());
            clone.setPublicationDate(book1.getPublicationDate());
            list.add(clone);
        }
    }
}




