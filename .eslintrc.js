const off = 0;
const warn = 1;
const error = 2;

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    plugins: ['import', 'prettier', 'simple-import-sort'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    env: {
        browser: 'true',
    },
    globals: {
        window: true,
        document: true,
    },
    rules: {
        '@typescript-eslint/no-namespace': off,
        '@typescript-eslint/interface-name-prefix': off,
        '@typescript-eslint/explicit-function-return-type': off,
        '@typescript-eslint/no-explicit-any': off,
        '@typescript-eslint/no-parameter-properties': off,
        '@typescript-eslint/no-object-literal-type-assertion': off,
        '@typescript-eslint/camelcase': off,
        '@typescript-eslint/explicit-member-accessibility': off,

        'import/no-unresolved': off,
        'import/prefer-default-export': off,
        'import/extensions': off,

        'simple-import-sort/sort': off,
        'no-inner-declarations': off,
        'class-methods-use-this': off,
        'no-useless-constructor': off,
        'no-undef': off,
        'no-return-assign': off,
        'global-require': off,
        camelcase: off,
        'consistent-return': off,
        'no-plusplus': off,
        'no-nested-ternary': off,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
