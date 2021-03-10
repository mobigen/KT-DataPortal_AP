package com.mobigen.sample;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.servlet.http.Cookie;

import com.mobigen.framework.iris.IRISProperties;
import com.mobigen.framework.iris.Token;
import com.mobigen.framework.test.AbstractRestDocTest;

import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

public class SampleApplicationTests extends AbstractRestDocTest {
    @Autowired
    private Token token;

    @Autowired
    private IRISProperties properties;

    private String getXAccessToken() throws Exception {
        String username = "root";
        String password = "!Biris.test202";
        String xAccessToken = token.getXAccessToken(username, password);
        return xAccessToken;
    }

    @Test
    public void testGetUser() throws Exception {
        // given
        String xAccessToken = getXAccessToken();

        // when
        ResultActions result = this.mockMvc.perform(get("/sample/user").accept(MediaType.APPLICATION_JSON)
                .header(properties.getToken().getName(), xAccessToken));
        String content = result.andReturn().getResponse().getContentAsString();
        result.andExpect(status().isOk()).andDo(print());

        // then
        JSONAssert.assertEquals(this.expectedJsonResultStr, content, false);
    }

    @Test
    public void testGetusername() throws Exception {
        // given
        String xAccessToken = getXAccessToken();
        String username = "admin";

        // when
        ResultActions result = this.mockMvc.perform(get("/sample/user/{username}", username)
                .accept(MediaType.APPLICATION_JSON).header(properties.getToken().getName(), xAccessToken));
        String content = result.andReturn().getResponse().getContentAsString();
        result.andExpect(status().isOk()).andDo(print());

        // then
        JSONAssert.assertEquals(this.expectedJsonResultStr, content, false);
    }

    @Test
    public void testLocale() throws Exception {
        // TEST ENGLISH =====================
        // given
        Cookie cookie = new Cookie("locale", "en");
        String xAccessToken = getXAccessToken();

        // when
        ResultActions result = this.mockMvc.perform(get("/sample/message").accept(MediaType.APPLICATION_JSON)
                .cookie(cookie).header(properties.getToken().getName(), xAccessToken).session(this.mockSession));
        String content = result.andReturn().getResponse().getContentAsString();
        result.andExpect(status().isOk()).andDo(print());

        // then
        String en = this.getJsonResultData(content);
        assertEquals("TEST", en);

        // TEST KOREA =====================
        // given
        cookie = new Cookie("locale", "ko");

        // when
        result = this.mockMvc.perform(
                get("/sample/message").accept(MediaType.APPLICATION_JSON).cookie(cookie).session(this.mockSession));
        content = result.andReturn().getResponse().getContentAsString();
        result.andExpect(status().isOk()).andDo(print());

        // then
        String ko = this.getJsonResultData(content);
        assertEquals("테스트", ko);
    }
}
