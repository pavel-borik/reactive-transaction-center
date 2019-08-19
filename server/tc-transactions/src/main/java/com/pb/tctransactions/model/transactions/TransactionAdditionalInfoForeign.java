package com.pb.tctransactions.model.transactions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionAdditionalInfoForeign {

    private TransactionValue originalValue;
    private BigDecimal exchangeRate;

}
