package com.pb.tctransactions.model.aggregation;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class CategoryAggregationModel {
    String id;
    BigDecimal total;
}
