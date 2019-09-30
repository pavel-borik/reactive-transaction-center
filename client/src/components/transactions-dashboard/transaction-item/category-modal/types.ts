export interface ITransactionCategory {
  id: string;
  text: string;
}

export interface ITransactionValue {
  amount: number;
  currency: string;
}
export type TransactionCategorySplitInfo = Record<string, number>;

export type CategoryModalFormProps = {
  transactionCategoryInfo: TransactionCategorySplitInfo;
  transactionCategories: {
    [key: string]: ITransactionCategory;
  };
  transactionValue: ITransactionValue;
  handleFormCategoryInfoUpdate: (newCategoryInfo: TransactionCategorySplitInfo) => void;
};
