package com.mobigen.sample;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobigen.framework.iris.User;
import com.mobigen.framework.security.SessionManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class SampleErrorController implements ErrorController {
    @Autowired
    private SessionManager sessionManager;

    @GetMapping(value = "/error")
    public String error(HttpServletRequest request, HttpServletResponse response) {
        User user = sessionManager.getUser();
        if (null == user) {
            return "index";
        }
        response.setStatus(HttpStatus.OK.value());
        return "app";
    }

    @Override
    public String getErrorPath() {
        return "error";
    }

}
