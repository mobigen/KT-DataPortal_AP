package com.mobigen.framework.configuration;

import java.util.Arrays;

import com.mobigen.framework.iris.IRISProperties;
import com.mobigen.framework.iris.Token;
import com.mobigen.framework.security.JwtAuthenticationEntryPoint;
import com.mobigen.framework.security.SessionManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Value("${server.servlet.session.cookie.name}")
	private String cookieName;

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private Token token;

	@Autowired
	private SessionManager sessionManager;

	@Autowired
	private IRISProperties properties;

	@Override
	public void configure(WebSecurity webSecurity) throws Exception {
		webSecurity.ignoring().antMatchers(properties.getSecurity().getIgnores());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// Enable CORS and disable CSRF
		http = http.cors().configurationSource(corsConfigurationSource()).and().csrf().disable();

		// Set session management to stateless
		// http =
		// http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and();

		// Set unauthorized requests exception handler
		http = http.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and();

		// Set permissions on endpoints
		http = http.authorizeRequests().antMatchers(properties.getSecurity().getPermitAlls()).permitAll().anyRequest()
				.authenticated().and();

		// Set logout
		http = http.logout().clearAuthentication(true).deleteCookies(cookieName, properties.getToken().getName())
				.invalidateHttpSession(true).logoutUrl("/logout")
				.logoutSuccessUrl(properties.getSecurity().getRedirectUrl()).and();

		// set iframe option
		switch (properties.getSecurity().getIframeOption()) {
		case "same-origin":
			http = http.headers().frameOptions().sameOrigin().and();
			break;
		case "deny":
			http = http.headers().frameOptions().deny().and();
			break;
		case "disable":
			http = http.headers().frameOptions().disable().and();
			break;
		}

		// add JWT token filter
		http.apply(new JWTSecurityConfiguration(token, sessionManager, properties));
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(properties.getSecurity().getCors().getAllowedOrigins()));
		configuration.setAllowedMethods(Arrays.asList(properties.getSecurity().getCors().getAllowedMethods()));
		configuration.setAllowedHeaders(Arrays.asList(properties.getSecurity().getCors().getAllowedHeaders()));
		// configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration(properties.getSecurity().getCors().getPattern(), configuration);

		return source;
	}
}
