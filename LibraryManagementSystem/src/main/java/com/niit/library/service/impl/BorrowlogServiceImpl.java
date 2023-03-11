package com.niit.library.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.niit.library.domain.Borrowlog;
import com.niit.library.service.BorrowlogService;
import com.niit.library.mapper.BorrowlogMapper;
import com.niit.library.vo.PaginationVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
* @author lenovo
* @description 针对表【borrowlog】的数据库操作Service实现
* @createDate 2022-12-02 10:05:40
*/
@Service
public class BorrowlogServiceImpl extends ServiceImpl<BorrowlogMapper, Borrowlog>
    implements BorrowlogService{

    @Autowired
    BorrowlogMapper borrowlogMapper;

    @Override
    //action  bookName
    public PaginationVO<Borrowlog> getBorrowLogPage(Integer pageNo, Integer pageSize,Borrowlog borrowlog) {
        Page<Borrowlog> pages = borrowlogMapper.selectPageVo(new Page<Borrowlog>(pageNo, pageSize),borrowlog);
        PaginationVO<Borrowlog> vo = new PaginationVO<>();
        vo.setDataList(pages.getRecords());
        vo.setTotal(pages.getTotal());
        vo.setPages(pages.getPages());
        return vo;
    }

    @Override
    public String judgeStatus(String uid, String bid) {
        Borrowlog borrowlog1 = new Borrowlog();
        borrowlog1.setUserId(Long.valueOf(uid));
        borrowlog1.setBookId(Long.valueOf(bid));
        borrowlog1.setAction("借书");
        QueryWrapper<Borrowlog> wrapper = new QueryWrapper<>(borrowlog1);
        List<Borrowlog> list1 = borrowlogMapper.selectList(wrapper);
        Date borrowDate = list1.get(list1.size() - 1).getRecordTime();

        Borrowlog borrowlog2 = new Borrowlog();
        borrowlog2.setUserId(Long.valueOf(uid));
        borrowlog2.setBookId(Long.valueOf(bid));
        borrowlog2.setAction("还书");
        QueryWrapper<Borrowlog> wrapper2 = new QueryWrapper<>(borrowlog2);
        List<Borrowlog> list2 = borrowlogMapper.selectList(wrapper2);
        Date returnDate = list2.get(list2.size() - 1).getRecordTime();

        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.DATE,30);
        borrowDate = instance.getTime();

        return borrowDate.compareTo(returnDate) < 0 ? "超时还书" : "正常还书";

    }


}




