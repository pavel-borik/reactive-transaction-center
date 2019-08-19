package com.pb.tctransactions.model.rules.conditions;

abstract class AbstractRuleCondition<T> implements RuleCondition {
    T value;
    private double weight;

    AbstractRuleCondition(T value, double weight) {
        this.value = value;
        this.weight = weight;
    }

    public double getWeight() {
        return weight;
    }
}
