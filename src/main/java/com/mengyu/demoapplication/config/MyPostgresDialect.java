package com.mengyu.demoapplication.config;

import org.hibernate.dialect.PostgreSQLDialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyPostgresDialect extends PostgreSQLDialect {

    @Override
    public String getCheckCondition(String columnName, String[] values) {
        // We do not want enum database checks
        return null;
    }
}
