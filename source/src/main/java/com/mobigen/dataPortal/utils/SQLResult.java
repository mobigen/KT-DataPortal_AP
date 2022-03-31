package com.mobigen.dataPortal.utils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SQLResult {
    public SQLResult() {
    }

    private Object body = null;
    private Object header = null;

    public SQLResult(Object header, Object data) {
        this.setHeader(header);
        this.setBody(data);
    }

    public Object getHeader() {
        return header;
    }

    public void setHeader(Object value) {
        header = value;
    }

    public Object getBody() {
        return body;
    }

    public void setBody(Object value) {
        this.body = value;
    }
}
