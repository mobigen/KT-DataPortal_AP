package com.mobigen.dataPortal.service;

import com.mobigen.dataPortal.mapper.MetaManagementMapper;
import com.mobigen.dataPortal.utils.SQLHeader;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MetaManagementService {

    private final MetaManagementMapper mapper;

    @SQLHeader(tableName = "v_biz_meta_name")
    public Object getMetaNameList() throws Exception {
        return mapper.getMetaNameList();
    }
}
