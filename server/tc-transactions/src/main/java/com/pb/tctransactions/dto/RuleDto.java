package com.pb.tctransactions.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class RuleDto {

    // RULESET PROPERTIES
    private String id;
    private String ruleName;
    private int categoryId;

    // COMMON
    private String partyName;
    private String direction;
    private String transactionType;
    private BigDecimal valueFrom;
    private BigDecimal valueTo;

    // BANK TRANSFER
    private String partyAccountPrefix;
    private String partyAccountNumber;
    private String partyBankCode;
    private String payerMessage;
    private String payeeMessage;
    private String constantSymbol;
    private String variableSymbol;
    private String specificSymbol;

    // CARDS
    private String bookingTimeFrom;
    private String bookingTimeTo;
    private String cardNumber;
}
