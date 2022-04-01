package com.mobigen.dataPortal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
	@GetMapping("/getBizMeta")
	public Object getBizMeta() throws Exception {
		return service.getBizMeta();
	}

	@ResponseJsonResult
	@GetMapping("/getBizMetaList")
	public Object getBizMetaList() throws Exception {
		return service.getBizMetaList();
	}

}