package com.mobigen.dataPortal.utils.SQLHeader;

import com.mobigen.dataPortal.mapper.SQLViewMapper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;

@Aspect
@Component
public class SQLHeaderAdvice {

    private final SQLViewMapper sqlViewMapper;

    public SQLHeaderAdvice(SQLViewMapper sqlViewMapper) {
        this.sqlViewMapper = sqlViewMapper;
    }

    @Around("@annotation(com.mobigen.dataPortal.utils.SQLHeader.SQLHeader)")
    private Object getSQLHeader(ProceedingJoinPoint point) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) point.getSignature();
        SQLHeader sqlHeader = methodSignature.getMethod().getAnnotation(SQLHeader.class);

        String tableName = sqlHeader.tableName();
        Object header = sqlViewMapper.getViewTableColumn(tableName);

        boolean useRebuildBody = sqlHeader.useRebuildBody();
        Object body = point.proceed();

        return new SQLResult(header, body, useRebuildBody);
    }
}