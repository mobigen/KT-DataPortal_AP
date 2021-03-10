package com.mobigen.framework.iris;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "properties.iris")
public class IRISProperties {
    private TokenProperties token;
    private ServerProperties server;
    private UrlProperties url;
    private RouteProperties route;
    private SecurityProperties security;

    @Data
    @ConfigurationProperties(prefix = "token")
    public static class TokenProperties {
        private String name;
        private String secret;
    }

    @Data
    @ConfigurationProperties(prefix = "server")
    public static class ServerProperties {
        private String brick;
        private String angora;
        private String meta;
    }

    @Data
    @ConfigurationProperties(prefix = "url")
    public static class UrlProperties {
        private BrickProperties brick;
        private AngoraProperties angora;

        @Data
        @ConfigurationProperties(prefix = "brick")
        public static class BrickProperties {
            private String auth;
            private String tokenCheck;
        }

        @Data
        @ConfigurationProperties(prefix = "angora")
        public static class AngoraProperties {
            private String auth;
            private String tokenCheck;
        }
    }

    @Data
    @ConfigurationProperties(prefix = "route")
    public static class RouteProperties {
        private String[] locales;
    }

    @Data
    @ConfigurationProperties(prefix = "security")
    public static class SecurityProperties {
        private String[] ignores;
        private String[] permitAlls;
        private String redirectUrl;
        private String iframeOption;
        private String[] corsAllowedOrigins;
        private String sameSite;
    }
}
