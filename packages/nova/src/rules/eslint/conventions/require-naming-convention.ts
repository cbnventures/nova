import { ESLintUtils } from '@typescript-eslint/utils';

import {
  LIB_REGEX_PATTERN_CASING_CAMEL_CASE,
  LIB_REGEX_PATTERN_CASING_PASCAL_CASE,
  LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE,
  LIB_REGEX_PATTERN_CASING_UPPER_SNAKE_CASE,
} from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Expected,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_ClassDeclaration,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_ClassMethod,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_ClassProperty,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Enum,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_EnumMember,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_MemberName,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ExpectedCasing,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ExpectedContext,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Function,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_IsUppercaseStart,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Parameter,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ReactComponent,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Interface,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Parameter,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_TypeAlias,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Constant,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_ConstructorVariable,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Context,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Init,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_IsConstructor,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Name,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Parent,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Reference,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Scope,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_ScopeVariable,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Variable,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_IsImmutableValue_Node,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_IsImmutableValue_Returns,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassDeclaration,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassMethod,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassProperty,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsConstant,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsConstructorVariable,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsEnum,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsEnumMember,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsFunction,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsInterface,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsParameter,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsReactComponent,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsTypeAlias,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsVariable,
  Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleOptions,
} from '../../../types/rules/eslint/conventions/require-naming-convention.d.ts';

