package com.pb.tctransactions.services;

import com.pb.tctransactions.dto.RulesToDeleteDto;
import com.pb.tctransactions.model.rules.Rule;
import com.pb.tctransactions.model.rules.conditions.*;
import com.pb.tctransactions.model.transactions.TransactionPartyAccount;
import com.pb.tctransactions.repositories.RuleRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
@AllArgsConstructor
public class RuleService {
    private final RuleRepository ruleRepository;

    public Flux<Rule> findAll() {
        return this.ruleRepository.findAll();
    }

    public Mono<Rule> findById(String id) {
        return this.ruleRepository.findById(id);
    }

    public Mono<Rule> update(String id, Rule rule) {
        rule.setId(id);
        return this.ruleRepository.save(rule);
    }

    public Mono<Rule> create(Rule rule) {
        return this.ruleRepository.save(rule);
    }

    public Flux<Rule> delete(RulesToDeleteDto rulesToDeleteDto) {
        List<String> ids = rulesToDeleteDto.getIds();
        return this.ruleRepository.deleteByIdIn(rulesToDeleteDto.getIds());
    }

    private List<RuleCondition> createConditions(Rule rule) {
        List<RuleCondition> conditions = new ArrayList<>();
        conditions.add(new CategoryCondition(rule.getCategoryCode(), 0.5));
        if (StringUtils.isNotBlank(rule.getDirection())) {
            conditions.add(new DirectionCondition(rule.getDirection(), 0.5));
        }
        if (StringUtils.isNotBlank(rule.getTransactionType())) {
            conditions.add(new TransactionTypeCondition(rule.getTransactionType(), 0.5));
        }
        if (StringUtils.isNotBlank(rule.getPartyName())) {
            conditions.add(new PartyNameCondition(rule.getPartyName(), 0.5));
        }
        if (StringUtils.isNotBlank(rule.getPartyBankCode())) {
            conditions.add(new PartyAccountCondition(
                    new TransactionPartyAccount(
                            rule.getPartyAccountPrefix(),
                            rule.getPartyAccountNumber(),
                            rule.getPartyBankCode()),
                    0.5));
        }
        if (StringUtils.isNotBlank(rule.getConstantSymbol())) {
            conditions.add(new ConstantSymbolCondition(rule.getConstantSymbol(), 0.5));
        }
        if (StringUtils.isNotBlank(rule.getVariableSymbol())) {
            conditions.add(new VariableSymbolCondition(rule.getConstantSymbol(), 0.5));
        }
        if (StringUtils.isNotBlank(rule.getSpecificSymbol())) {
            conditions.add(new SpecificSymbolCondition(rule.getConstantSymbol(), 0.5));
        }
        if (StringUtils.isNotBlank(rule.getPayerMessage())) {
            conditions.add(new PayerMessageCondition(rule.getPayerMessage(), 0.5));
        }

        return conditions;
    }
}
