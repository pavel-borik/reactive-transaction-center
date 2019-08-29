package com.pb.tctransactions.repositories;

import com.pb.tctransactions.model.transactions.Transaction;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TransactionRepository extends ReactiveMongoRepository<Transaction, String> {

}
