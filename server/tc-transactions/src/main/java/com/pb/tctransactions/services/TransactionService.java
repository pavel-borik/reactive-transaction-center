package com.pb.tctransactions.services;

import com.pb.tctransactions.configuration.ModelMapperConfiguration;
import com.pb.tctransactions.dto.TransactionDto;
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
    private final ModelMapperConfiguration modelMapperConfiguration;

    public Flux<TransactionDto> findAll() {
//        Rule r = new Rule();
//        PartyNameCondition ruleCondition = new PartyNameCondition(ConditionType.PARTY_NAME, 1, "bla");
//        System.out.println(ruleCondition.test("bla"));
//        r.getConditions().add(ruleCondition);

        return this.transactionRepository.findAll()
                .map(transaction -> modelMapperConfiguration
                        .getModelMapper()
                        .map(transaction, TransactionDto.class));
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
