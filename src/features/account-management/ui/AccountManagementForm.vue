<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAccountStore } from '../model/account-store';
import type { Account, AccountFormErrors, RawAccountData } from '../model/types';

const accountStore = useAccountStore();

const accountTypeOptions = ['LDAP', 'Локальная'];
const rawAccountsData = ref<RawAccountData[]>([]);
const formErrors = ref<Map<string, AccountFormErrors>>(new Map());
const shouldShowAccounts = computed(() => rawAccountsData.value.length);

onMounted(() => {
  accountStore.accounts.forEach((account: Account) => {
    initializeRawAccountsData(account);
  });
});

const initializeRawAccountsData = (account: Account) => {
  rawAccountsData.value.push({
    ...account,
    tagsInput: account.tags.map((tag: { text: string }) => tag.text).join(';'),
  });
  formErrors.value.set(account.id, { id: account.id });
}

const addNewAccount = () => {
  const newAccount = accountStore.generateAccount();
  initializeRawAccountsData(newAccount);
}

const deleteAccount = (account: RawAccountData) => {
  accountStore.deleteAccount(account.id);
  rawAccountsData.value = rawAccountsData.value.filter(acc => acc.id !== account.id);
  formErrors.value.delete(account.id);
}

const handleAccountTypeChange = (account: RawAccountData) => {
  if (account.accountType === 'LDAP')
    account.password = null;

  validateFields(account);
}

function validateLogin(account: RawAccountData) {
  if (!account.login.trim()) {
    formErrors.value.set(account.id, {
      ...formErrors.value.get(account.id),
      id: account.id,
      login: 'Логин обязателен'
    });
    return false;
  } else {
    formErrors.value.set(account.id, {
      ...formErrors.value.get(account.id),
      id: account.id,
      login: undefined
    });
    return true;
  }
}

const validatePassword = (account: RawAccountData) => {
  if (account?.accountType === 'LDAP')
    return true;

  if (!account.password?.trim()) {
    formErrors.value.set(account.id, {
      ...formErrors.value.get(account.id),
      id: account.id,
      password: 'Пароль обязателен'
    });
    return false;
  } else {
    formErrors.value.set(account.id, {
      ...formErrors.value.get(account.id),
      id: account.id,
      password: undefined
    });
    return true;
  }
}

const handleTagsUpdate = (tagsInput: string) => {
  return tagsInput
      .split(';')
      .filter(tag => tag.trim() !== '')
      .map(tag => ({ text: tag.trim() }));
}

function validateFields(account: RawAccountData) {
  const loginValid = validateLogin(account);
  const passwordValid = validatePassword(account);
  if (loginValid && passwordValid) {
    const updatedAccount = {
      ...account,
      tags: handleTagsUpdate(account.tagsInput),
    }
    accountStore.updateAccount(updatedAccount);
  }
}
</script>

<template>
  <section class="account-management-container">
    <div class="header">
      <h1>Учётные записи</h1>
      <button class="add-button" @click="addNewAccount">
        +
      </button>
    </div>

    <div class="form-hint">
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ";"</p>
    </div>

    <div v-if="shouldShowAccounts" class="accounts-list">
      <div class="account-list-header">
        <div class="field-label">Метка</div>
        <div class="field-label">Тип записи</div>
        <div class="field-label">Логин</div>
        <div class="field-label">Пароль</div>
      </div>

      <div v-for="account in rawAccountsData" :key="account.id" class="account-item">
        <div class="field" data-label="Метка">
          <input
            v-model="account.tagsInput"
            placeholder="Метки через ;"
            type="text"
            maxlength="50"
            @blur="validateFields(account)"
          >
        </div>

        <div class="field" data-label="Тип записи">
          <select
            v-model="account.accountType"
            @change="handleAccountTypeChange(account)"
          >
            <option v-for="option in accountTypeOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="field" data-label="Логин">
          <input
            v-model="account.login"
            placeholder="Введите логин"
            type="text"
            maxlength="100"
            :class="{ 'error': formErrors.get(account.id)?.login }"
            @blur="validateFields(account)"
          >
        </div>

        <div class="field" data-label="Пароль">
          <input
            v-if="account.accountType === 'Локальная'"
            v-model="account.password"
            type="password"
            placeholder="Введите пароль"
            maxlength="100"
            :class="{ 'error': formErrors.get(account.id)?.password }"
            @blur="validateFields(account)"
          >
        </div>

        <div class="field actions">
          <button class="delete-button" @click="deleteAccount(account)">
            Удалить
          </button>
        </div>
      </div>
    </div>

    <div v-else class="no-accounts">
      <p>Нет добавленных учетных записей. Нажмите "+" чтобы добавить.</p>
    </div>
  </section>
</template>

<style scoped>
.account-management-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: var(--vt-c-white);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  background-color: var(--vt-c-blue);
  color: var(--vt-c-white);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-hint {
  margin-bottom: 20px;
  padding: 10px;
  background-color: var(--color-background-soft);
  border-left: 4px solid var(--vt-c-blue);
}

.accounts-list {
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.account-list-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px;
  gap: 10px;
  padding: 10px;
  background-color: var(--color-background-soft);
  font-weight: bold;
}

.account-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid var(--color-background-mute);
}

.field {
  padding: 5px;
}

.field.actions {
  display: flex;
  justify-content: center;
}

.delete-button {
  background-color: var(--vt-c-red);
  color: var(--vt-c-white);
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}

.no-accounts {
  text-align: center;
  padding: 20px;
  background-color: var(--color-background-mute);
  border-radius: 4px;
}

.field input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.field input.error {
  outline: 3px solid var(--vt-c-red);
}

.field select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .account-management-container {
    padding: 15px 10px;
  }

  .header {
    margin-bottom: 15px;
  }

  .account-list-header {
    display: none;
  }

  .account-item {
    display: flex;
    flex-direction: column;
    padding: 15px 10px;
  }

  .account-item .field {
    margin-bottom: 10px;
    width: 100%;
  }

  .account-item .field::before {
    color: var(--color-text);
    content: attr(data-label);
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  .delete-button {
    width: 100%;
    padding: 10px;
  }
}
</style>