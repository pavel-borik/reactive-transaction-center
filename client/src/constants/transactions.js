export const TransactionDirections = Object.freeze({
  INCOMING: { id: 'INCOMING', text: 'Incoming' },
  OUTGOING: { id: 'OUTGOING', text: 'Outgoing' },
  BOTH: { id: 'BOTH', text: 'Both' }
});

export const TransactionValueOperators = Object.freeze({
  LESS_THAN: { id: 'LESS_THAN', text: 'Less than' },
  MORE_THAN: { id: 'MORE_THAN', text: 'More than' },
  BETWEEN: { id: 'BETWEEN', text: 'Between' }
});

export const TransactionTypes = Object.freeze({
  PAYMENT_HOME: { id: 'PAYMENT_HOME', text: 'Payment home' },
  PAYMENT_ABROAD: { id: 'PAYMENT_ABROAD', text: 'Payment abroad' },
  PAYMENT_PERSONAL: { id: 'PAYMENT_PERSONAL', text: 'Payment personal' },
  PAYMENT_ACCOUNT: { id: 'PAYMENT_ACCOUNT', text: 'Payment account' },
  STANDING_ORDER: { id: 'STANDING_ORDER', text: 'Standing order' },
  SAVING: { id: 'SAVING', text: 'Saving' },
  DIRECT_DEBIT: { id: 'DIRECT_DEBIT', text: 'Direct debit' },
  DIRECT_DEBIT_SIPO: { id: 'DIRECT_DEBIT_SIPO', text: 'Direct debit SIPO' },
  CARD: { id: 'CARD', text: 'Card payment' },
  CASH: { id: 'CASH', text: 'Cash payment' },
  FEE: { id: 'FEE', text: 'Fee' },
  TAX: { id: 'TAX', text: 'Tax' },
  INTEREST: { id: 'INTEREST', text: 'Interest' },
  INSURANCE: { id: 'INSURANCE', text: 'Insurance' },
  LOAN: { id: 'LOAN', text: 'Loan' },
  MORTGAGE: { id: 'MORTGAGE', text: 'Mortgage payment' }
});
