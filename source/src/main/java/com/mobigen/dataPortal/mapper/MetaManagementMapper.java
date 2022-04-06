package com.mobigen.dataPortal.mapper;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository("metaManagementMapper")
public interface MetaManagementMapper {
    ArrayList<Object> getMetaNameList();

    Object getBizMetaForm();

    Object getBizMeta();

    ArrayList<Object> getBizMetaList();

    Object getMetaName(String nameId);

    int insertMetaName(Object metaName);

    int updateMetaName(Object metaName);

    int deleteMetaName(String nameId);
}
