package com.pb.tctransactions.model.rules;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@Document(collection = "rules")
public class Rule {

    // RULESET PROPERTIES
    @Id
    private String id;
    private String ruleName;
    private String categoryCode;

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

    //Special attributes
    private Date lastEditTimestamp;
}
