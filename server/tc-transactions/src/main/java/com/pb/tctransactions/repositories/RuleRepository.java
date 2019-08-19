package com.pb.tctransactions.repositories;

import com.pb.tctransactions.model.rules.Rule;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface RuleRepository extends ReactiveCrudRepository<Rule, String> {
}
