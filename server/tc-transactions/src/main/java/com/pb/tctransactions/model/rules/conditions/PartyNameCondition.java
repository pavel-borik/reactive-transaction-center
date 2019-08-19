package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;

public class PartyNameCondition extends AbstractRuleCondition<String> {

    public PartyNameCondition(String value, double weight) {
        super(value, weight);
    }

    @Override
    public boolean test(Transaction t) {
        String s = t.getPartyDescription();
        if (s == null || value == null) return false;
        return value.contains(s);
    }
}
