import { defineStore } from 'pinia';
import type { Account, AccountType } from './types';
import { loadAccountsFromStorage } from '../libs/loadAccountsFromStorage';
import { saveAccountsToStorage } from '../libs/saveAccountsToStorage';

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    accounts: loadAccountsFromStorage(),
  }),

  getters: {
    getAccounts: (state) => state.accounts,
  },

  actions: {
    generateAccount() {
      return {
        id: this.generateId(),
        tags: [],
        accountType: 'Локальная' as AccountType,
        login: '',
        password: '',
      };
    },

    updateAccount(updatedAccount: Account) {
      if (!this.validateAccount(updatedAccount))
        return false;

      const index = this.accounts.findIndex(acc => acc.id === updatedAccount.id);
      if (index !== -1)
        this.accounts[index] = { ...updatedAccount };
      else
        this.accounts.push(updatedAccount);
      this.saveAccounts();
      return true;
    },

    deleteAccount(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
      this.saveAccounts();
    },

    validateAccount(account: Account): boolean {
      return account.login?.trim() !== '' && (account.accountType === 'Локальная' || account.password?.trim() !== '');
    },

    saveAccounts() {
      saveAccountsToStorage(this.accounts);
    },

    generateId() {
      return Date.now().toString(36) + Math.random().toString(36).slice(2);
    },
  },
});
