try {
    db.transactions.insertMany([
        {
            "_id": "5d6eba7daffb0f4248516477",
            "accountId": 1234,
            "value": {"amount": 4357, "currency": "CZK"},
            "partyAccount": {"prefix": "", "accountNumber": "", "bankCode": ""},
            "partyDescription": "ABC",
            "direction": "OUTGOING",
            "transactionType": "CARD",
            "valueDate": "2018-03-12 07:29:57",
            "bookingDate": "2018-03-11 22:08:21",
            "userDescription": "sed",
            "payerMessage": "",
            "payeeMessage": "",
            "categoryId": 0,
            "transactionFee": 0,
            "transactionFeeCanceled": "true",
            "additionalInfoDomestic": {"constantSymbol": "", "variableSymbol": "", "specificSymbol": ""},
            "additionalInfoCard": {"mcc": "3560", "merchantName": "Fivebridge", "cardNumber": "3542658921352648"}
        },
        {
            "_id": "5d6ebdb9341e35b5b657ec20",
            "accountId": 1234,
            "value": {"amount": 2448, "currency": "CZK"},
            "partyAccount": {"prefix": "00000865", "accountNumber": "307421973845", "bankCode": "0600"},
            "partyDescription": "Shufflester",
            "direction": "INCOMING",
            "transactionType": "TAX",
            "valueDate": "2018-10-07 17:45:44",
            "bookingDate": "2018-10-06 19:55:20",
            "userDescription": "fusce consequat nulla",
            "payerMessage": "0",
            "payeeMessage": "0",
            "categoryId": 0,
            "transactionFee": 0,
            "transactionFeeCanceled": "true",
            "additionalInfoDomestic": {"constantSymbol": "0", "variableSymbol": "1568973045", "specificSymbol": "0"},
            "additionalInfoCard": {"mcc": "", "merchantName": "", "cardNumber": ""}
        },
        {
            "_id": "5d6ebdc8baa43c146d9ebfe8",
            "accountId": 1234,
            "value": {"amount": 5313, "currency": "CZK"},
            "partyAccount": {"prefix": "00000000", "accountNumber": "770418267290", "bankCode": "3030"},
            "partyDescription": "Tesco",
            "direction": "OUTGOING",
            "transactionType": "PAYMENT_HOME",
            "valueDate": "2018-12-31 12:26:57",
            "bookingDate": "2018-12-31 00:26:57",
            "userDescription": "",
            "payerMessage": "aenean",
            "payeeMessage": "0",
            "categoryId": 0,
            "transactionFee": 0,
            "transactionFeeCanceled": "true",
            "additionalInfoDomestic": {"constantSymbol": "0", "variableSymbol": "7933497310", "specificSymbol": "0"},
            "additionalInfoCard": {"mcc": "", "merchantName": "", "cardNumber": ""}
        }
    ], {ordered: false});
} catch (e) {
}
