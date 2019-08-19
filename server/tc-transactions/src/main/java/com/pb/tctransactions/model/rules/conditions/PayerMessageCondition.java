package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;

public class PayerMessageCondition extends AbstractRuleCondition<String> {

    public PayerMessageCondition(String value, double weight) {
        super(value, weight);
    }

    @Override
    public boolean test(Transaction t) {
        return t.getPayerMessage().contains(value);
    }
}
