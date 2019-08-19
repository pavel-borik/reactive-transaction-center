package com.pb.tctransactions.model.transactions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionAdditionalInfoDomestic {

    private String constantSymbol;
    private String variableSymbol;
    private String specificSymbol;

}
