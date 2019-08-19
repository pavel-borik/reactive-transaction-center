package com.pb.tctransactions.model.enums;

public enum TransactionType {
    PAYMENT_HOME("PAYMENT_HOME"),
    PAYMENT_ABROAD("PAYMENT_ABROAD"),
    PAYMENT_PERSONAL("PAYMENT_PERSONAL"),
    PAYMENT_ACCOUNT("PAYMENT_ACCOUNT"),
    STANDING_ORDER("STANDING_ORDER"),
    SAVING("SAVING"),
    DIRECT_DEBIT("DIRECT_DEBIT"),
    DIRECT_DEBIT_SIPO("DIRECT_DEBIT_SIPO"),
    CARD("CARD"),
    CASH("CASH"),
    FEE("FEE"),
    TAX("TAX"),
    INTEREST("INTEREST"),
    INSURANCE("INSURANCE"),
    LOAN("LOAN"),
    MORTGAGE("MORTGAGE");

    TransactionType(String type) {
        this.type = type;
    }

    private String type;

    public String getType() {
        return type;
    }
}
