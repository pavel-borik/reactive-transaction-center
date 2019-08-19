package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;

public class CategoryCondition extends AbstractRuleCondition<Integer> {

    public CategoryCondition(Integer value, double weight) {
        super(value, weight);
    }

    @Override
    public boolean test(Transaction t) {
        return t.getCategoryId() == value;
    }
}
