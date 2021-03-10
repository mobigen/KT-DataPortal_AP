package com.mobigen.framework.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobigen.framework.iris.IRISProperties;
import com.mobigen.framework.iris.Token;
import com.mobigen.framework.iris.User;

import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final Token token;
    private final SessionManager sessionManager;
    private final IRISProperties properties;

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
            User user = sessionManager.getUser();
            if (user == null) {
                user = token.getUserByHttpServletRequest(request);
                sessionManager.auth(request, response, user);
            }
        }

        filterChain.doFilter(request, response);
    }
}
