package com.mobigen.sample;

import com.mobigen.framework.iris.User;
import com.mobigen.framework.security.SessionManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ViewController {
	@Autowired
	private SessionManager sessionManager;

	@GetMapping("/")
	public String index() {
		User user = sessionManager.getUser();
		if (null == user) {
			return "index";
		}
		return "app";
	}

	@GetMapping("/app")
	public String app() {
		return "app";
	}

	@PostMapping("/test")
	public String test() {
		return "redirect:/";
	}
}
