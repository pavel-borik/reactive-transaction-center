package com.pb.tctransactions.services;

import com.pb.tctransactions.model.transactions.Transaction;
import com.pb.tctransactions.repositories.TransactionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Log4j2
@Service
@AllArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public Flux<Transaction> findAll() {
        return this.transactionRepository.findAll();
    }

    public Mono<Transaction> findById(String id) {
        return this.transactionRepository.findById(id);
    }

    public Mono<Transaction> update(String id, Transaction t) {
        return this.transactionRepository.save(t);
    }

    public Mono<Transaction> create(Transaction t) {
        return this.transactionRepository.save(t);
    }
}
