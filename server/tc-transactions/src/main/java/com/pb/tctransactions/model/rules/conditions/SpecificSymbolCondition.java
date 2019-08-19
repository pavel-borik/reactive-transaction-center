package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;

public class SpecificSymbolCondition extends AbstractRuleCondition<String> {

    public SpecificSymbolCondition(String value, double weight) {
        super(value, weight);
    }

    @Override
    public boolean test(Transaction t) {
        return value.equals(t.getAdditionalInfoDomestic().getConstantSymbol());
    }
}
