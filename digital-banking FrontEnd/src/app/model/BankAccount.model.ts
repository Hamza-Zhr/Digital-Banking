export interface BankAccount {
  id: string;
  balance: number;
  createdate: Date;
  type: string;  // CurrentAccount ou SavingAccount
  overdraft?: number;  // Seulement pour CurrentAccount
  interestRate?: number;  // Seulement pour SavingAccount
}
