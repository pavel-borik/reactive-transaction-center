package com.pb.tctransactions.endpoints;

import com.pb.tctransactions.handlers.TransactionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;

@Configuration
public class TransactionEndpointConfig {

    @Bean
    RouterFunction<ServerResponse> transactionRoutes(TransactionHandler transactionHandler) {
        return RouterFunctions
                .route(GET("/transactions"), transactionHandler::findAll)
                .andRoute(GET("/transactions/{id}"), transactionHandler::findById)
                .andRoute(GET("/transactionsinfo"), transactionHandler::resolveInfo)
                .andRoute(POST("/transactions"), transactionHandler::create);
    }
}
