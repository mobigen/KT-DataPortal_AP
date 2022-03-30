package com.mobigen.dataPortal.mapper;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository("metaManagementMapper")
public interface MetaManagementMapper {
    ArrayList<Object> getMetaNameList() throws Exception;
}
