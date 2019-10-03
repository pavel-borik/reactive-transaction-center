package com.pb.tctransactions.repositories;

import com.pb.tctransactions.model.transactions.Transaction;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface TransactionRepository extends ReactiveMongoRepository<Transaction, String>, AggregationTransactionRepository {
    Flux<Transaction> findByAccountId(String accountId);
}
