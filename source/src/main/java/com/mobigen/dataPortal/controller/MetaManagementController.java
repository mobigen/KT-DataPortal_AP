package com.mobigen.dataPortal.controller;

import com.mobigen.dataPortal.service.DataPortalService;
import com.mobigen.dataPortal.service.MetaManagementService;
import com.mobigen.framework.iris.IRISProperties;
import com.mobigen.framework.iris.User;
import com.mobigen.framework.result.annotation.ResponseJsonResult;
import com.mobigen.framework.utility.RSA;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RequestMapping("/api/meta")
@Controller
@AllArgsConstructor
public class MetaManagementController {
    private final MetaManagementService service;

    @ResponseJsonResult
    @GetMapping("/metaNameList")
    public Object getMetaNameList() throws Exception {
        return service.getMetaNameList();
    }
}