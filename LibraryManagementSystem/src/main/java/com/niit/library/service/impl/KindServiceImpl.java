package com.niit.library.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.niit.library.domain.Kind;
import com.niit.library.service.KindService;
import com.niit.library.mapper.KindMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author lenovo
 * @description 针对表【kind】的数据库操作Service实现
 * @createDate 2022-12-02 10:05:40
 */
@Service
public class KindServiceImpl extends ServiceImpl<KindMapper, Kind>
        implements KindService {
    @Autowired
    KindMapper kindMapper;

    @Override
    public boolean isBorrowBook(Long id) {
        Integer bookCount = kindMapper.isBorrowBook(id);
        return bookCount == 0;
    }

    @Override
    public Integer getMaxOrder() {
        return kindMapper.getMaxOrder();
    }
}




