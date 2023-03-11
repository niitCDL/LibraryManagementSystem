package com.niit.library.config;

import com.niit.library.web.filter.VerifyLoginFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebApplicationConfig {

    @Bean
    public FilterRegistrationBean userFilter() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(new VerifyLoginFilter());
        registrationBean.addUrlPatterns("*.html");
        registrationBean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico");
        registrationBean.setName("VerifyLoginFilter");
        registrationBean.setOrder(0);
        System.out.println("UserLoginFilter被注册了");
        return registrationBean;
    }

}
