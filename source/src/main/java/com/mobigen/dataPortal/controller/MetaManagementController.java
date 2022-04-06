package com.mobigen.dataPortal.controller;

import com.mobigen.dataPortal.service.MetaManagementService;
import com.mobigen.framework.result.annotation.ResponseJsonResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RequestMapping("/api/meta")
@Controller
@AllArgsConstructor
public class MetaManagementController {
    private final MetaManagementService service;

    @ResponseJsonResult
    @GetMapping("/getMetaNameDetail")
    public Object getMetaNameDetail(@RequestParam String nameId) {
        return service.getMetaNameDetail(nameId);
    }

    @ResponseJsonResult
    @GetMapping("/metaNameList")
    public Object getMetaNameList() {
        return service.getMetaNameList();
    }

    @ResponseJsonResult
    @GetMapping("/bizMetaForm")
    public Object getBizMetaForm() {
        return service.getBizMetaForm();
    }

    @ResponseJsonResult
    @GetMapping("/getBizMetaDetail")
    public Object getBizMetaDetail(@RequestParam String datasetId) {
        return service.getBizMetaDetail(datasetId);
    }

    @ResponseJsonResult
    @GetMapping("/getBizMetaList")
    public Object getBizMetaList() throws Exception {
        return service.getBizMetaList();
    }


}