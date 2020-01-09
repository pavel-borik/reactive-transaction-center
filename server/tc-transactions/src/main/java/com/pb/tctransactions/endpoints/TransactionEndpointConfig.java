package com.pb.tctransactions.endpoints;

import com.pb.tctransactions.handlers.TransactionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class TransactionEndpointConfig {

    @Bean
    RouterFunction<ServerResponse> transactionRoutes(TransactionHandler transactionHandler) {
        return RouterFunctions
                .nest(path("/transactions"),
                        route(PUT("/categoryInfo"), transactionHandler::updateCategoryInfo)
                                .andRoute(GET("/statistics"), transactionHandler::computeStatistics)
                                .andRoute(GET("/info"), transactionHandler::resolveInfo)
                                .andRoute(GET("/{id}"), transactionHandler::findById)
                                .andRoute(GET("/"), transactionHandler::findAll)
                                .andRoute(POST("/"), transactionHandler::create));
    }
}
