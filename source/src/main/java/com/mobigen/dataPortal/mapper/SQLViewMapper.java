package com.mobigen.dataPortal.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("sqlViewMapper")
public interface SQLViewMapper {
    List<Object> getViewTableColumn(String tableName) throws Exception;
}
