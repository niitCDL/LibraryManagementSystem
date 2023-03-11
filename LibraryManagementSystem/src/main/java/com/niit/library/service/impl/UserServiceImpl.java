package com.niit.library.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.niit.library.domain.Admin;
import com.niit.library.domain.User;
import com.niit.library.mapper.AdminMapper;
import com.niit.library.service.UserService;
import com.niit.library.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author lenovo
 * @description 针对表【user】的数据库操作Service实现
 * @createDate 2022-12-02 09:09:30
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService {

    @Autowired
    UserMapper userMapper;
    @Autowired
    AdminMapper adminMapper;

    @Override
    public boolean registeredUser(User user) {
        List<User> users = userMapper.selectList(null);
        for (User us : users) {
            if (us.getUserName().equals(user.getUserName())) {
                return false;
            }
        }
        List<Admin> admins = adminMapper.selectList(null);
        for (Admin admin : admins) {
            if (admin.getAdminName().equals(user.getUserName())) {
                return false;
            }
        }
        user.setJoinDate(new Date());
        user.setNoReturn(0);
        return userMapper.insert(user) != -1;
    }

}




