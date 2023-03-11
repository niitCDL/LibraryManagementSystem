package com.niit.library.util;

import com.niit.library.domain.Book;

import java.lang.reflect.Field;
import java.util.ArrayList;

public class LikeQueryUtil {

    public static ArrayList<String> FieldToLower(Class clazz) {
        ArrayList<String> list = new ArrayList<>();
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            StringBuilder s = new StringBuilder();
            String name = field.getName();
            if ("serialVersionUID".equalsIgnoreCase(name))
                continue;
            for (int i = 0; i < name.length(); i++) {
                char c = name.charAt(i);
                if (c >= 'A' && c <= 'Z') {
                    String cstr = String.valueOf(c);
                    s.append("_" + cstr.toLowerCase());
                    continue;
                }
                s.append(c);
            }
            list.add(s.toString());
            s.delete(0, s.length());
        }
        return list;
    }


    public static String tableFieldToUpper(String name) {
        StringBuilder s = new StringBuilder();
        name = String.valueOf(name.charAt(0)).toUpperCase() + name.substring(1,name.length());
        for (int i = 0; i < name.length(); i++) {
            char c = name.charAt(i);
            if (c == '_') {
                String cstr = String.valueOf(name.charAt(i+1));
                s.append(cstr.toUpperCase());
                i++;
                continue;
            }
            s.append(c);
        }
        return s.toString();
    }
}

