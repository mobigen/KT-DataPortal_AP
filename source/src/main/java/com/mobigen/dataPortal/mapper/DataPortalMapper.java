package com.mobigen.dataPortal.mapper;

import org.springframework.stereotype.Repository;

@Repository("dataPortalMapper")
public interface DataPortalMapper {
    Object getUser(String username) throws Exception;
}
