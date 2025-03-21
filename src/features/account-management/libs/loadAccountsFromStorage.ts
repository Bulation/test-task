import type { Account } from '../model/types';

export const loadAccountsFromStorage = (): Account[] => {
  const savedAccounts = localStorage.getItem('accounts-bulation');
  return savedAccounts ? JSON.parse(savedAccounts) : [];
}