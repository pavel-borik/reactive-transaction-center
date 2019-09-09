try {
    db.bankAccounts.deleteOne({"_id" : "5d6ebe65c845804efec7df02"});
    db.bankAccounts.deleteOne({"_id" : "5d6ebe6832014484abc79249"});
    db.bankAccounts.deleteOne({"_id" : "5d6ebe6a1f62f730cba8a176"});
    db.bankAccounts.deleteOne({"_id" : "5d6ebe6d358632ab90fdaf11"});
    db.bankAccounts.insertMany([{
        "_id": "5d6ebe65c845804efec7df02",
        "user": "John Doe",
        "accountName": "My account 1",
        "prefix": "45",
        "accountNumber": "717717717",
        "bankCode": "0800",
        "color": "RED"
    }, {
        "_id": "5d6ebe6832014484abc79249",
        "user": "Jack Shaw",
        "accountName": "My account 2",
        "prefix": "",
        "accountNumber": "873113211",
        "bankCode": "2010",
        "color": "GREEN"
    }, {
        "_id": "5d6ebe6a1f62f730cba8a176",
        "user": "John Doe",
        "accountName": "My account 3",
        "prefix": "45",
        "accountNumber": "512345678",
        "bankCode": "6210",
        "color": "BLUE"
    }, {
        "_id": "5d6ebe6d358632ab90fdaf11",
        "user": "John Doe",
        "accountName": "My account 4",
        "prefix": "",
        "accountNumber": "791919191",
        "bankCode": "2700",
        "color": "YELLOW"
    }], {ordered: false})
} catch (e) {
}
