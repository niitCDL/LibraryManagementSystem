package com.niit.library.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.niit.library.domain.Admin;
import com.niit.library.domain.Book;
import com.niit.library.domain.User;
import com.niit.library.service.AdminService;
import com.niit.library.service.UserService;
import com.niit.library.util.DateUtil;
import com.niit.library.util.LikeQueryWrapperUtil;
import com.niit.library.vo.PaginationVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AdminController {
    @Autowired
    UserService userService;
    @Autowired
    AdminService adminService;

    @PostMapping("/admin/saveUser")
    public boolean saveUser(User user){
        user.setJoinDate(new Date());
        user.setNoReturn(0);
        return userService.registeredUser(user);
    }

    @GetMapping("/admin/getUserPage")
    public PaginationVO<User> getPage(@Param("pageNo") int pageNo,
                                      @Param("pageSize")int pageSize,
                                      User user){
        Page<User> page = new Page<>(pageNo,pageSize);
        user.setNoReturn(user.getNoReturn() == -1 ? null : user.getNoReturn());
        userService.page(page, LikeQueryWrapperUtil.getWrapper(user));
        for (User record : page.getRecords()) {
            record.setJoinDateStr(DateUtil.getDateStr(record.getJoinDate()));
        }
        PaginationVO<User> vo = new PaginationVO<>();
        vo.setDataList(page.getRecords());
        vo.setPages(page.getPages());
        vo.setTotal(page.getTotal());
        return vo;
    }

    @PostMapping("/admin/deleteUser")
    public boolean deleteUser(String id){
        return userService.removeById(Long.valueOf(id));
    }

    @GetMapping("/admin/fillUpdateUserModal")
    public User fillUpdateUserModal(String id){
        return userService.getById(Long.valueOf(id));
    }

    @PostMapping("/admin/updateUser")
    public boolean updateUser(User user){
        return userService.updateById(user);
    }
    @PostMapping("/admin/updateUser2")
    public void updateUser2(User user,HttpServletResponse response,HttpServletRequest request){
        try {
            userService.updateById(user);
            User byId = userService.getById(user.getId());
            request.getSession().setAttribute("user",byId);
            response.sendRedirect("/user/personalCenter.html");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/admin/login")
    public Map<String,String> login(HttpServletRequest request, Admin admin){
        Map<String, String> msgMap = new HashMap<>();
        Admin one = adminService.getOne(new QueryWrapper<>(admin));
        HttpSession session = request.getSession();
        if (one == null){
            msgMap.put("msg","用户名或密码错误");
        }else{
            session.setAttribute("adminUser",one);
            msgMap.put("msg","true");
        }
        return msgMap;
    }

    @GetMapping("/admin/logout")
    public void logOut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        session.removeAttribute("adminUser");
        response.sendRedirect("/");
    }

}
