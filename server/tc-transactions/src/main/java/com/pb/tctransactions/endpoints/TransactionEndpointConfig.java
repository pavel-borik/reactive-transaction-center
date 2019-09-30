package com.pb.tctransactions.endpoints;

import com.pb.tctransactions.handlers.TransactionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;

@Configuration
public class TransactionEndpointConfig {

    @Bean
    RouterFunction<ServerResponse> transactionRoutes(TransactionHandler transactionHandler) {
        return RouterFunctions
                .route(GET("/transactions"), transactionHandler::findAll)
                .andRoute(GET("/transactions/{id}"), transactionHandler::findById)
                .andRoute(PUT("/transactions/categoryInfo"), transactionHandler::updateCategoryInfo)
                .andRoute(GET("/transactionsinfo"), transactionHandler::resolveInfo)
                .andRoute(POST("/transactions"), transactionHandler::create);
    }
}
