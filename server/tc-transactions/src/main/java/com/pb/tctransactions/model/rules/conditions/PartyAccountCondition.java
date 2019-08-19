package com.pb.tctransactions.model.rules.conditions;

import com.pb.tctransactions.model.transactions.Transaction;
import com.pb.tctransactions.model.transactions.TransactionPartyAccount;

public class PartyAccountCondition extends AbstractRuleCondition<TransactionPartyAccount> {

    public PartyAccountCondition(TransactionPartyAccount value, double weight) {
        super(value, weight);
    }

    @Override
    public boolean test(Transaction t) {
        String s1 = value.getPrefix() + value.getAccountNumber() + value.getBankCode();
        String s2 = t.getPartyAccount().getPrefix() + t.getPartyAccount().getAccountNumber() + t.getPartyAccount().getBankCode();
        return s1.equals(s2);
    }
}
