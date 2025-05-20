package com.example.findr.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import jakarta.annotation.PreDestroy;

@Configuration
@EnableMongoRepositories(basePackages = "com.example.findr.repositories")
@EnableMongoAuditing // Enable MongoDB auditing for date fields
public class MongoConfig extends AbstractMongoClientConfiguration {
    
    private static final Logger logger = LoggerFactory.getLogger(MongoConfig.class);
    
    private MongoClient mongoClient;
    
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;
    
    @Value("${spring.data.mongodb.database}")
    private String databaseName;
    
    @Override
    protected String getDatabaseName() {
        return databaseName;
    }
    
    @Override
    @Bean
    public MongoClient mongoClient() {
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(mongoUri))
                .build();
        
        this.mongoClient = MongoClients.create(settings);
        return this.mongoClient;
    }
    
    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), getDatabaseName());
    }
    
    @PreDestroy
    public void close() {
        if (mongoClient != null) {
            logger.info("Closing MongoDB client connections");
            mongoClient.close();
            logger.info("MongoDB client connections closed");
        }
    }
}