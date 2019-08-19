package com.pb.tctransactions.model.enums;

public enum TransactionDirection {
    INCOMING("INCOMING"), OUTGOING("OUTGOING"), BOTH("BOTH");

    TransactionDirection(String direction) {
        this.direction = direction;
    }

    private String direction;

    public String getDirection() {
        return direction;
    }
}
