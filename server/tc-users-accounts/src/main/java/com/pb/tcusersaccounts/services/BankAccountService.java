package com.pb.tcusersaccounts.services;

import com.pb.tcusersaccounts.model.BankAccount;
import com.pb.tcusersaccounts.model.TransactionBalanceInfoDto;
import com.pb.tcusersaccounts.repositories.BankAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class BankAccountService implements ApplicationListener<WebServerInitializedEvent> {

    private final BankAccountRepository bankAccountRepository;
    private WebClient client;

    private ParameterizedTypeReference<TransactionBalanceInfoDto> productParameterizedTypeReference =
            new ParameterizedTypeReference<>() {};

    public Flux<BankAccount> findAll() {

        return bankAccountRepository.findAll().flatMap(bankAccount -> {
            Mono<TransactionBalanceInfoDto> balanceInfo = client.get().uri(uriBuilder -> uriBuilder.path("/transactions/info")
                    .queryParam("accountId", bankAccount.getId())
                    .build())
                    .accept(MediaType.APPLICATION_JSON)
                    .exchange()
                    .flatMap(clientResponse -> clientResponse.bodyToMono(productParameterizedTypeReference))
                    .doOnError(throwable -> System.out.println(throwable.getMessage()));

            return balanceInfo.flatMap(transactionBalanceInfoDto -> {
                    bankAccount.setAccountBalance(transactionBalanceInfoDto.getBalance());
                    return Mono.just(bankAccount);
                })
                .switchIfEmpty(Mono.just(bankAccount));
        });

    }

    @Override
    public void onApplicationEvent(WebServerInitializedEvent event) {
        this.client = WebClient.builder().baseUrl("http://localhost:8080").build();

    }
}
