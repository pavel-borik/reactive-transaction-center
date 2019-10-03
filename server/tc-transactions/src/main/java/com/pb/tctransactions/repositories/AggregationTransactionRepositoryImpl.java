package com.pb.tctransactions.repositories;

import com.pb.tctransactions.model.aggregation.CategoryAggregationModel;
import com.pb.tctransactions.model.enums.TransactionDirection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.math.BigDecimal;

@AllArgsConstructor
@Repository
public class AggregationTransactionRepositoryImpl implements AggregationTransactionRepository {

    private ReactiveMongoTemplate reactiveMongoTemplate;

    @Override
    public Flux<CategoryAggregationModel> groupByCategoryAndSum(TransactionDirection transactionDirection) {
//        db.getCollection('transactions')
//          .aggregate( [
//            { $project: {transactionCategoryInfo: {$objectToArray:"$transactionCategoryInfo"}} },
//            { $unwind: "$transactionCategoryInfo" },
//            { $group: { _id: "$transactionCategoryInfo.k", total: { $sum: {$toDouble:"$transactionCategoryInfo.v" }}}}
//          ] )
        MatchOperation match = Aggregation.match(Criteria.where("direction").is(transactionDirection.getDirection()));
        ProjectionOperation project = Aggregation.project().andExpression("{$objectToArray:\"$transactionCategoryInfo\"}").as("transactionCategoryInfo");
        UnwindOperation unwind = Aggregation.unwind("transactionCategoryInfo");
        GroupOperation groupBy = Aggregation.group("$transactionCategoryInfo.k").sum(ConvertOperators.valueOf("$transactionCategoryInfo.v").convertToDecimal()).as("total");
        Aggregation aggregation = Aggregation.newAggregation(match, project, unwind, groupBy);
        return reactiveMongoTemplate.aggregate(aggregation, "transactions", CategoryAggregationModel.class);
    }

    @Data
    @NoArgsConstructor
    private class Res {
        String id;
        BigDecimal total;
    }
}
