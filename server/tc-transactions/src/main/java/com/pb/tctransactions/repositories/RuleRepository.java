package com.pb.tctransactions.repositories;

import com.pb.tctransactions.model.rules.Rule;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

import java.util.List;

public interface RuleRepository extends ReactiveMongoRepository<Rule, String> {

    Flux<Rule> deleteByIdIn(List<String> ids);
}
