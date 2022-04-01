package com.mobigen.dataPortal.service;

import com.mobigen.dataPortal.mapper.MetaManagementMapper;
import com.mobigen.dataPortal.utils.SQLHeader.SQLHeader;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MetaManagementService {

    private final MetaManagementMapper mapper;

    @SQLHeader(tableName = "v_biz_meta_name")
    public Object getMetaNameList() {
        return mapper.getMetaNameList();
    }

    public Object getBizMetaForm() {
        return mapper.getBizMetaForm();
    }

    public Object getBizMeta() {
        return mapper.getBizMeta();
    }

    @SQLHeader(tableName = "v_biz_meta", useRebuildBody = true)
    public Object getBizMetaList() throws Exception {
        return mapper.getBizMetaList();
    }
}
