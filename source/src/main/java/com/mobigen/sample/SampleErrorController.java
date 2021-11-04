package com.mobigen.sample;

import com.mobigen.framework.iris.User;
import com.mobigen.framework.security.SessionManager;
import lombok.AllArgsConstructor;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/error")
@AllArgsConstructor
public class SampleErrorController implements ErrorController {
    private SessionManager sessionManager;

    static final String ERROR_PAGE = "error";
    static final String INDEX_PAGE = "index";
    static final String APP_PAGE = "app";

    public String error(HttpServletResponse response) {
        User user = sessionManager.getUser();
        if (null == user) {
            return INDEX_PAGE;
        }
        response.setStatus(HttpStatus.OK.value());
        return APP_PAGE;
    }

    public String getErrorPath() {
        return ERROR_PAGE;
    }

}
