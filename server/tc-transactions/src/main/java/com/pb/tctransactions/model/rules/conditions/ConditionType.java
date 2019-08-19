package com.pb.tctransactions.model.rules.conditions;

public enum ConditionType {
    PARTY_NAME("PARTY_NAME"),
    MESSAGE("MESSAGE");

    private final String identifier;

    ConditionType(String s) {
        this.identifier = s;
    }

    public String getIdentifier() {
        return identifier;
    }
}
