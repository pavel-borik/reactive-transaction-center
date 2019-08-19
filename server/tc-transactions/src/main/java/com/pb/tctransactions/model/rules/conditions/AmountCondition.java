package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;
import lombok.AllArgsConstructor;
import lombok.Value;

import java.math.BigDecimal;

@AllArgsConstructor
@Value
public class AmountCondition implements RuleCondition {
    private BigDecimal valueFrom;
    private BigDecimal valueTo;
    private double weight;

    @Override
    public boolean test(Transaction t) {
        BigDecimal value = t.getValue().getAmount();
        return (value.compareTo(valueFrom) >= 0 && value.compareTo(valueTo) <= 0);
    }
}
