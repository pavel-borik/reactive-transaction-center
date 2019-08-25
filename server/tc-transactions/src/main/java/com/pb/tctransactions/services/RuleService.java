package com.pb.tctransactions.services;

import com.pb.tctransactions.configuration.ModelMapperConfiguration;
import com.pb.tctransactions.dto.RuleDto;
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
import java.util.Date;
import java.util.List;

@Log4j2
@Service
@AllArgsConstructor
public class RuleService {
    private final RuleRepository ruleRepository;
    private final ModelMapperConfiguration modelMapperConfiguration;

    public Flux<RuleDto> findAll() {
        return this.ruleRepository.findAll()
                .map(rule -> modelMapperConfiguration
                        .getModelMapper()
                        .map(rule, RuleDto.class));
    }

    public Mono<RuleDto> findById(String id) {
        Mono<Rule> rule = this.ruleRepository.findById(id);
        return rule.map(r -> modelMapperConfiguration.getModelMapper().map(r, RuleDto.class));
    }

    public Mono<RuleDto> update(String id, RuleDto ruleDto) {
        Rule newRule = modelMapperConfiguration.getModelMapper().map(ruleDto, Rule.class);
        newRule.setLastEditTimestamp(new Date());
        newRule.setId(id);
        Mono<Rule> save = this.ruleRepository.save(newRule);
        return save.map(rule -> modelMapperConfiguration.getModelMapper().map(rule, RuleDto.class));
    }

    public Mono<RuleDto> create(RuleDto ruleDto) {
        Rule newRule = modelMapperConfiguration.getModelMapper().map(ruleDto, Rule.class);
        newRule.setLastEditTimestamp(new Date());
        Mono<Rule> save = this.ruleRepository.save(newRule);
        return save.map(rule -> modelMapperConfiguration.getModelMapper().map(rule, RuleDto.class));
    }

    public Flux<Rule> delete(RulesToDeleteDto rulesToDeleteDto) {
        List<String> ids = rulesToDeleteDto.getIds();
        return this.ruleRepository.deleteByIdIn(rulesToDeleteDto.getIds());
    }

    private List<RuleCondition> createConditions(RuleDto ruleDto) {
        List<RuleCondition> conditions = new ArrayList<>();
        conditions.add(new CategoryCondition(ruleDto.getCategoryId(), 0.5));
        if (StringUtils.isNotBlank(ruleDto.getDirection())) {
            conditions.add(new DirectionCondition(ruleDto.getDirection(), 0.5));
        }
        if (StringUtils.isNotBlank(ruleDto.getTransactionType())) {
            conditions.add(new TransactionTypeCondition(ruleDto.getTransactionType(), 0.5));
        }
        if (StringUtils.isNotBlank(ruleDto.getPartyName())) {
            conditions.add(new PartyNameCondition(ruleDto.getPartyName(), 0.5));
        }
        if (StringUtils.isNotBlank(ruleDto.getPartyBankCode())) {
            conditions.add(new PartyAccountCondition(
                    new TransactionPartyAccount(
                            ruleDto.getPartyAccountPrefix(),
                            ruleDto.getPartyAccountNumber(),
                            ruleDto.getPartyBankCode()),
                    0.5));
        }
        if (StringUtils.isNotBlank(ruleDto.getConstantSymbol())) {
            conditions.add(new ConstantSymbolCondition(ruleDto.getConstantSymbol(), 0.5));
        }
        if (StringUtils.isNotBlank(ruleDto.getVariableSymbol())) {
            conditions.add(new VariableSymbolCondition(ruleDto.getConstantSymbol(), 0.5));
        }
        if (StringUtils.isNotBlank(ruleDto.getSpecificSymbol())) {
            conditions.add(new SpecificSymbolCondition(ruleDto.getConstantSymbol(), 0.5));
        }
        if (StringUtils.isNotBlank(ruleDto.getPayerMessage())) {
            conditions.add(new PayerMessageCondition(ruleDto.getPayerMessage(), 0.5));
        }

        return conditions;
    }
}
