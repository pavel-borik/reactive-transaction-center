package com.pb.tctransactions.model.transactions;

import com.pb.tctransactions.model.enums.TransactionCategory;
import com.pb.tctransactions.model.enums.TransactionDirection;
import com.pb.tctransactions.model.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.util.Map;

@Document(collection = "transactions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    @Id
    private String id;
    private long accountId;
    private int categoryId;
    private Map<TransactionCategory, BigDecimal> transactionCategoryInfo;
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
