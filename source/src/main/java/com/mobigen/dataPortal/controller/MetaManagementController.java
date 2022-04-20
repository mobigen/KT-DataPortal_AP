package com.mobigen.dataPortal.controller;

import java.util.HashMap;
import java.util.List;
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

    /**
     * MetaName 상세 정보 조회 (1건) 초기설정
     * 
     * @param nameId
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @GetMapping("/getMetaNameDetail")
    public Object getMetaNameDetail(@RequestParam String nameId) throws Exception {
        return service.getMetaNameDetail(nameId);
    }

    /**
     * MetaName 목록 조회 초기설정
     * 
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @GetMapping("/metaNameList")
    public Object getMetaNameList() throws Exception {
        return service.getMetaNameList();
    }

    /**
     * MetaMap 등록 유무 포함한 MetaName 목록 조회 초기설정
     * 
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @GetMapping("/useMetaNameList")
    public Object getUseMetaNameList() throws Exception {
        return service.getUseMetaNameList();
    }

    /**
     * MetaName 단건 조회 초기 설정
     * 
     * @param nameId
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @GetMapping("/getMetaName")
    public Object getMetaName(@RequestParam String nameId) throws Exception {
        return service.getMetaName(nameId);
    }

    /**
     * MetaName 등록 초기설정
     * 
     * @param param
     * @return
     * @throws Exception
     */
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

    /**
     * MetaName 수정 초기설정
     * 
     * @param param
     * @return
     * @throws Exception
     */
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

    /**
     * MetaName 삭제 초기설정
     * 
     * @param nameId
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @DeleteMapping("/deleteMetaName")
    public Object deleteMetaName(@RequestParam String nameId) throws Exception {
        return service.deleteMetaName(nameId);
    }

    /**
     * MetaMap 목록 조회 초기설정
     * 
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @GetMapping("/metaMapList")
    public Object getMetaMapList() throws Exception {
        return service.getMetaMapList();
    }

    /**
     * 다중 MetaMap 등록 초기설정
     * 
     * @param param
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @PostMapping("/insertMetaMap")
    public Object insertMetaMap(@RequestBody List<Object> param) throws Exception {
        service.deleteAllMetaMap();
        return param.isEmpty() ? 1 : service.insertListOfMetaMap(param);
    }

    /**
     * Meta 등록폼에 사용하는 Label 및 Value Type 조회 개발자 전용
     * 
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @GetMapping("/getBizMetaForm")
    public Object getBizMetaForm() throws Exception {
        return service.getBizMetaForm();
    }

    /**
     * 등록이 완료된 Biz Meta 정보 상세 조회 (1건) 개발자 전용
     * 
     * @param datasetId
     * @return
     */
    @ResponseJsonResult
    @GetMapping("/getBizMetaDetail")
    public Object getBizMetaDetail(@RequestParam String datasetId) {
        return service.getBizMetaDetail(datasetId);
    }

    /**
     * 등록이 완료된 Biz Meta 목록 조회 개발자 전용
     * 
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @GetMapping("/getBizMetaList")
    public Object getBizMetaList() throws Exception {
        return service.getBizMetaList();
    }

    /**
     * Biz Meta 등록 초기설정
     * 
     * @param param
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @PostMapping("/insertBizMeta")
    public Object insertBizMeta(@RequestBody List<Object> param) throws Exception {
        return service.insertListOfBizMeta(param);
    }
    
    /**
     * Biz Meta 삭제 초기설정
     * 
     * @param bizDatasetId
     * @return
     * @throws Exception
     */
    @ResponseJsonResult
    @DeleteMapping("/deleteBizMeta")
    public Object deleteBizMeta(@RequestParam String bizDatasetId) throws Exception {
        return service.deleteBizMeta(bizDatasetId);
    }

    @ResponseJsonResult
    @GetMapping("/getCategoryList")
    public Object getCategoryList() throws Exception {
        return service.getCategoryList();
    }

}