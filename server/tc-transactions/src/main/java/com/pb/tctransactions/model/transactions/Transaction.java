package com.pb.tctransactions.model.transactions;

import com.pb.tctransactions.model.enums.TransactionDirection;
import com.pb.tctransactions.model.enums.TransactionType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.math.BigDecimal;
import java.util.Map;

@Document(collection = "transactions")
@Data
@NoArgsConstructor
public class Transaction {

    @Id
    @MongoId
    private String id;
    private String accountId;
    private String categoryId;
    private Map<String, BigDecimal> transactionCategoryInfo;
    private TransactionDirection direction;
    private TransactionType transactionType;
    private TransactionValue value;
    private String valueDate;
    private String bookingDate;
    private TransactionPartyAccount partyAccount;
    private String partyDescription;
    private String userDescription;
    private String payerMessage;
    private String payeeMessage;
    private BigDecimal transactionFee;
    private Boolean transactionFeeCanceled;
    private TransactionAdditionalInfoDomestic additionalInfoDomestic;
    private TransactionAdditionalInfoForeign additionalInfoForeign;
    private TransactionAdditionalInfoCard additionalInfoCard;
}
