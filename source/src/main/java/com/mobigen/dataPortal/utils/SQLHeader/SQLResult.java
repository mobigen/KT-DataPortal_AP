package com.mobigen.dataPortal.utils.SQLHeader;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SQLResult {
    public SQLResult() {
    }

    private Object body = null;
    private Object header = null;
    private boolean useRebuildBody = false;

    public SQLResult(Object header, Object data, boolean useRebuildBody) {
        this.setHeader(header);
        this.setBody(data);
        this.setUseRebuildBody(useRebuildBody);
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

    public boolean getUseRebuildBody() {
        return useRebuildBody;
    }

    public void setUseRebuildBody(boolean value) {
        this.useRebuildBody = value;
    }
}
