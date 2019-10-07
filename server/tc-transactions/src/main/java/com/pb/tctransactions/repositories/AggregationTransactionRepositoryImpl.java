package com.pb.tctransactions.repositories;

import com.pb.tctransactions.model.aggregation.CategoryAggregationModel;
import com.pb.tctransactions.model.enums.TransactionDirection;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

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
        SortOperation sort = Aggregation.sort(Sort.Direction.DESC, "total");
        Aggregation aggregation = Aggregation.newAggregation(match, project, unwind, groupBy, sort);
        return reactiveMongoTemplate.aggregate(aggregation, "transactions", CategoryAggregationModel.class);
    }

    @Override
    public Flux<CategoryAggregationModel> groupByDirectionTotalSum(TransactionDirection transactionDirection) {
        MatchOperation match = Aggregation.match(Criteria.where("direction").is(transactionDirection.getDirection()));
        GroupOperation groupBy = Aggregation.group("$direction").sum(ConvertOperators.valueOf("$value.amount").convertToDecimal()).as("total");
        Aggregation aggregation = Aggregation.newAggregation(match, groupBy);
        return reactiveMongoTemplate.aggregate(aggregation, "transactions", CategoryAggregationModel.class);
    }

}
