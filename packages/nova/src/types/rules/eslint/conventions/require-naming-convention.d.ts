import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Rule.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassDeclaration = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsConstructorVariable = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassMethod = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassProperty = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsConstant = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsEnum = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsEnumMember = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsFunction = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsInterface = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsParameter = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsReactComponent = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsTypeAlias = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsVariable = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Casing.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Name = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Expected = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Returns = boolean;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Class Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Node = TSESTree.ClassDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_ClassDeclaration = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Name = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Class Method.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_ClassMethod = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Name = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Class Property.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Node = TSESTree.PropertyDefinition;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_ClassProperty = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Name = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Enum Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Node = TSESTree.TSEnumDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_EnumCasing = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_EnumMember = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Name = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_MemberName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Function Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Node = TSESTree.FunctionDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_FunctionCasing = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ReactComponentCasing = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Parameter = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Name = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_IsUppercaseStart = boolean;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ExpectedCasing = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ExpectedContext = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Interface Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Node = TSESTree.TSInterfaceDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_InterfaceCasing = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Name = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Parameter.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Node = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Parameter = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Name = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_AssignmentName = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Type Alias Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Node = TSESTree.TSTypeAliasDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_TypeAlias = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Name = string;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Check Variable Declarator.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Node = TSESTree.VariableDeclarator;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Variable = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Constant = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_ConstructorVariable = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Returns = void;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Name = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Parent = TSESTree.Node;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Init = TSESTree.Expression | null;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Scope = ReturnType<typeof import('@typescript-eslint/utils/ts-eslint').SourceCode.prototype.getScope>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_ScopeVariable = ReturnType<Map<string, import('@typescript-eslint/utils/ts-eslint').Scope.Variable>['get']>;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_IsConstructor = boolean;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Ref = import('@typescript-eslint/utils/ts-eslint').Scope.Reference;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_IgnoreFiles = string[];

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Variable = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ConstructorVariable = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Constant = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Function = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Parameter = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ReactComponent = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ClassDeclaration = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ClassProperty = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ClassMethod = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_TypeAlias = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Interface = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Enum = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_EnumMember = string;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options = Readonly<{
  ignoreFiles: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_IgnoreFiles;
  variable: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Variable;
  constructorVariable: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ConstructorVariable;
  constant: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Constant;
  function: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Function;
  parameter: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Parameter;
  reactComponent: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ReactComponent;
  classDeclaration: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ClassDeclaration;
  classProperty: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ClassProperty;
  classMethod: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_ClassMethod;
  typeAlias: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_TypeAlias;
  interface: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Interface;
  enum: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_Enum;
  enumMember: Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_Options_EnumMember;
}>;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - Arrow Function Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_ArrowFunctionExpression_Node = TSESTree.ArrowFunctionExpression;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_ArrowFunctionExpression_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - Class Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_ClassDeclaration_Node = TSESTree.ClassDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_ClassDeclaration_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - Function Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_FunctionDeclaration_Node = TSESTree.FunctionDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_FunctionDeclaration_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - Function Expression.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_FunctionExpression_Node = TSESTree.FunctionExpression;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_FunctionExpression_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - Method Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_MethodDefinition_Node = TSESTree.MethodDefinition;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_MethodDefinition_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - Property Definition.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_PropertyDefinition_Node = TSESTree.PropertyDefinition;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_PropertyDefinition_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - TS Enum Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_TSEnumDeclaration_Node = TSESTree.TSEnumDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_TSEnumDeclaration_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - TS Interface Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_TSInterfaceDeclaration_Node = TSESTree.TSInterfaceDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_TSInterfaceDeclaration_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - TS Type Alias Declaration.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_TSTypeAliasDeclaration_Node = TSESTree.TSTypeAliasDeclaration;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_TSTypeAliasDeclaration_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Create - Variable Declarator.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_VariableDeclarator_Node = TSESTree.VariableDeclarator;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_Create_VariableDeclarator_Returns = void;

/**
 * Rules - ESLint - Conventions - Require Naming Convention - Is Immutable Value.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_IsImmutableValue_Init = TSESTree.Expression | null;

export type Rules_Eslint_Conventions_RequireNamingConvention_Runner_IsImmutableValue_Returns = boolean;
