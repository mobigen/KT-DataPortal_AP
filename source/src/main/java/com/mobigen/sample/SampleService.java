package com.mobigen.sample;

import com.mobigen.framework.component.Messages;
import com.mobigen.framework.iris.Token;
import com.mobigen.framework.security.SessionManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class SampleService {
    private final Messages message;
    private final SampleMapper sampleMapper;
    private final Token token;
    private final SessionManager sessionManager;

    public Object getMessage() {
        return message.get("sample.data");
    }

    public Object getUser(String username) throws Exception {
        return sampleMapper.getUser(username);
    }

    public Object authenticate(HttpServletRequest request, HttpServletResponse response, String username, String password) throws Exception {
        String xAccessToken = token.getXAccessToken(username, password);
        sessionManager.addTokenToResponse(request, response, xAccessToken);
        return xAccessToken;
    }

    public Object getSampleImages(int count) throws Exception {
        List<Map<String, Object>> list = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            Map<String, Object> image = new HashMap<>();
            image.put("id", i);
            image.put("src", "https://i.pravatar.cc/300?img=" + (i + 1));
            list.add(image);
        }
        return list;
    }
}