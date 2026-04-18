import stylisticPlugin from '@stylistic/eslint-plugin';

import type { PresetsEslintDxCodeStyleConfigConfig } from '../../types/presets/eslint/dx-code-style.d.ts';

/**
 * Presets - ESLint - DX Code Style - Config.
 *
 * Enforces the project baseline code style across all JS and TS
 * files using stylistic and core ESLint rules for formatting, control flow, and safety.
 *
 * @since 0.11.0
 */
const config: PresetsEslintDxCodeStyleConfigConfig = [
  {
    name: 'nova/dx-code-style',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...stylisticPlugin.configs.recommended.rules,
    },
  },
  {
    name: 'nova/dx-code-style/arrows',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Always wrap arrow function parameters in parentheses so "if (a => b)" isn't mistaken for a comparison.
      '@stylistic/arrow-parens': [
        'error',
        'always',
      ],
    },
  },
  {
    name: 'nova/dx-code-style/braces-commas-semicolons',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Always use 1tbs (one true brace style) so the opening brace sits on the same line as its statement and no vertical space is wasted on brace-only lines.
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        {
          'allowSingleLine': false,
        },
      ],

      // Require trailing commas in multiline code so adding lines doesn't break diffs or need editing nearby.
      '@stylistic/comma-dangle': [
        'error',
        'always-multiline',
      ],

      // Always use semicolons so automatic semicolon insertion (ASI) never silently changes how statements are parsed.
      '@stylistic/semi': [
        'error',
        'always',
      ],

      // Enforce curly braces for all control structures (if, for, while, etc.) so single-line bodies don't silently grow into bugs.
      'curly': [
        'error',
        'all',
      ],
    },
  },
  {
    name: 'nova/dx-code-style/cleanup',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    rules: {
      // Disallow the Array constructor so single-number arguments don't silently create sparse arrays instead of one-element arrays.
      'no-array-constructor': ['error'],

      // Prevent raw console output so all logging flows through the "Logger" toolkit battery.
      'no-console': ['error'],

      // Disallow chaining assignments in a single expression so each assignment is visible and variable types are not accidentally shared.
      'no-multi-assign': ['error'],

      // Disallow process.exit() so error handling follows structured patterns instead of abrupt termination.
      'no-process-exit': ['error'],

      // Disallow exporting "default" as a named export and "then" so modules don't accidentally become thenable and break dynamic import.
      'no-restricted-exports': [
        'error',
        {
          restrictedNamedExports: [
            'default',
            'then',
          ],
        },
      ],

      // Disallow computed keys when the expression is a static string so object keys stay simple and don't look dynamic when they are not.
      'no-useless-computed-key': ['error'],

      // Disallow concatenating two string literals because "foo" + "bar" should just be "foobar" — separate pieces suggest dynamic values that don't exist.
      'no-useless-concat': ['error'],

      // Disallow renaming imports, exports, or destructured values to the same name so renames only appear when they are meaningful.
      'no-useless-rename': ['error'],

      // Require spread syntax instead of Object.assign() when creating a new object so the shape is visible inline without a utility function.
      'prefer-object-spread': ['error'],

      // Require the radix argument in parseInt() so the base is always explicit and octal parsing surprises are eliminated.
      'radix': ['error'],
    },
  },
  {
    name: 'nova/dx-code-style/control-flow',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    rules: {
      // Require hasOwnProperty check inside for-in loops so inherited prototype properties are not accidentally iterated.
      'guard-for-in': ['error'],

      // Disallow else after a return because the else branch is unreachable after a return and removing it reduces one level of indentation.
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],

      // Disallow standalone blocks without a control statement because they add nesting without purpose and mislead readers into thinking there is a missing if/for/while.
      'no-lone-blocks': ['error'],

      // Disallow if as the only statement in an else block because "else if" reads as one flat branch instead of an else hiding a nested if.
      'no-lonely-if': ['error'],

      // Disallow loops that always exit after one iteration so the loop construct does not mislead readers about repetition.
      'no-unreachable-loop': ['error'],
    },
  },
  {
    name: 'nova/dx-code-style/conventions',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    rules: {
      // Require default clause to be the last case in a switch statement so readers always find the fallback at the bottom.
      'default-case-last': ['error'],

      // Require constructors to start with a capital letter so new-invocations are visually distinct from regular function calls.
      'new-cap': [
        'error',
        {
          newIsCap: true,
          capIsNew: false,
        },
      ],

      // Require a space after // and /* in comments so "//xxx" is caught and comment text is never jammed against the delimiter.
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            markers: [
              '=',
              '!',
              '/',
            ],
          },
          block: {
            markers: [
              '=',
              '!',
              ':',
              '::',
            ],
            balanced: true,
          },
        },
      ],

      // Require a description string when creating a Symbol so debugging output shows a meaningful label instead of "Symbol()".
      'symbol-description': ['error'],
    },
  },
  {
    name: 'nova/dx-code-style/functions-and-classes',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    rules: {
      // Require return statements in array method callbacks so missing returns don't silently produce undefined values in the result.
      'array-callback-return': [
        'error',
        {
          allowImplicit: false,
        },
      ],

      // Require parameters with default values to be last so callers can omit trailing arguments instead of passing undefined to skip them.
      'default-param-last': ['error'],

      // Require getter and setter for the same property to be adjacent so a get/set pair is never separated by unrelated members that hide the relationship.
      'grouped-accessor-pairs': ['error'],

      // Limit to one class per file so each file has a single responsibility.
      'max-classes-per-file': [
        'error',
        1,
      ],

      // Disallow returning a value inside constructors so the instance is always the return value and factory-like misuse is prevented.
      'no-constructor-return': ['error'],

      // Disallow unnecessary .bind() calls on functions that never use "this" so bind is reserved for genuine context-passing.
      'no-extra-bind': ['error'],

      // Disallow functions created inside loops that reference outer loop variables so closure-over-mutation bugs are prevented.
      'no-loop-func': ['error'],

      // Disallow using new for side effects without storing the result so constructors are always called for their return value.
      'no-new': ['error'],

      // Disallow assignments inside return statements because "return x = y" performs two operations (assign + return) on one line where the assignment is easily overlooked.
      'no-return-assign': [
        'error',
        'always',
      ],

      // Disallow catch clauses that just rethrow the error so try/catch blocks only appear when the error is actually handled.
      'no-useless-catch': ['error'],

      // Disallow constructors that do nothing or just call super() with the same arguments so constructors only exist when they add behavior.
      'no-useless-constructor': ['error'],

      // Require Promise.reject() to be called with an Error object so rejected promises always carry a stack trace for debugging.
      'prefer-promise-reject-errors': ['error'],

      // Require spread syntax instead of .apply() because "fn(...args)" reads as a direct call while ".apply(null, args)" obscures intent behind a utility pattern.
      'prefer-spread': ['error'],
    },
  },
  {
    name: 'nova/dx-code-style/arrays',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Force line breaks inside brackets when there are 2 or more elements so each item gets its own line.
      '@stylistic/array-bracket-newline': [
        'error',
        {
          minItems: 2,
        },
      ],

      // Force each element onto its own line when there are 2 or more elements so diffs only touch the lines that changed.
      '@stylistic/array-element-newline': [
        'error',
        {
          minItems: 2,
        },
      ],
    },
  },
  {
    name: 'nova/dx-code-style/objects',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Force line breaks inside braces when there are multiple items so each property gets its own line and diffs only touch the lines that changed.
      '@stylistic/object-curly-newline': [
        'error',
        {
        // Object literal expressions (e.g., const obj = { a: 1 }).
          ObjectExpression: {
            minProperties: 2,
            multiline: true,
            consistent: true,
          },

          // Object destructuring patterns (e.g., const { a, b } = obj).
          ObjectPattern: {
            minProperties: 4,
            multiline: true,
            consistent: true,
          },

          // Named imports in ES modules (e.g., import { a, b } from 'lib').
          ImportDeclaration: {
            minProperties: 4,
            multiline: true,
          },

          // TypeScript type literals (e.g., type X = { a: string }).
          TSTypeLiteral: {
            minProperties: 1,
            multiline: true,
            consistent: true,
          },

          // TypeScript interface bodies (e.g., interface X { a: string }).
          TSInterfaceBody: {
            minProperties: 1,
            multiline: true,
            consistent: true,
          },

          // TypeScript enum bodies (e.g., enum X { A, B }).
          TSEnumBody: {
            minProperties: 1,
            multiline: true,
            consistent: true,
          },
        },
      ],

      // Prefer shorthand properties (e.g., `choices` instead of `choices: choices`) so object literals stay concise and don't repeat names.
      'object-shorthand': [
        'error',
        'always',
      ],
    },
  },
  {
    name: 'nova/dx-code-style/operators',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Require parentheses when mixing operators with different precedence so the intended evaluation order is always explicit.
      '@stylistic/no-mixed-operators': [
        'error',
        {
          allowSamePrecedence: true,
        },
      ],

      // Require strict equality (===, !==) instead of loose equality (==, !=) so type coercion is never hidden.
      'eqeqeq': [
        'error',
        'always',
      ],

      // Disallow bitwise operators so accidental use of "&" instead of "&&" or "|" instead of "||" is caught immediately.
      'no-bitwise': ['error'],

      // Disallow assignment in conditional expressions so accidental "=" instead of "===" is caught immediately.
      'no-cond-assign': [
        'error',
        'always',
      ],

      // Disallow deleting variables so bindings are managed through scope and not removed at runtime where it has no effect.
      'no-delete-var': ['error'],

      // Disallow reassigning function parameters so mutations are visible and callers are not surprised by changed arguments.
      'no-param-reassign': [
        'error',
        {
          props: true,
        },
      ],

      // Forbid "++" and "--" so increments are always written as explicit assignments and hidden side effects are avoided.
      'no-plusplus': ['error'],

      // Disallow comparing a variable to itself so copy-paste bugs like "x === x" instead of "x === y" are caught immediately.
      'no-self-compare': ['error'],

      // Disallow the comma operator so side effects are not hidden inside expressions where only the last value is used.
      'no-sequences': ['error'],

      // Prevent confusing negation of the left operand of relational operators so "!a in b" is not mistaken for "!(a in b)".
      'no-unsafe-negation': ['error'],

      // Disallow the void operator so "undefined" is written directly and intent is not obscured by an operator.
      'no-void': [
        'error',
        {
          allowAsStatement: true,
        },
      ],

      // Require shorthand operator assignments (+=, -=, *=) so the target variable is only written once and the operation is concise.
      'operator-assignment': [
        'error',
        'always',
      ],

      // Disallow Yoda conditions so comparisons read in natural order (variable first, literal second).
      'yoda': ['error'],
    },
  },
  {
    name: 'nova/dx-code-style/quotes',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Enforce quoting all or none of the keys in an object so mixed quoting does not make some properties look out of place.
      '@stylistic/quote-props': [
        'error',
        'consistent',
      ],

      // Use single quotes for strings because double quotes are reserved for HTML/JSX attributes and one canonical style eliminates pointless diffs.
      '@stylistic/quotes': [
        'error',
        'single',
      ],

      // Prefer template literals instead of string concatenation because "Hello " + name + "!" is harder to scan than `Hello ${name}!` when expressions are involved.
      'prefer-template': ['error'],
    },
  },
  {
    name: 'nova/dx-code-style/safety',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    rules: {
      // Disallow arguments.caller and arguments.callee so code does not rely on features removed from strict mode.
      'no-caller': ['error'],

      // Disallow eval() so arbitrary strings are never executed as code and injection attacks are prevented.
      'no-eval': ['error'],

      // Disallow extending native built-in prototypes so built-in behavior stays predictable across all consumers of the runtime.
      'no-extend-native': ['error'],

      // Disallow string arguments to setTimeout/setInterval so hidden eval-like execution is prevented.
      'no-implied-eval': ['error'],

      // Disallow the __iterator__ property so code uses the standard Symbol.iterator protocol instead of a deprecated API.
      'no-iterator': ['error'],

      // Disallow creating functions with the Function constructor so code is not dynamically compiled from strings like eval.
      'no-new-func': ['error'],

      // Disallow primitive wrapper constructors (new String, new Number, new Boolean) so values remain primitives instead of objects that break typeof checks.
      'no-new-wrappers': ['error'],

      // Disallow octal escape sequences in strings so escape sequences use the standard Unicode or hex form and are not misread.
      'no-octal-escape': ['error'],

      // Disallow returning a value inside a Promise executor so the silently ignored return value does not hide a missing resolve/reject call.
      'no-promise-executor-return': ['error'],

      // Disallow the __proto__ property so prototype access uses the standard Object.getPrototypeOf/setPrototypeOf methods.
      'no-proto': ['error'],

      // Disallow throwing anything that isn't an Error object so stack traces are always available for debugging.
      'no-throw-literal': ['error'],
    },
  },
  {
    name: 'nova/dx-code-style/ternary',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Disallow line breaks in ternary expressions because a ternary split across lines is harder to parse than an if/else and should be refactored to one.
      '@stylistic/multiline-ternary': [
        'error',
        'never',
        {
          'ignoreJSX': true,
        },
      ],

      // Disallow nested ternary expressions because "a ? b : c ? d : e" forces readers to mentally track precedence instead of reading a flat if/else-if chain.
      'no-nested-ternary': ['error'],

      // Disallow ternary expressions that can be simplified so redundant wrappers like "x ? true : false" are replaced by direct expressions.
      'no-unneeded-ternary': [
        'error',
        {
          defaultAssignment: false,
        },
      ],
    },
  },
  {
    name: 'nova/dx-code-style/text-characters',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    rules: {
      // Disallow irregular Unicode whitespace in runtime text so invisible characters do not cause subtle rendering or comparison bugs.
      'no-irregular-whitespace': [
        'error',
        {
          skipStrings: false,
          skipComments: true,
          skipRegExps: true,
          skipTemplates: false,
          skipJSXText: false,
        },
      ],
    },
  },
  {
    name: 'nova/dx-code-style/variables',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    rules: {
      // Disallow labels that share a name with a variable so identifiers are unambiguous and never confused with flow-control labels.
      'no-label-var': ['error'],

      // Disallow labeled statements so control flow uses functions or early returns instead of obscure break/continue targets.
      'no-labels': [
        'error',
        {
          allowLoop: false,
          allowSwitch: false,
        },
      ],

      // Disallow variable declarations that shadow a variable in an outer scope so each name refers to exactly one binding.
      'no-shadow': ['error'],

      // Disallow expressions that are evaluated but never used so dead code without side effects does not accumulate.
      'no-unused-expressions': ['error'],

      // Disallow declared variables that are never used so dead declarations do not obscure the variables that actually matter.
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // Disallow var so bindings are always block-scoped and hoisting surprises are eliminated.
      'no-var': ['error'],

      // Require one variable declaration per statement so diffs stay clean and each binding is independently visible.
      'one-var': [
        'error',
        'never',
      ],

      // Require const for variables that are never reassigned so readers know at a glance which bindings are stable.
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],
    },
  },
];

export default config;
