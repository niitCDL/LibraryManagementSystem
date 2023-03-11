package com.niit.library.util;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.niit.library.domain.Book;
import com.niit.library.domain.Kind;
import com.niit.library.domain.User;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class LikeQueryWrapperUtil {

    public static QueryWrapper getWrapper(Object obj) {
        if (obj == null)
            return null;
        ArrayList<String> strings = LikeQueryUtil.FieldToLower(obj.getClass());//bookName book_name getBookName
        QueryWrapper wrapper = new QueryWrapper<>();
        for (String filedName : strings) {
            String methodName = "get" + LikeQueryUtil.tableFieldToUpper(filedName);//getBookName
            Method declaredMethod = null;
            try {
                declaredMethod = obj.getClass().getDeclaredMethod(methodName);
                Object rs = declaredMethod.invoke(obj);
                wrapper.like(rs != null, filedName, rs);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (User.class == obj.getClass()) {
            wrapper.orderByDesc("join_date");
        } else if (Book.class == obj.getClass()) {
            wrapper.orderByDesc("publication_date");
        }else if (Kind.class == obj.getClass()){
            wrapper.orderByAsc("order_by");
        }
        return wrapper;
    }
}
