package com.pb.tctransactions.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class TransactionCategoryInfoUpdateDto {
    private String id;
    private Map<String, BigDecimal> transactionCategoryInfo;
}
