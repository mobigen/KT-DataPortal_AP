package com.mobigen.dataPortal.mapper;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository("metaManagementMapper")
public interface MetaManagementMapper {
    ArrayList<Object> getMetaNameDetail(String nameId);

    ArrayList<Object> getMetaNameList(Map<String, Object> paging);

    ArrayList<Object> getBizMetaForm();

    ArrayList<Object> getBizMetaDetail(String datasetId);

    ArrayList<Object> getBizMetaList();

    Object getMetaName(String nameId);

    int insertMetaName(Object metaName);

    int updateMetaName(Object metaName);

    int deleteMetaName(String nameId);

    ArrayList<Object> getMetaMapList();

    ArrayList<Object> getUseMetaNameList();

    int insertListOfMetaMap(List<Object> param);

    void deleteAllMetaMap();

    ArrayList<Object> getCategoryList();

    int insertListOfBizMeta(List<Object> param);

    int deleteBizMeta(String bizDatasetId);

    int updateListOfBizMeta(Object bizMeta);

    void dropBizMetaViewTable();

    ArrayList<Object> getMetaNameForView();

    void createBizViewTable(String sql);
}
