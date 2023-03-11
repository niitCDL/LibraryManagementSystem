package com.niit.library.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.niit.library.domain.Kind;
import com.niit.library.domain.User;
import com.niit.library.service.KindService;
import com.niit.library.util.LikeQueryWrapperUtil;
import com.niit.library.vo.PaginationVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
public class CategoryController {

    @Autowired
    KindService categoryService;

    @GetMapping("/category/getCategoryPage")
    public PaginationVO<Kind> getPage(@Param("pageNo") int pageNo,
                                      @Param("pageSize") int pageSize,
                                      Kind category) {
        Page<Kind> page = new Page<>(pageNo, pageSize);
        categoryService.page(page, LikeQueryWrapperUtil.getWrapper(category));
        PaginationVO<Kind> vo = new PaginationVO<>();
        vo.setDataList(page.getRecords());
        vo.setPages(page.getPages());
        vo.setTotal(page.getTotal());
        return vo;
    }

    @PostMapping("/category/saveCategory")
    public boolean saveCategory(Kind kind) {
        boolean flag = categoryService.isBorrowBook(kind.getId());
        if (!flag)
            return false;
        kind.setOrderBy(categoryService.getMaxOrder() + 1);
        return categoryService.save(kind);
    }

    @PostMapping("/category/deleteCategory")
    public boolean deleteCategory(String id) {
        boolean flag = categoryService.isBorrowBook(Long.valueOf(id));
        if (!flag)
            return false;
        return categoryService.removeById(Long.valueOf(id));
    }

    @GetMapping("/category/fillUpdateCategoryModal")
    public Kind getCategoryName(String id) {
        return categoryService.getById(Long.valueOf(id));
    }

    @PostMapping("/category/updateCategory")
    public boolean updateCategory(Kind kind) {
        return categoryService.updateById(kind);
    }
}