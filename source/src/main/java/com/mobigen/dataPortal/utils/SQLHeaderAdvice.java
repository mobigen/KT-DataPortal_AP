package com.mobigen.dataPortal.utils;

import com.mobigen.dataPortal.mapper.SQLViewMapper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SQLHeaderAdvice {

    private final SQLViewMapper sqlViewMapper;

    public SQLHeaderAdvice(SQLViewMapper sqlViewMapper) {
        this.sqlViewMapper = sqlViewMapper;
    }

    @Around("@annotation(com.mobigen.dataPortal.utils.SQLHeader)")
    private Object getSQLHeader(ProceedingJoinPoint point) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) point.getSignature();
        SQLHeader sqlHeader = methodSignature.getMethod().getAnnotation(SQLHeader.class);

        String tableName = sqlHeader.tableName();
        Object viewResult = sqlViewMapper.getViewTableColumn(tableName);
        Object value = point.proceed();

        return new SQLResult(viewResult, value);
    }
}