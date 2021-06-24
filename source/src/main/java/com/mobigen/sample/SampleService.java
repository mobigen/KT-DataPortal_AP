package com.mobigen.sample;

import com.mobigen.framework.component.Messages;
import com.mobigen.framework.iris.Token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SampleService {
    @Autowired
    private Messages message;

    @Autowired
    private SampleMapper sampleMapper;

    @Autowired
    private Token token;

    public Object getMessage() {
        return message.get("sample.data");
    }

    public Object getUser(String username) throws Exception {
        return sampleMapper.getUser(username);
    }

    public Object authenticate(String username, String password) throws Exception {
        return token.getXAccessToken(username, password);
    }
}