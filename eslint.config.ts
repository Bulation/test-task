import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    rules: {
      // JS
      'quote-props': ['error', 'consistent-as-needed'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'curly': [2, 'multi'],
      'no-shadow': 'off',
      'no-console': ['warn', { allow: ['error'] }],
      'max-len': ['error', {
        code: 160,
        ignoreComments: true,
        ignoreUrls: true,
      }],
      // Vue
      'vue/no-v-html': 'off',
      'vue/attributes-order': 'error',
      'vue/multiline-html-element-content-newline': ['error'],
      'vue/no-async-in-computed-properties': ['error'],
      'vue/no-multi-spaces': ['error', {
        ignoreProperties: false,
      }],
      'vue/multi-word-component-names': ['error', {
        ignores: ['index', 'default', 'error'],
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: true,
        ignores: [],
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1,
      }],
      'vue/html-end-tags': ['error'],
      'vue/html-indent': ['error'],
      'vue/html-quotes': ['error', 'double'],
      'vue/html-self-closing': ['error', {
        html: {
          normal: 'always',
          void: 'never',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/max-len': 'off',
    },
  },
)
