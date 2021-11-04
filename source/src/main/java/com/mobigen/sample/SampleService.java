package com.mobigen.sample;

import com.mobigen.framework.component.Messages;
import com.mobigen.framework.iris.Token;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SampleService {
    private final Messages message;
    private final SampleMapper sampleMapper;
    private final Token token;

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