package com.pb.tctransactions.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransactionBalanceInfoDto {

    long count;
    BigDecimal balance;
}
