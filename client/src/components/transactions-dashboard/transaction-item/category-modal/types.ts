export interface ITransactionCategory {
  id: string;
  text: string;
}

export type TransactionCategorySplitInfo = Record<string, number>;

export type CategoryModalFormProps = {
  transactionCategoryInfo: TransactionCategorySplitInfo;
  transactionCategories: {
    [key: string]: ITransactionCategory;
  };
};
