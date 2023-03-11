package com.niit.library.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.niit.library.domain.Book;
import com.niit.library.domain.Kind;
import com.niit.library.service.BookService;
import com.niit.library.mapper.BookMapper;
import com.niit.library.service.KindService;
import com.niit.library.vo.PaginationVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author lenovo
 * @description 针对表【book】的数据库操作Service实现
 * @createDate 2022-12-02 09:09:30
 */
@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book>
        implements BookService {

    @Autowired
    BookMapper bookMapper;
    @Autowired
    KindService kindService;


    @Override
    public PaginationVO<Book> getBookPage(Integer pageNo, Integer pageSize, Book book) {
        Page<Book> page = new Page<>(pageNo, pageSize);
        bookMapper.selectPageVo(page, book);
        for (Book record : page.getRecords()) {
            Kind rsCategory = kindService.getById(record.getCategoryId());
            record.setCategoryName(rsCategory.getCategory());
        }
        PaginationVO<Book> vo = new PaginationVO<>();
        vo.setDataList(page.getRecords());
        vo.setPages(page.getPages());
        vo.setTotal(page.getTotal());
        return vo;
    }


//    public PaginationVO<Book> pageList(Map<String, Object> map) {
//        PaginationVO<Book> info = new PaginationVO<>();
//        int total = bookMapper.selectCount(LikeQueryWrapperUtil.getWrapper(map.get("obj")));
//        List<Book> bookList = bookMapper.selectList(LikeQueryWrapperUtil.getWrapper(map.get("obj")));
//        List<Book> pageBook = new ArrayList<>();
//        Integer pageSize = (Integer) map.get("pageSize");
//        Integer pageNo = (Integer) map.get("pageNo");
//        //(pageNo - 1 * pageSize,pageSize * pageNo) 1 3   0 3 3 6
//        if (pageSize * pageNo > bookList.size()) {
//            for (int i = (pageNo - 1) * pageSize; i < bookList.size(); i++) {
//                pageBook.add(bookList.get(i));
//            }
//        } else {
//            for (int i = pageNo - 1 * pageSize; i < pageSize * pageNo; i++) {
//                pageBook.add(bookList.get(i));
//            }
//        }
//        info.setDataList(pageBook);
//        info.setTotal(total);
//        return info;
//    }

}




