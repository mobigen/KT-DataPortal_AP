package com.mobigen.dataPortal.utils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SQLResult {
    public SQLResult() {
    }

    private Object data = null;
    private Object header = null;

    public SQLResult(Object header, Object data) {
        this.setHeader(header);
        this.setData(data);
    }

    public Object getHeader() {
        return header;
    }

    public void setHeader(Object value) {
        header = value;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object value) {
        data = value;
    }
}
