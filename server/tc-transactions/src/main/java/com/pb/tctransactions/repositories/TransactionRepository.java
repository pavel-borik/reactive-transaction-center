package com.pb.tctransactions.repositories;

import com.pb.tctransactions.model.transactions.Transaction;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TransactionRepository extends ReactiveCrudRepository<Transaction, String> {

}
