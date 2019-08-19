package com.pb.tctransactions.dto;

import com.pb.tctransactions.model.enums.TransactionDirection;
import com.pb.tctransactions.model.enums.TransactionType;
import com.pb.tctransactions.model.transactions.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto {

    private String id;
    private long accountId;
    private int categoryId;
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
