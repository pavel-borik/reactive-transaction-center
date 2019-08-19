package com.pb.tctransactions.model.transactions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionPartyAccount {

    private String prefix;
    private String accountNumber;
    private String bankCode;


}
