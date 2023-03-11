package com.niit.library.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.niit.library.domain.Admin;
import com.niit.library.service.AdminService;
import com.niit.library.mapper.AdminMapper;
import org.springframework.stereotype.Service;

/**
* @author lenovo
* @description 针对表【admin】的数据库操作Service实现
* @createDate 2022-12-02 10:05:40
*/
@Service
public class AdminServiceImpl extends ServiceImpl<AdminMapper, Admin>
    implements AdminService{

}




