package com.pb.tcusersaccounts.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document(collection = "bankAccounts")
@NoArgsConstructor
@Data
public class BankAccount {

    @Id
    String id;
    String user;
    String accountName;
    String prefix;
    String accountNumber;
    String bankCode;
    String color;
    BigDecimal accountBalance;
}
