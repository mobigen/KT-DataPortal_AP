package com.mobigen.dataPortal.service;

import com.mobigen.dataPortal.mapper.SQLViewMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public abstract class SQLHeaderService {

    private final SQLViewMapper mapper;

    public List<Object> getSQLHeader(String tableName) throws Exception {
        return mapper.getViewTableColumn(tableName);
    }
}
