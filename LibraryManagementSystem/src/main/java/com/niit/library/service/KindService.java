package com.niit.library.service;

import com.niit.library.domain.Kind;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author lenovo
* @description 针对表【kind】的数据库操作Service
* @createDate 2022-12-02 10:05:40
*/
public interface KindService extends IService<Kind> {
    boolean isBorrowBook(Long id);

    Integer getMaxOrder();
}
