package com.pb.tctransactions.repositories;

import com.pb.tctransactions.model.aggregation.CategoryAggregationModel;
import com.pb.tctransactions.model.enums.TransactionDirection;
import reactor.core.publisher.Flux;

public interface AggregationTransactionRepository {
    Flux<CategoryAggregationModel> groupByCategoryAndSum(TransactionDirection transactionDirection, String timePeriod);
    Flux<CategoryAggregationModel> groupByDirectionTotalSum(TransactionDirection transactionDirection, String timePeriod);
}
