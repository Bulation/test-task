export interface Tag {
  text: string;
}

export type AccountType = 'LDAP' | 'Локальная';

export interface Account {
  id: string;
  tags: Tag[];
  accountType: AccountType;
  login: string;
  password: string | null;
}

export interface AccountFormErrors {
  id: string;
  login?: string;
  password?: string;
}

export interface RawAccountData {
  id: string;
  tagsInput: string,
  accountType: AccountType,
  login: string,
  password: string | null
}