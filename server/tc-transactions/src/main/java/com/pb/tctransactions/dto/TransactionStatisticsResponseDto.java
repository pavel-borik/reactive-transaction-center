package com.pb.tctransactions.dto;

import com.pb.tctransactions.model.aggregation.CategoryAggregationModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class TransactionStatisticsResponseDto {
    BigDecimal total;
    List<CategoryAggregationModel> aggregation;
}
