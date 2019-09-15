package com.pb.tcusersaccounts.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransactionBalanceInfoDto {

    long count;
    BigDecimal balance;
}
