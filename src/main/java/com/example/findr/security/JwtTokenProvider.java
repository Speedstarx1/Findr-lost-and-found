package com.example.findr.security;

import java.security.Key;
import java.util.Date;

import jakarta.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    
    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private int jwtExpirationInMs;
    
    private Key key;
    
    @PostConstruct
    public void init() {
        logger.info("Initializing JWT token provider");
        
        if (!StringUtils.hasText(jwtSecret) || "default_jwt_secret_for_development_only".equals(jwtSecret)) {
            String message = "JWT secret is not properly configured. Using a default secret is insecure for production!";
            logger.warn(message);
        }
        
        try {
            this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            logger.info("JWT key initialized successfully");
        } catch (Exception e) {
            String errorMessage = "Failed to initialize JWT key. Check your JWT_SECRET environment variable.";
            logger.error(errorMessage, e);
            throw new IllegalStateException(errorMessage, e);
        }
    }

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUserEmailFromJWT(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String authToken) {
        if (!StringUtils.hasText(authToken)) {
            return false;
        }
        
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (Exception ex) {
            logger.error("JWT token validation error: {}", ex.getMessage());
            return false;
        }
    }
}
