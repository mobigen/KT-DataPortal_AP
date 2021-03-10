package com.mobigen.sample;

import java.util.Map;

import com.mobigen.framework.iris.User;
import com.mobigen.framework.result.annotation.ResponseJsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/sample")
@Controller
public class SampleController {
    @Autowired
    private SampleService sampleService;

    @ResponseJsonResult
    @PostMapping("/authenticate")
    public Object authenticate(@RequestBody Map<String, String> param) throws Exception {
        String username = param.get("username");
        String password = param.get("password");
        return sampleService.authenticate(username, password);
    }

    @ResponseJsonResult
    @GetMapping("/user")
    public Object user(@AuthenticationPrincipal User user) {
        return user.getUsername();
    }

    @ResponseJsonResult
    @GetMapping("/message")
    public Object message() {
        return sampleService.getMessage();
    }

    @ResponseJsonResult
    @GetMapping("/user/{username}")
    public Object getUser(@PathVariable String username) throws Exception {
        return sampleService.getUser(username);
    }
}