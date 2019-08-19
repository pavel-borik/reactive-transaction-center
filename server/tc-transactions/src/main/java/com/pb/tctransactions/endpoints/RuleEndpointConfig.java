package com.pb.tctransactions.endpoints;

import com.pb.tctransactions.handlers.RuleHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;

@Configuration
public class RuleEndpointConfig {
    @Bean
    RouterFunction<ServerResponse> ruleRoutes(RuleHandler ruleHandler) {
        return RouterFunctions
                .route(GET("/rules").and(accept(APPLICATION_JSON)), ruleHandler::findAll)
                .andRoute(GET("/rules/{id}").and(accept(APPLICATION_JSON)), ruleHandler::findById)
                .andRoute(POST("/rules").and(contentType(APPLICATION_JSON)), ruleHandler::create);
    }
}
