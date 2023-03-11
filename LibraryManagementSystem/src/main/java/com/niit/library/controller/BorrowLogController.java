package com.niit.library.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.niit.library.domain.Borrowlog;
import com.niit.library.service.BorrowlogService;
import com.niit.library.util.DateUtil;
import com.niit.library.vo.PaginationVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BorrowLogController {
    @Autowired
    BorrowlogService borrowlogService;

    @GetMapping("/borrowlog/getBorrowLogPage")
    public PaginationVO<Borrowlog> getPage(@Param("pageNo") int pageNo,
                                           @Param("pageSize") int pageSize,
                                           Borrowlog borrowlog) {
        Page<Borrowlog> page = new Page<>(pageNo, pageSize);
        PaginationVO<Borrowlog> borrowLogPage = borrowlogService.getBorrowLogPage(pageNo, pageSize, borrowlog);
        for (Borrowlog borrowlog1 : borrowLogPage.getDataList()) {
            borrowlog1.setRecordTimeStr(DateUtil.getDateStr(borrowlog1.getRecordTime()));
        }
        return borrowLogPage;
    }

    @PostMapping("/borrowlog/deleteBorrowLog")
    public boolean deleteBorrowLog(String id){
        return borrowlogService.removeById(id);
    }
}