/**
 * Rules - ESLint - Conventions - Require Naming Convention.
 *
 * Enforces context-aware casing rules across all identifier types: variables, functions,
 * classes, enums, interfaces, type aliases, and parameters.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Rule.
   *
   * Registered as a custom ESLint rule in the eslint config and dispatches AST visitors to
   * per-declaration check methods with configurable casing expectations.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-naming-convention',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Enforce context-aware naming conventions for identifiers.',
      },
      messages: {
        wrongCasing: '"{{ name }}" should be {{ expected }} for {{ context }}.',
      },
      schema: [{
        type: 'object',
        properties: {
          classDeclaration: { type: 'string' },
          classMethod: { type: 'string' },
          classProperty: { type: 'string' },
          constant: { type: 'string' },
          enum: { type: 'string' },
          enumMember: { type: 'string' },
          function: { type: 'string' },
          ignoreFiles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          interface: { type: 'string' },
          parameter: { type: 'string' },
          reactComponent: { type: 'string' },
          typeAlias: { type: 'string' },
          constructorVariable: { type: 'string' },
          variable: { type: 'string' },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      classDeclaration: 'PascalCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassDeclaration,
      constructorVariable: 'PascalCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsConstructorVariable,
      classMethod: 'camelCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassMethod,
      classProperty: 'camelCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsClassProperty,
      constant: 'UPPER_SNAKE_CASE' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsConstant,
      enum: 'PascalCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsEnum,
      enumMember: 'PascalCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsEnumMember,
      function: 'camelCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsFunction,
      ignoreFiles: [] as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsIgnoreFiles,
      interface: 'PascalCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsInterface,
      parameter: 'camelCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsParameter,
      reactComponent: 'PascalCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsReactComponent,
      typeAlias: 'UnderscorePascalCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsTypeAlias,
      variable: 'camelCase' as Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleDefaultOptionsVariable,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Conventions_RequireNamingConvention_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        VariableDeclarator(node) {
          Runner.checkVariableDeclarator(context, node, options['variable'], options['constant'], options['constructorVariable']);

          return;
        },
        FunctionDeclaration(node) {
          Runner.checkFunctionDeclaration(context, node, options['function'], options['reactComponent'], options['parameter']);

          return;
        },
        FunctionExpression(node) {
          Runner.checkParameter(context, node, options['parameter']);

          return;
        },
        ArrowFunctionExpression(node) {
          Runner.checkParameter(context, node, options['parameter']);

          return;
        },
        ClassDeclaration(node) {
          Runner.checkClassDeclaration(context, node, options['classDeclaration']);

          return;
        },
        PropertyDefinition(node) {
          Runner.checkClassProperty(context, node, options['classProperty']);

          return;
        },
        MethodDefinition(node) {
          Runner.checkClassMethod(context, node, options['classMethod']);

          return;
        },
        TSTypeAliasDeclaration(node) {
          Runner.checkTypeAliasDeclaration(context, node, options['typeAlias']);

          return;
        },
        TSInterfaceDeclaration(node) {
          Runner.checkInterfaceDeclaration(context, node, options['interface']);

          return;
        },
        TSEnumDeclaration(node) {
          Runner.checkEnumDeclaration(context, node, options['enum'], options['enumMember']);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Casing.
   *
   * Tests a name against camelCase, PascalCase, UnderscorePascalCase, or
   * UPPER_SNAKE_CASE using regex patterns from the shared lib/regex module.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Name}     name     - Name.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Expected} expected - Expected.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Returns}
   *
   * @since 0.15.0
   */
  private static checkCasing(name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Name, expected: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Expected): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckCasing_Returns {
    if (expected === 'camelCase') {
      // Must start with lowercase, no underscores except leading (for unused vars).
      return LIB_REGEX_PATTERN_CASING_CAMEL_CASE.test(name);
    }

    if (expected === 'PascalCase') {
      return LIB_REGEX_PATTERN_CASING_PASCAL_CASE.test(name);
    }

    if (expected === 'UnderscorePascalCase') {
      return LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE.test(name);
    }

    if (expected === 'UPPER_SNAKE_CASE') {
      return LIB_REGEX_PATTERN_CASING_UPPER_SNAKE_CASE.test(name);
    }

    return true;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Class Declaration.
   *
   * Called by the ClassDeclaration visitor to verify the class name matches the configured
   * casing, which defaults to PascalCase.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Context}          context          - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Node}             node             - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_ClassDeclaration} classDeclaration - Class declaration.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Returns}
   *
   * @since 0.15.0
   */
  private static checkClassDeclaration(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Node, classDeclaration: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_ClassDeclaration): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Returns {
    if (node.id === null) {
      return;
    }

    const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassDeclaration_Name = node.id.name;

    if (Runner.checkCasing(name, classDeclaration) === false) {
      context.report({
        node: node.id,
        messageId: 'wrongCasing',
        data: {
          name,
          expected: classDeclaration,
          context: 'a class',
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Class Method.
   *
   * Called by the MethodDefinition visitor to enforce casing on class method names. Skips
   * constructors since their name is fixed by the language.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Context}     context     - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Node}        node        - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_ClassMethod} classMethod - Class method.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Returns}
   *
   * @since 0.15.0
   */
  private static checkClassMethod(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Node, classMethod: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_ClassMethod): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Returns {
    // Skip constructors.
    if (node.kind === 'constructor') {
      return;
    }

    if (node.key.type !== 'Identifier') {
      return;
    }

    const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassMethod_Name = node.key.name;

    if (Runner.checkCasing(name, classMethod) === false) {
      context.report({
        node: node.key,
        messageId: 'wrongCasing',
        data: {
          name,
          expected: classMethod,
          context: 'a class method',
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Class Property.
   *
   * Called by the PropertyDefinition visitor to enforce casing on
   * class property names, which defaults to camelCase for instance fields.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Context}       context       - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Node}          node          - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_ClassProperty} classProperty - Class property.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Returns}
   *
   * @since 0.15.0
   */
  private static checkClassProperty(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Node, classProperty: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_ClassProperty): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Returns {
    if (node.key.type !== 'Identifier') {
      return;
    }

    const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckClassProperty_Name = node.key.name;

    if (Runner.checkCasing(name, classProperty) === false) {
      context.report({
        node: node.key,
        messageId: 'wrongCasing',
        data: {
          name,
          expected: classProperty,
          context: 'a class property',
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Enum Declaration.
   *
   * Called by the TSEnumDeclaration visitor to enforce casing on both the enum name and each
   * member name, which default to PascalCase for both.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Context}    context    - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Node}       node       - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Enum}       enumCasing - Enum casing.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_EnumMember} enumMember - Enum member.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Returns}
   *
   * @since 0.15.0
   */
  private static checkEnumDeclaration(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Node, enumCasing: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Enum, enumMember: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_EnumMember): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Returns {
    const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_Name = node.id.name;

    if (Runner.checkCasing(name, enumCasing) === false) {
      context.report({
        node: node.id,
        messageId: 'wrongCasing',
        data: {
          name,
          expected: enumCasing,
          context: 'an enum',
        },
      });
    }

    for (const member of node.members) {
      if (member.id.type === 'Identifier') {
        const memberName: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckEnumDeclaration_MemberName = member.id.name;

        if (Runner.checkCasing(memberName, enumMember) === false) {
          context.report({
            node: member.id,
            messageId: 'wrongCasing',
            data: {
              name: memberName,
              expected: enumMember,
              context: 'an enum member',
            },
          });
        }
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Function Declaration.
   *
   * Called by the FunctionDeclaration visitor. Detects React
   * components by an uppercase first letter and applies PascalCase, else enforces camelCase.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Context}        context              - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Node}           node                 - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Function}       functionCasing       - Function casing.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ReactComponent} reactComponentCasing - React component casing.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Parameter}      parameter            - Parameter.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Returns}
   *
   * @since 0.15.0
   */
  private static checkFunctionDeclaration(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Node, functionCasing: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Function, reactComponentCasing: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ReactComponent, parameter: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Parameter): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Returns {
    if (node.id === null) {
      return;
    }

    const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_Name = node.id.name;

    // React components use PascalCase - detect by uppercase first letter.
    const isUppercaseStart: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_IsUppercaseStart = name.charAt(0) === name.charAt(0).toUpperCase() && name.charAt(0) !== name.charAt(0).toLowerCase();
    const expectedCasing: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ExpectedCasing = (isUppercaseStart === true) ? reactComponentCasing : functionCasing;
    const expectedContext: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckFunctionDeclaration_ExpectedContext = (isUppercaseStart === true) ? 'a React component' : 'a function';

    if (Runner.checkCasing(name, expectedCasing) === false) {
      context.report({
        node: node.id,
        messageId: 'wrongCasing',
        data: {
          name,
          expected: expectedCasing,
          context: expectedContext,
        },
      });
    }

    // Check parameters on function declarations.
    Runner.checkParameter(context, node, parameter);

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Interface Declaration.
   *
   * Called by the TSInterfaceDeclaration visitor to
   * enforce casing on interface names, which defaults to PascalCase.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Context}   context         - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Node}      node            - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Interface} interfaceCasing - Interface casing.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Returns}
   *
   * @since 0.15.0
   */
  private static checkInterfaceDeclaration(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Node, interfaceCasing: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Interface): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Returns {
    const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckInterfaceDeclaration_Name = node.id.name;

    if (Runner.checkCasing(name, interfaceCasing) === false) {
      context.report({
        node: node.id,
        messageId: 'wrongCasing',
        data: {
          name,
          expected: interfaceCasing,
          context: 'an interface',
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Parameter.
   *
   * Shared by function declarations, function expressions, and arrow functions to enforce
   * camelCase on all parameter names.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Context}   context   - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Node}      node      - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Parameter} parameter - Parameter.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Returns}
   *
   * @since 0.15.0
   */
  private static checkParameter(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Node, parameter: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Parameter): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Returns {
    for (const param of node.params) {
      if (param.type === 'Identifier') {
        const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Name = param.name;

        if (Runner.checkCasing(name, parameter) === false) {
          context.report({
            node: param,
            messageId: 'wrongCasing',
            data: {
              name,
              expected: parameter,
              context: 'a parameter',
            },
          });
        }
      }

      // Handle assignment patterns (default params).
      if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') {
        const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckParameter_Name = param.left.name;

        if (Runner.checkCasing(name, parameter) === false) {
          context.report({
            node: param.left,
            messageId: 'wrongCasing',
            data: {
              name,
              expected: parameter,
              context: 'a parameter',
            },
          });
        }
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Type Alias Declaration.
   *
   * Called by the TSTypeAliasDeclaration visitor to
   * enforce casing on type alias names, which defaults to UnderscorePascalCase.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Context}   context   - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Node}      node      - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_TypeAlias} typeAlias - Type alias.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Returns}
   *
   * @since 0.15.0
   */
  private static checkTypeAliasDeclaration(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Node, typeAlias: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_TypeAlias): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Returns {
    const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckTypeAliasDeclaration_Name = node.id.name;

    if (Runner.checkCasing(name, typeAlias) === false) {
      context.report({
        node: node.id,
        messageId: 'wrongCasing',
        data: {
          name,
          expected: typeAlias,
          context: 'a type alias',
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Variable Declarator.
   *
   * Called by the VariableDeclarator visitor. Routes const declarations with immutable
   * values to UPPER_SNAKE_CASE, variables used as constructors to PascalCase,
   * and all others to camelCase.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Context}             context             - Context.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Node}                node                - Node.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Variable}            variable            - Variable.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Constant}            constant            - Constant.
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_ConstructorVariable} constructorVariable - Constructor variable.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Returns}
   *
   * @since 0.15.0
   */
  private static checkVariableDeclarator(context: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Context, node: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Node, variable: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Variable, constant: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Constant, constructorVariable: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_ConstructorVariable): Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Returns {
    if (node.id.type !== 'Identifier') {
      return;
    }

    const name: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Name = node.id.name;
    const parent: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Parent = node.parent;

    if (parent === undefined || parent.type !== 'VariableDeclaration') {
      return;
    }

    // Skip function/arrow assignments - handled by function checks.
    const init: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Init = node.init;

    if (
      init !== null
      && init !== undefined
      && (
        init.type === 'FunctionExpression'
        || init.type === 'ArrowFunctionExpression'
      )
    ) {
      return;
    }

    // Const with immutable value -> constant casing.
    if (parent.kind === 'const' && Runner.isImmutableValue(init) === true) {
      if (Runner.checkCasing(name, constant) === false) {
        // Also accept camelCase for const primitives (allow either).
        if (Runner.checkCasing(name, 'camelCase') === false) {
          context.report({
            node: node.id,
            messageId: 'wrongCasing',
            data: {
              name,
              expected: constant,
              context: 'a constant with an immutable value',
            },
          });
        }
      }

      return;
    }

    // Check if the variable is used as a constructor (callee of a new expression).
    const scope: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Scope = context.sourceCode.getScope(node);
    const scopeVariable: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_ScopeVariable = scope.set.get(name);
    let isConstructor: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_IsConstructor = false;

    if (scopeVariable !== undefined) {
      for (const reference of scopeVariable.references) {
        const ref: Rules_Eslint_Conventions_RequireNamingConvention_Runner_CheckVariableDeclarator_Reference = reference;

        if (
          ref.identifier.parent !== undefined
          && ref.identifier.parent.type === 'NewExpression'
          && ref.identifier.parent.callee === ref.identifier
        ) {
          isConstructor = true;
        }
      }
    }

    if (isConstructor === true) {
      if (Runner.checkCasing(name, constructorVariable) === false) {
        context.report({
          node: node.id,
          messageId: 'wrongCasing',
          data: {
            name,
            expected: constructorVariable,
            context: 'a constructor variable',
          },
        });
      }

      return;
    }

    // All other variables.
    if (Runner.checkCasing(name, variable) === false) {
      context.report({
        node: node.id,
        messageId: 'wrongCasing',
        data: {
          name,
          expected: variable,
          context: 'a variable',
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Is Immutable Value.
   *
   * Used by checkVariableDeclarator to decide whether a const initializer is a primitive
   * literal, negative number, or static template literal.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireNamingConvention_Runner_IsImmutableValue_Node} init - Init.
   *
   * @returns {Rules_Eslint_Conventions_RequireNamingConvention_Runner_IsImmutableValue_Returns}
   *
   * @since 0.15.0
   */
  private static isImmutableValue(init: Rules_Eslint_Conventions_RequireNamingConvention_Runner_IsImmutableValue_Node): Rules_Eslint_Conventions_RequireNamingConvention_Runner_IsImmutableValue_Returns {
    if (init === null || init === undefined) {
      return false;
    }

    // Primitive literals (string, number, boolean).
    if (init.type === 'Literal') {
      return true;
    }

    // Negative numbers (UnaryExpression with - and a numeric literal).
    if (
      init.type === 'UnaryExpression'
      && init.operator === '-'
      && init.argument.type === 'Literal'
      && typeof init.argument.value === 'number'
    ) {
      return true;
    }

    // Template literals with no expressions (static strings).
    if (init.type === 'TemplateLiteral' && init.expressions.length === 0) {
      return true;
    }

    return false;
  }
}
