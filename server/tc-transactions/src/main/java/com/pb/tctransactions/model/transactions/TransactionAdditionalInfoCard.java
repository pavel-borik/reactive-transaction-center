package com.pb.tctransactions.model.transactions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionAdditionalInfoCard {

    private String mcc;
    private String merchantName;
    private String cardNumber;

}
