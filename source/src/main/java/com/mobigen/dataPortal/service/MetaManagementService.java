package com.mobigen.dataPortal.service;

import com.mobigen.dataPortal.mapper.MetaManagementMapper;
import com.mobigen.dataPortal.utils.SQLHeader.SQLHeader;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MetaManagementService {

    private final MetaManagementMapper mapper;

    @SQLHeader(tableName = "v_biz_meta_name")
    public Object getMetaNameDetail(String nameId) {
        return mapper.getMetaNameDetail(nameId);
    }

    @SQLHeader(tableName = "v_biz_meta_name")
    public Object getMetaNameList() {
        return mapper.getMetaNameList();
    }

    public Object getBizMetaForm() {
        return mapper.getBizMetaForm();
    }

    @SQLHeader(tableName = "v_biz_meta", useRebuildBody = true)
    public Object getBizMetaDetail(String datasetId) {
        return mapper.getBizMetaDetail(datasetId);
    }

    @SQLHeader(tableName = "v_biz_meta", useRebuildBody = true)
    public Object getBizMetaList() throws Exception {
        return mapper.getBizMetaList();
    }

    // @SQLHeader(tableName = "v_biz_meta_name")
    public Object getMetaName(String nameId) {
        return mapper.getMetaName(nameId);
    }

    public int insertMetaName(Object metaName) {
        return mapper.insertMetaName(metaName);
    }

    public int updateMetaName(Object metaName) {
        return mapper.updateMetaName(metaName);
    }

    public int deleteMetaName(String nameId) {
        return mapper.deleteMetaName(nameId);
    }

    @SQLHeader(tableName = "v_biz_meta_map")
    public Object getMetaMapList() {
        return mapper.getMetaMapList();
    }

    public Object getUseMetaNameList() {
        return mapper.getUseMetaNameList();
    }

    public int insertListOfMetaMap(List<Object> param) {
        return mapper.insertListOfMetaMap(param);
    }

    public void deleteAllMetaMap() {
        mapper.deleteAllMetaMap();

    }

    public Object getCategoryList() {
        return mapper.getCategoryList();
    }
}
