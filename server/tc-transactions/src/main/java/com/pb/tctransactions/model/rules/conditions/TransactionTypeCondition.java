package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;

public class TransactionTypeCondition extends AbstractRuleCondition<String> {

    public TransactionTypeCondition(String value, double weight) {
        super(value, weight);
    }

    @Override
    public boolean test(Transaction t) {
        return value.equals(t.getTransactionType().getType());
    }
}
