package com.pb.tctransactions.services;

import com.pb.tctransactions.dto.TransactionBalanceInfoDto;
import com.pb.tctransactions.dto.TransactionCategoryInfoUpdateDto;
import com.pb.tctransactions.model.enums.TransactionDirection;
import com.pb.tctransactions.model.transactions.Transaction;
import com.pb.tctransactions.repositories.TransactionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@AllArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public Flux<Transaction> findAll() {
        return this.transactionRepository.findAll();
    }

    public Flux<Transaction> findByAccount(String accountId) {
        return this.transactionRepository.findByAccountId(accountId);
    }

    public Mono<TransactionBalanceInfoDto> resolveBalanceInfoByAccount(String accountId) {
        Mono<List<Transaction>> listMono = transactionRepository.findByAccountId(accountId).collectList();
        TransactionBalanceInfoDto transactionBalanceInfoDto = new TransactionBalanceInfoDto();

        return listMono.flatMap(transactions -> {
            if (transactions.size() == 0) {
                transactionBalanceInfoDto.setBalance(BigDecimal.ZERO);
                transactionBalanceInfoDto.setCount(0);
                return Mono.just(transactionBalanceInfoDto);
            }
            transactionBalanceInfoDto.setCount(transactions.size());

            Optional<BigDecimal> reduce = transactions.stream().map(transaction -> {
                if (transaction.getDirection() == TransactionDirection.INCOMING) {
                    return transaction.getValue().getAmount();
                } else {
                    return transaction.getValue().getAmount().negate();
                }
            }).reduce(BigDecimal::add);

            reduce.ifPresent(transactionBalanceInfoDto::setBalance);

            return Mono.just(transactionBalanceInfoDto);
        });
    }

    public Mono<Transaction> findById(String id) {
        return this.transactionRepository.findById(id);
    }

    public Mono<Transaction> updateCategoryInfo(TransactionCategoryInfoUpdateDto dto) {
        return transactionRepository
                .findById(dto.getId())
                .flatMap(transaction -> {
                    transaction.setTransactionCategoryInfo(dto.getTransactionCategoryInfo());
                    return transactionRepository.save(transaction);
                });
    }

    public Mono<Transaction> create(Transaction t) {
        return this.transactionRepository.save(t);
    }
}
