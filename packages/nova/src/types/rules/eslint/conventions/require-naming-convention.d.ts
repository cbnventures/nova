import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Casing.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckCasingName = string;

export type RulesEslintConventionsRequireNamingConventionCheckCasingExpected = string;

export type RulesEslintConventionsRequireNamingConventionCheckCasingReturns = boolean;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Class Declaration.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckClassDeclarationContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckClassDeclarationNode = TSESTree.ClassDeclaration;

export type RulesEslintConventionsRequireNamingConventionCheckClassDeclarationClassDeclaration = string;

export type RulesEslintConventionsRequireNamingConventionCheckClassDeclarationReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckClassDeclarationName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Class Method.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckClassMethodContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckClassMethodNode = TSESTree.MethodDefinition;

export type RulesEslintConventionsRequireNamingConventionCheckClassMethodClassMethod = string;

export type RulesEslintConventionsRequireNamingConventionCheckClassMethodReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckClassMethodName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Class Property.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckClassPropertyContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckClassPropertyNode = TSESTree.PropertyDefinition;

export type RulesEslintConventionsRequireNamingConventionCheckClassPropertyClassProperty = string;

export type RulesEslintConventionsRequireNamingConventionCheckClassPropertyReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckClassPropertyName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Enum Declaration.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationNode = TSESTree.TSEnumDeclaration;

export type RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationEnum = string;

export type RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationEnumMember = string;

export type RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationName = string;

export type RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationMemberName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Function Declaration.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationNode = TSESTree.FunctionDeclaration;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationFunction = string;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationReactComponent = string;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationParameter = string;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationName = string;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationIsUppercaseStart = boolean;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationExpectedCasing = string;

export type RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationExpectedContext = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Interface Declaration.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationNode = TSESTree.TSInterfaceDeclaration;

export type RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationInterface = string;

export type RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Parameter.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckParameterContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckParameterNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type RulesEslintConventionsRequireNamingConventionCheckParameterParameter = string;

export type RulesEslintConventionsRequireNamingConventionCheckParameterReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckParameterName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Type Alias Declaration.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationNode = TSESTree.TSTypeAliasDeclaration;

export type RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationTypeAlias = string;

export type RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Variable Declarator.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorNode = TSESTree.VariableDeclarator;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorVariable = string;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorConstant = string;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorConstructorVariable = string;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorReturns = void;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorName = string;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorParent = TSESTree.Node;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorInit = TSESTree.Expression | null;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorScope = ReturnType<typeof import('@typescript-eslint/utils/ts-eslint').SourceCode.prototype.getScope>;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorScopeVariable = ReturnType<Map<string, import('@typescript-eslint/utils/ts-eslint').Scope.Variable>['get']>;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorIsConstructor = boolean;

export type RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorReference = import('@typescript-eslint/utils/ts-eslint').Scope.Reference;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Is Immutable Value.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionIsImmutableValueNode = TSESTree.Expression | null;

export type RulesEslintConventionsRequireNamingConventionIsImmutableValueReturns = boolean;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassDeclaration = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsConstructorVariable = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassMethod = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassProperty = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsConstant = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsEnum = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsEnumMember = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsFunction = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsInterface = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsParameter = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsReactComponent = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsTypeAlias = string;

export type RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsVariable = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsIgnoreFiles = string[];

export type RulesEslintConventionsRequireNamingConventionRuleOptionsVariable = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsConstructorVariable = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsConstant = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsFunction = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsParameter = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsReactComponent = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsClassDeclaration = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsClassProperty = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsClassMethod = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsTypeAlias = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsInterface = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsEnum = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptionsEnumMember = string;

export type RulesEslintConventionsRequireNamingConventionRuleOptions = Readonly<{
  ignoreFiles: RulesEslintConventionsRequireNamingConventionRuleOptionsIgnoreFiles;
  variable: RulesEslintConventionsRequireNamingConventionRuleOptionsVariable;
  constructorVariable: RulesEslintConventionsRequireNamingConventionRuleOptionsConstructorVariable;
  constant: RulesEslintConventionsRequireNamingConventionRuleOptionsConstant;
  function: RulesEslintConventionsRequireNamingConventionRuleOptionsFunction;
  parameter: RulesEslintConventionsRequireNamingConventionRuleOptionsParameter;
  reactComponent: RulesEslintConventionsRequireNamingConventionRuleOptionsReactComponent;
  classDeclaration: RulesEslintConventionsRequireNamingConventionRuleOptionsClassDeclaration;
  classProperty: RulesEslintConventionsRequireNamingConventionRuleOptionsClassProperty;
  classMethod: RulesEslintConventionsRequireNamingConventionRuleOptionsClassMethod;
  typeAlias: RulesEslintConventionsRequireNamingConventionRuleOptionsTypeAlias;
  interface: RulesEslintConventionsRequireNamingConventionRuleOptionsInterface;
  enum: RulesEslintConventionsRequireNamingConventionRuleOptionsEnum;
  enumMember: RulesEslintConventionsRequireNamingConventionRuleOptionsEnumMember;
}>;
