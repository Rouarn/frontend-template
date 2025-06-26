import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
  },
  {
    rules: {
      // 要求组件名使用多单词（防止与 HTML 原生标签冲突），但允许例外（如 index、App 等）
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', 'Register', '[id]', '[url]'],
        },
      ],
      // 强制模板中的组件名使用 PascalCase（大驼峰）命名，除了以 icon- 开头的
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: ['icon-*'],
        },
      ],
      // 禁止未使用的变量，但允许以 _ 开头的变量
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // 强制类型导入必须使用 import type 语法
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],

      // 强制 import 排序
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [`^vue$`, `^vue-router$`, `^naive-ui$`],
            [`.*\\.vue$`], // .vue 文件
            [`.*/assets/.*`, `^@/assets$`],
            [`.*/hooks/.*`, `^@/hooks$`],
            [`.*/plugins/.*`, `^@/plugins$`],
            [`.*/router/.*`, `^@/router$`],
            [`^@/services$`, `^@/services/.*`],
            [`.*/store/.*`, `^@/stores$`],
            [`.*/utils/.*`, `^@/utils$`],
            [`^`],
            [`^type `],
          ],
        },
      ],
    },
  },
)
