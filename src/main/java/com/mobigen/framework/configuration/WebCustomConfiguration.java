package com.mobigen.framework.configuration;

import com.mobigen.framework.iris.IRISProperties;
import com.mobigen.framework.security.CustomInterceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class WebCustomConfiguration implements WebMvcConfigurer {
    private final CustomInterceptor customInterceptor;
    private final IRISProperties properties;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins(properties.getSecurity().getCorsAllowedOrigins());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(customInterceptor);
    }
}
