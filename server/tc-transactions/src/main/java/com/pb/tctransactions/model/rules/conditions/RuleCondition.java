package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;

public interface RuleCondition {
    boolean test(Transaction t);
    double getWeight();
}
