package com.pb.tcusersaccounts.repositories;

import com.pb.tcusersaccounts.model.BankAccount;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface BankAccountRepository extends ReactiveMongoRepository<BankAccount, String> {
}
