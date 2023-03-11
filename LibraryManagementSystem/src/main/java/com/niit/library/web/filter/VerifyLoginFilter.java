package com.niit.library.web.filter;

import com.niit.library.domain.Admin;
import com.niit.library.domain.User;
import com.niit.library.service.AdminService;
import com.niit.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class VerifyLoginFilter implements Filter {


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpSession session = request.getSession(false);
        String servletPath = request.getServletPath();
        System.out.println(request.getServletPath());
        if (session != null) {
            User user = (User) session.getAttribute("user");
            Admin admin = (Admin) session.getAttribute("adminUser");
            if (user != null && servletPath.contains("/user")) {
                filterChain.doFilter(request, response);
            } else if (admin != null && servletPath.contains("/admin")) {
                filterChain.doFilter(request, response);
            } else {
                response.sendRedirect(request.getContextPath() + "/");
            }
        } else {
            response.sendRedirect(request.getContextPath() + "/");
        }
    }
}
