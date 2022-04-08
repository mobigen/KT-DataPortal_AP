package com.mobigen.dataPortal.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mobigen.dataPortal.service.MetaManagementService;
import com.mobigen.framework.result.annotation.ResponseJsonResult;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/meta")
@Controller
@AllArgsConstructor
public class MetaManagementController {
    private final MetaManagementService service;

    @ResponseJsonResult
    @GetMapping("/getMetaNameDetail")
    public Object getMetaNameDetail(@RequestParam String nameId) throws Exception {
        return service.getMetaNameDetail(nameId);
    }

    @ResponseJsonResult
    @GetMapping("/metaNameList")
    public Object getMetaNameList() throws Exception {
        return service.getMetaNameList();
    }

    @ResponseJsonResult
    @GetMapping("/bizMetaForm")
    public Object getBizMetaForm() throws Exception {
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

    @ResponseJsonResult
    @GetMapping("/getMetaName")
    public Object getMetaName(@RequestParam String nameId) throws Exception {
        return service.getMetaName(nameId);
    }

    @ResponseJsonResult
    @PostMapping("/insertMetaName")
    public Object insertMetaName(@RequestBody Map<String, Object> param) throws Exception {
        Map<String, Object> metaName = new HashMap<>();

        metaName.put("korName", param.get("kor_name"));
        metaName.put("engName", param.get("eng_name"));
        metaName.put("showOrder", param.get("show_order"));
        metaName.put("type", param.get("type"));

        return service.insertMetaName(metaName);
    }

    @ResponseJsonResult
    @PutMapping("/updateMetaName")
    public Object updateMetaName(@RequestBody Map<String, Object> param) throws Exception {
        Map<String, Object> metaName = new HashMap<>();

        metaName.put("korName", param.get("kor_name"));
        metaName.put("engName", param.get("eng_name"));
        metaName.put("nameId", param.get("name_id"));
        metaName.put("showOrder", param.get("show_order"));
        metaName.put("type", param.get("type"));

        return service.updateMetaName(metaName);
    }

    @ResponseJsonResult
    @DeleteMapping("/deleteMetaName")
    public Object deleteMetaName(@RequestParam String nameId) throws Exception {
        return service.deleteMetaName(nameId);
    }

}