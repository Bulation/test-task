import type { Account } from '../model/types';

export const saveAccountsToStorage = (accounts: Account[]) => {
  localStorage.setItem('accounts-bulation', JSON.stringify(accounts));
};
