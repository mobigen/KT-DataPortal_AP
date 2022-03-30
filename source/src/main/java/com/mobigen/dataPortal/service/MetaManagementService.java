package com.mobigen.dataPortal.service;

import com.mobigen.dataPortal.mapper.DataPortalMapper;
import com.mobigen.dataPortal.mapper.MetaManagementMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MetaManagementService {
    private final MetaManagementMapper mapper;

    public Object getMetaNameList() throws Exception {
        return mapper.getMetaNameList();
    }
}
