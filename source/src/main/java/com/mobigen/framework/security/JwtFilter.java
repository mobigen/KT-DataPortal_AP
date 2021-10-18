package com.mobigen.framework.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobigen.framework.iris.IRISProperties;
import com.mobigen.framework.iris.IRISProperties.TestProperties;
import com.mobigen.framework.iris.Token;
import com.mobigen.framework.iris.User;

import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    private Token token;
    private SessionManager sessionManager;
    private IRISProperties properties;

    public JwtFilter(Token token, SessionManager sessionManager, IRISProperties properties) {
        this.token = token;
        this.sessionManager = sessionManager;
        this.properties = properties;
    }

    private Boolean isLocal(HttpServletRequest request) {
        TestProperties testProp = properties.getTest();
        if (null == testProp || true != testProp.getLocalForceLoginEnabled()) {
            return false;
        }

        String remoteHost = request.getRemoteHost();
        switch (remoteHost) {
        case "localhost":
        case "0:0:0:0:0:0:0:1":
        case "127.0.0.1":
            return true;
        }
        return false;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();

        AntPathMatcher p = new AntPathMatcher();
        String[] ignores = properties.getSecurity().getIgnores();
        for (int i = 0; i < ignores.length; i++) {
            if (p.match(ignores[i], path)) {
                return true;
            }
        }

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (!shouldNotFilter(request)) {
            try {
                // 유효하지 않는 token 제거
                String xAccessToken = token.getXAccessTokenByHttpServletRequest(request);
                if (token.isExpiredToken(xAccessToken)) {
                    token.deleteCookieByHttpServletResponse(response, properties.getToken().getName());
                    xAccessToken = null;
                }

                User user = sessionManager.getUser();
                if (user == null) {
                    // 로컬 환경일 경우 강제로 token을 생성함
                    if (isLocal(request)) {
                        if (null == xAccessToken || xAccessToken.isEmpty()) {
                            // 계정 정보는 그떄 그때 바꿔 줘야함
                            xAccessToken = token.getXAccessToken(properties.getTest().getBrickUsername(),
                                    properties.getTest().getBrickPassword());
                        }
                        Cookie xAccessTokenCookie = new Cookie(properties.getToken().getName(), xAccessToken);
                        xAccessTokenCookie.setPath("/");
                        xAccessTokenCookie.setHttpOnly(true);
                        response.addCookie(xAccessTokenCookie);
                        user = token.getUserByXAccessToken(xAccessToken);
                        log.debug("MAKE SESSION (LOCAL): {}", xAccessToken);
                    } else {
                        user = token.getUserByHttpServletRequest(request);
                    }
                    sessionManager.auth(request, response, user);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                e.printStackTrace();
            }
        }

        filterChain.doFilter(request, response);
    }
}
