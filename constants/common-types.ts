export type UserTransaction = {
  id: string;
  purpose: string;
  amount: number;
  categoryColor: string;
  categoryId: string;
  categoryName: string;
  categoryEmoji: string;
  goalId: string;
  goalName: string;
  goalColor: string;
  goalEmoji: string;
  createdAt: string;
};

export type Transaction = {
  id: string;
  amount: number;
  createdAt: string;
  purpose: string;
};
