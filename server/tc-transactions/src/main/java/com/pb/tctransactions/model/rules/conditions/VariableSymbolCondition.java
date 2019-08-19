package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;

public class VariableSymbolCondition extends AbstractRuleCondition<String> {

    public VariableSymbolCondition(String value, double weight) {
        super(value, weight);
    }

    @Override
    public boolean test(Transaction t) {
        return value.equals(t.getAdditionalInfoDomestic().getConstantSymbol());
    }
}
