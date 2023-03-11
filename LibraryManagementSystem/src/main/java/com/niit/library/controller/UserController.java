package com.niit.library.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.niit.library.domain.User;
import com.niit.library.service.UserService;
import com.niit.library.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/user/login")
    public Map<String,String> login(HttpServletRequest request, User user){
        Map<String, String> msgMap = new HashMap<>();
        User one = userService.getOne(new QueryWrapper<>(user));
        HttpSession session = request.getSession();
        if (one == null){
            msgMap.put("msg","用户名或密码错误");
        }else{
            one.setJoinDateStr(DateUtil.getDateStr(one.getJoinDate()));
            session.setAttribute("user",one);
            msgMap.put("msg","true");
        }
        return msgMap;
    }


    @PostMapping("/user/register")
    public Map<String,String> register(HttpServletRequest request, User user){
        Map<String, String> msgMap = new HashMap<>();
        boolean save = userService.registeredUser(user);
        user.setJoinDate(new Date());
        user.setNoReturn(0);
        if (!save){
            msgMap.put("msg","用户名已存在");
        }else{
            msgMap.put("msg","true");
        }
        return msgMap;
    }
}
