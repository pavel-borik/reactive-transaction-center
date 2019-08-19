package com.pb.tctransactions.handlers;

import com.pb.tctransactions.dto.RuleDto;
import com.pb.tctransactions.model.transactions.Transaction;
import com.pb.tctransactions.services.RuleService;
import lombok.AllArgsConstructor;
import org.reactivestreams.Publisher;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyExtractor;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;

@Component
@AllArgsConstructor
public class RuleHandler {
    private RuleService ruleService;

    public Mono<ServerResponse> findAll(ServerRequest r) {
        return defaultReadResponse(this.ruleService.findAll());
    }

    public Mono<ServerResponse> findById(ServerRequest r) {
        return defaultReadResponse(this.ruleService.findById(r.pathVariable("id")));
    }

    public Mono<ServerResponse> create(ServerRequest r) {
        Flux<RuleDto> flux = r.bodyToFlux(RuleDto.class)
                .flatMap(this.ruleService::create);
        return defaultWriteResponse(flux);
    }

    private Mono<ServerResponse> defaultWriteResponse(Publisher<RuleDto> rules) {
        return Mono
                .from(rules)
                .flatMap(p -> ServerResponse
                        .created(URI.create("/rules/" + p.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .build()
                );
    }
    private Mono<ServerResponse> defaultReadResponse(Publisher<RuleDto> rules) {
        return ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(rules, RuleDto.class);
    }
}
