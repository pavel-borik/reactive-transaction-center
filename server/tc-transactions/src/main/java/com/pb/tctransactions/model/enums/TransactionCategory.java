package com.pb.tctransactions.model.enums;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

public enum TransactionCategory {
    FOOD("111"),
    ALCOHOL("112"),
    APPAREL_AND_FASHION("113"),
    HOME_EQUIPMENT("114"),
    FUEL("115"),
    UTILITIES("116"),
    TOBACCO_AND_PRESS("117"),
    PHONE_TV_INTERNET_ETC("118"),
    FARE("119"),
    RENT("120"),
    REAL_ESTATE("121"),
    SPORT_AND_LEISURE("122"),
    HEALTH_AND_BEAUTY("123"),
    ENTERTAINMENT("124"),
    TRAVELLING_AND_ACCOMMODATION("125"),
    ELECTRONICS("126"),
    GAMBLING("127"),
    LOANS_AND_MORTGAGES("128"),
    INSURANCE("129"),
    GIFTS("130"),
    OTHER("131"),

    I_SALARY_OR_WAGE("11"),
    I_PENSION("12"),
    I_SOCIAL_ASSISTANCE("13"),
    I_BUSINESS("14"),
    I_GAMBLING("15"),
    I_RENT("16"),
    I_LOANS("17"),
    I_POCKET_MONEY("18"),
    I_GIFTS("19"),
    I_OTHER("20"),

    UNCATEGORIZED("0");

    private final String code;
    private volatile Map<String, TransactionCategory> BY_CODE = null;

    TransactionCategory(final String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public TransactionCategory getTransactionCategoryByCode(String code) {
        if (BY_CODE == null) {
            synchronized (this) {
                if (BY_CODE == null) {
                    BY_CODE = new HashMap<>();
                    Stream.of(values()).forEach(transactionCategory -> BY_CODE.put(transactionCategory.code, transactionCategory));
                }
            }
        }

        return BY_CODE.get(code);
    }
}
