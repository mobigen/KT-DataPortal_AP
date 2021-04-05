package com.mobigen.framework.security;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobigen.framework.iris.User;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class SessionManager {
	/**
	 * 계정 정보를 직접 전달하여 세션 생성
	 * 
	 * @param request
	 * @param response
	 * @param user
	 * @return
	 * @throws Exception
	 */
	public User auth(HttpServletRequest request, HttpServletResponse response, User user) {
		if (user == null) {
			return null;
		}

		// 사용자 Token 생성
		List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
		grantedAuths.add(new SimpleGrantedAuthority("Administrator"));

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null,
				grantedAuths);
		authenticationToken.setDetails(user);

		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		// repository.saveContext(SecurityContextHolder.getContext(), request,
		// response);

		return user;
	}

	/**
	 * 현재 세션에 대한 사용자 계정을 반환
	 * 
	 * @return
	 */
	public User getUser() {
		User user = null;
		try {
			Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
			if (details instanceof User) {
				user = (User) details;
			}
		} catch (Exception e) {
		}
		return user;
	}

	/**
	 * 현재 세션에 대한 사용자 계정을 반환
	 * 
	 * @return
	 */
	public String getUsername() {
		String name = "";
		try {
			User user = this.getUser();
			if (user != null) {
				name = user.getUsername();
			}
		} catch (Exception e) {
		}

		return name;
	}
}
