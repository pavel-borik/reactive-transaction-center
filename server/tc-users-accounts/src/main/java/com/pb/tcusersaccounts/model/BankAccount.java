package com.pb.tcusersaccounts.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}
