package com.pb.tctransactions.handlers;

import com.pb.tctransactions.dto.TransactionBalanceInfoDto;
import com.pb.tctransactions.dto.TransactionCategoryInfoUpdateDto;
import com.pb.tctransactions.model.transactions.Transaction;
import com.pb.tctransactions.services.TransactionService;
import lombok.AllArgsConstructor;
import org.reactivestreams.Publisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Optional;

@Component
@AllArgsConstructor
public class TransactionHandler {

    private final TransactionService transactionService;

    public Mono<ServerResponse> findById(ServerRequest r) {
        //return defaultReadResponse(this.transactionService.findById(r.pathVariable("id")));
        return null;
    }

    public Mono<ServerResponse> findAll(ServerRequest r) {
        Optional<String> accountId = r.queryParam("accountId");
        if (accountId.isPresent()) {
            return defaultReadResponse(transactionService.findByAccount(accountId.get()));
        }

        return defaultReadResponse(this.transactionService.findAll());
    }

    public Mono<ServerResponse> create(ServerRequest r) {
        Flux<Transaction> flux = r.bodyToFlux(Transaction.class)
                .flatMap(this.transactionService::create);
        return defaultWriteResponse(flux);
    }

    public Mono<ServerResponse> updateCategoryInfo(ServerRequest r) {
        Mono<Transaction> mono = r.bodyToMono(TransactionCategoryInfoUpdateDto.class)
                .flatMap(transactionService::updateCategoryInfo);
        return Mono
                .from(mono)
                .flatMap(p -> ServerResponse
                        .accepted()
                        .contentType(MediaType.APPLICATION_JSON)
                        .build())
                .switchIfEmpty(ServerResponse
                        .status(HttpStatus.NOT_FOUND)
                        .build());
    }

    public Mono<ServerResponse> resolveInfo(ServerRequest r) {
        Optional<String> accountId = r.queryParam("accountId");
        if (accountId.isPresent()) {
            Mono<TransactionBalanceInfoDto> transactionBalanceInfoDtoMono = transactionService.resolveBalanceInfoByAccount(accountId.get());

            return transactionBalanceInfoDtoMono
                    .flatMap(transactionBalanceInfoDto -> ServerResponse
                            .ok()
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(Mono.just(transactionBalanceInfoDto), TransactionBalanceInfoDto.class))
                    .switchIfEmpty(ServerResponse
                            .status(HttpStatus.NOT_FOUND)
                            .build());
        }

        return ServerResponse
                .badRequest()
                .build();
    }

    private Mono<ServerResponse> defaultReadResponse(Publisher<Transaction> transactions) {
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(transactions, Transaction.class);
    }

    private Mono<ServerResponse> defaultWriteResponse(Publisher<Transaction> transactions) {
        return Mono
                .from(transactions)
                .flatMap(p -> ServerResponse
                        .created(URI.create("/transactions/" + p.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .build()
                );
    }
}
