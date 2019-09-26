try {
    db.transactions.deleteOne({"_id": "5d6eba7daffb0f4248516477"});
    db.transactions.deleteOne({"_id": "5d6ebdb9341e35b5b657ec20"});
    db.transactions.deleteOne({"_id": "5d6ebdc8baa43c146d9ebfe8"});
    db.transactions.insertMany([
        {
            "_id": "5d6eba7daffb0f4248516477",
            "accountId": "5d6ebe65c845804efec7df02",
            "value": {"amount": 4357, "currency": "CZK"},
            "partyAccount": {"prefix": "", "accountNumber": "", "bankCode": ""},
            "partyDescription": "ABC",
            "direction": "OUTGOING",
            "transactionType": "CARD",
            "valueDate": "2018-03-12 07:29:57",
            "bookingDate": "2018-03-11 22:08:21",
            "userDescription": "sed",
            "payerMessage": "Some msg",
            "payeeMessage": "",
            "categoryId": "113",
            "transactionCategoryInfo": {
                "111": 1000,
                "112": 2000,
                "113": 1357
            },
            "transactionFee": 0,
            "transactionFeeCanceled": "true",
            "additionalInfoDomestic": {"constantSymbol": "", "variableSymbol": "", "specificSymbol": ""},
            "additionalInfoCard": {"mcc": "3560", "merchantName": "Fivebridge", "cardNumber": "3542658921352648"}
        },
        {
            "_id": "5d6ebdb9341e35b5b657ec20",
            "accountId": "5d6ebe65c845804efec7df02",
            "value": {"amount": 15000, "currency": "CZK"},
            "partyAccount": {"prefix": "00000865", "accountNumber": "307421973845", "bankCode": "0600"},
            "partyDescription": "Shufflester",
            "direction": "INCOMING",
            "transactionType": "TAX",
            "valueDate": "2018-10-07 17:45:44",
            "bookingDate": "2018-10-06 19:55:20",
            "userDescription": "fusce consequat nulla",
            "payerMessage": "Some msg",
            "payeeMessage": "",
            "categoryId": "11",
            "transactionCategoryInfo": {
               "11": 15000,
            },
            "transactionFee": 0,
            "transactionFeeCanceled": "true",
            "additionalInfoDomestic": {"constantSymbol": "0", "variableSymbol": "1568973045", "specificSymbol": "0"},
            "additionalInfoCard": {"mcc": "", "merchantName": "", "cardNumber": ""}
        },
        {
            "_id": "5d6ebdc8baa43c146d9ebfe8",
            "accountId": "5d6ebe6832014484abc79249",
            "value": {"amount": 5313, "currency": "CZK"},
            "partyAccount": {"prefix": "00000000", "accountNumber": "770418267290", "bankCode": "3030"},
            "partyDescription": "Tesco",
            "direction": "OUTGOING",
            "transactionType": "PAYMENT_HOME",
            "valueDate": "2018-12-31 12:26:57",
            "bookingDate": "2018-12-31 00:26:57",
            "userDescription": "",
            "payerMessage": "Some msg",
            "payeeMessage": "",
            "categoryId": "112",
            "transactionCategoryInfo": {
               "112": 5313,
            },
            "transactionFee": 0,
            "transactionFeeCanceled": "true",
            "additionalInfoDomestic": {"constantSymbol": "0", "variableSymbol": "7933497310", "specificSymbol": "0"},
            "additionalInfoCard": {"mcc": "", "merchantName": "", "cardNumber": ""}
        }
    ], {ordered: false});
} catch (e) {
}
