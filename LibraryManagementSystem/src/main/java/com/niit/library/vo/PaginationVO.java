package com.niit.library.vo;


import java.util.List;

public class PaginationVO<T> {
    //总记录条数
    private Long total;
    //有多少页
    private Long pages;
    //数据
    private List<T> dataList;


    public List<T> getDataList() {
        return dataList;
    }

    public void setDataList(List<T> dataList) {
        this.dataList = dataList;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Long getPages() {
        return pages;
    }

    public void setPages(Long pages) {
        this.pages = pages;
    }
}
