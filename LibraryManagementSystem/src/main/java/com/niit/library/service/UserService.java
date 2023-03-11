package com.niit.library.service;

import com.niit.library.domain.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author lenovo
* @description 针对表【user】的数据库操作Service
* @createDate 2022-12-02 10:05:40
*/
public interface UserService extends IService<User> {
    boolean registeredUser(User user);
}
