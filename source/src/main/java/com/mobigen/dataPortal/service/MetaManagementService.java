package com.mobigen.dataPortal.service;

import com.mobigen.dataPortal.mapper.MetaManagementMapper;
import com.mobigen.dataPortal.utils.SQLHeader.SQLHeader;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class MetaManagementService {

    private final MetaManagementMapper mapper;

    @SQLHeader(tableName = "v_biz_meta_name")
    public Object getMetaNameDetail(String nameId) {
        return mapper.getMetaNameDetail(nameId);
    }

    @SQLHeader(tableName = "v_biz_meta_name")
    public Object getMetaNameList(Map<String, Object> paging) {
        return mapper.getMetaNameList(paging);
    }

    public Object getBizMetaForm() {
        return mapper.getBizMetaForm();
    }

    @SQLHeader(tableName = "v_biz_meta")
    public Object getBizMetaDetail(String datasetId) {
        return mapper.getBizMetaDetail(datasetId);
    }

    @SQLHeader(tableName = "v_biz_meta")
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

    public int insertListOfBizMeta(List<Object> param) {
        return mapper.insertListOfBizMeta(param);
    }

    public int deleteBizMeta(String bizDatasetId) {
        return mapper.deleteBizMeta(bizDatasetId);
    }

    public int updateListOfBizMeta(Object bizMeta) {
        return mapper.updateListOfBizMeta(bizMeta);
    }

    @Transactional(rollbackFor = Exception.class)
    public void setViewTable() {
        // drop view table
        mapper.dropBizMetaViewTable();

        // meta정보 조회
        ArrayList<Object> metaNameList = mapper.getMetaNameForView();

        StringBuilder text = new StringBuilder();
        HashMap map = null;

        for (Object o : metaNameList) {
            map = (HashMap) o;
            text
                    .append(", max(case when item_id = '")
                    .append(Integer.parseInt(map.get("item_id").toString()))
                    .append("' then item_val end) as ")
                    .append(map.get("eng_name").toString());
        }

        // create view table
        mapper.createBizViewTable(text.toString());
    }
}
