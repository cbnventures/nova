import { ESLintUtils } from '@typescript-eslint/utils';

import {
  LIB_REGEX_PATTERN_CASING_CAMEL_CASE,
  LIB_REGEX_PATTERN_CASING_PASCAL_CASE,
  LIB_REGEX_PATTERN_CASING_UPPER_SNAKE_CASE,
} from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintConventionsRequireNamingConventionCheckCasingExpected,
  RulesEslintConventionsRequireNamingConventionCheckCasingName,
  RulesEslintConventionsRequireNamingConventionCheckCasingReturns,
  RulesEslintConventionsRequireNamingConventionCheckClassDeclarationClassDeclaration,
  RulesEslintConventionsRequireNamingConventionCheckClassDeclarationContext,
  RulesEslintConventionsRequireNamingConventionCheckClassDeclarationName,
  RulesEslintConventionsRequireNamingConventionCheckClassDeclarationNode,
  RulesEslintConventionsRequireNamingConventionCheckClassDeclarationReturns,
  RulesEslintConventionsRequireNamingConventionCheckClassMethodClassMethod,
  RulesEslintConventionsRequireNamingConventionCheckClassMethodContext,
  RulesEslintConventionsRequireNamingConventionCheckClassMethodName,
  RulesEslintConventionsRequireNamingConventionCheckClassMethodNode,
  RulesEslintConventionsRequireNamingConventionCheckClassMethodReturns,
  RulesEslintConventionsRequireNamingConventionCheckClassPropertyClassProperty,
  RulesEslintConventionsRequireNamingConventionCheckClassPropertyContext,
  RulesEslintConventionsRequireNamingConventionCheckClassPropertyName,
  RulesEslintConventionsRequireNamingConventionCheckClassPropertyNode,
  RulesEslintConventionsRequireNamingConventionCheckClassPropertyReturns,
  RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationContext,
  RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationEnum,
  RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationEnumMember,
  RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationMemberName,
  RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationName,
  RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationNode,
  RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationReturns,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationContext,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationExpectedCasing,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationExpectedContext,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationFunction,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationIsUppercaseStart,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationName,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationNode,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationParameter,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationReactComponent,
  RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationReturns,
  RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationContext,
  RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationInterface,
  RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationName,
  RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationNode,
  RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationReturns,
  RulesEslintConventionsRequireNamingConventionCheckParameterContext,
  RulesEslintConventionsRequireNamingConventionCheckParameterName,
  RulesEslintConventionsRequireNamingConventionCheckParameterNode,
  RulesEslintConventionsRequireNamingConventionCheckParameterParameter,
  RulesEslintConventionsRequireNamingConventionCheckParameterReturns,
  RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationContext,
  RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationName,
  RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationNode,
  RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationReturns,
  RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationTypeAlias,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorConstant,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorConstructorVariable,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorContext,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorInit,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorIsConstructor,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorName,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorNode,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorParent,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorReference,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorReturns,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorScope,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorScopeVariable,
  RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorVariable,
  RulesEslintConventionsRequireNamingConventionIsImmutableValueNode,
  RulesEslintConventionsRequireNamingConventionIsImmutableValueReturns,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassDeclaration,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassMethod,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassProperty,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsConstant,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsConstructorVariable,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsEnum,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsEnumMember,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsFunction,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsIgnoreFiles,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsInterface,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsParameter,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsReactComponent,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsTypeAlias,
  RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsVariable,
  RulesEslintConventionsRequireNamingConventionRuleOptions,
} from '../../../types/rules/eslint/conventions/require-naming-convention.d.ts';

/**
 * Rules - ESLint - Conventions - Require Naming Convention.
 *
 * Enforces context-aware casing rules across all identifier types: variables, functions,
 * classes, enums, interfaces, type aliases, and parameters.
 *
 * @since 0.15.0
 */
export class RulesEslintConventionsRequireNamingConvention {
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
      classDeclaration: 'PascalCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassDeclaration,
      constructorVariable: 'PascalCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsConstructorVariable,
      classMethod: 'camelCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassMethod,
      classProperty: 'camelCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsClassProperty,
      constant: 'UPPER_SNAKE_CASE' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsConstant,
      enum: 'PascalCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsEnum,
      enumMember: 'PascalCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsEnumMember,
      function: 'camelCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsFunction,
      ignoreFiles: [] as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsIgnoreFiles,
      interface: 'PascalCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsInterface,
      parameter: 'camelCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsParameter,
      reactComponent: 'PascalCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsReactComponent,
      typeAlias: 'PascalCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsTypeAlias,
      variable: 'camelCase' as RulesEslintConventionsRequireNamingConventionRuleDefaultOptionsVariable,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintConventionsRequireNamingConventionRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        VariableDeclarator(node) {
          RulesEslintConventionsRequireNamingConvention.checkVariableDeclarator(context, node, options['variable'], options['constant'], options['constructorVariable']);

          return;
        },
        FunctionDeclaration(node) {
          RulesEslintConventionsRequireNamingConvention.checkFunctionDeclaration(context, node, options['function'], options['reactComponent'], options['parameter']);

          return;
        },
        FunctionExpression(node) {
          RulesEslintConventionsRequireNamingConvention.checkParameter(context, node, options['parameter']);

          return;
        },
        ArrowFunctionExpression(node) {
          RulesEslintConventionsRequireNamingConvention.checkParameter(context, node, options['parameter']);

          return;
        },
        ClassDeclaration(node) {
          RulesEslintConventionsRequireNamingConvention.checkClassDeclaration(context, node, options['classDeclaration']);

          return;
        },
        PropertyDefinition(node) {
          RulesEslintConventionsRequireNamingConvention.checkClassProperty(context, node, options['classProperty']);

          return;
        },
        MethodDefinition(node) {
          RulesEslintConventionsRequireNamingConvention.checkClassMethod(context, node, options['classMethod']);

          return;
        },
        TSTypeAliasDeclaration(node) {
          RulesEslintConventionsRequireNamingConvention.checkTypeAliasDeclaration(context, node, options['typeAlias']);

          return;
        },
        TSInterfaceDeclaration(node) {
          RulesEslintConventionsRequireNamingConvention.checkInterfaceDeclaration(context, node, options['interface']);

          return;
        },
        TSEnumDeclaration(node) {
          RulesEslintConventionsRequireNamingConvention.checkEnumDeclaration(context, node, options['enum'], options['enumMember']);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - Require Naming Convention - Check Casing.
   *
   * Tests a name against camelCase, PascalCase, or
   * UPPER_SNAKE_CASE using regex patterns from the shared lib/regex module.
   *
   * @private
   *
   * @param {RulesEslintConventionsRequireNamingConventionCheckCasingName}     name     - Name.
   * @param {RulesEslintConventionsRequireNamingConventionCheckCasingExpected} expected - Expected.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckCasingReturns}
   *
   * @since 0.15.0
   */
  private static checkCasing(name: RulesEslintConventionsRequireNamingConventionCheckCasingName, expected: RulesEslintConventionsRequireNamingConventionCheckCasingExpected): RulesEslintConventionsRequireNamingConventionCheckCasingReturns {
    if (expected === 'camelCase') {
      // Must start with lowercase, no underscores except leading (for unused vars).
      return LIB_REGEX_PATTERN_CASING_CAMEL_CASE.test(name);
    }

    if (expected === 'PascalCase') {
      return LIB_REGEX_PATTERN_CASING_PASCAL_CASE.test(name);
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
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassDeclarationContext}          context          - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassDeclarationNode}             node             - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassDeclarationClassDeclaration} classDeclaration - Class declaration.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckClassDeclarationReturns}
   *
   * @since 0.15.0
   */
  private static checkClassDeclaration(context: RulesEslintConventionsRequireNamingConventionCheckClassDeclarationContext, node: RulesEslintConventionsRequireNamingConventionCheckClassDeclarationNode, classDeclaration: RulesEslintConventionsRequireNamingConventionCheckClassDeclarationClassDeclaration): RulesEslintConventionsRequireNamingConventionCheckClassDeclarationReturns {
    if (node.id === null) {
      return;
    }

    const name: RulesEslintConventionsRequireNamingConventionCheckClassDeclarationName = node.id.name;

    if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, classDeclaration) === false) {
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
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassMethodContext}     context     - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassMethodNode}        node        - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassMethodClassMethod} classMethod - Class method.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckClassMethodReturns}
   *
   * @since 0.15.0
   */
  private static checkClassMethod(context: RulesEslintConventionsRequireNamingConventionCheckClassMethodContext, node: RulesEslintConventionsRequireNamingConventionCheckClassMethodNode, classMethod: RulesEslintConventionsRequireNamingConventionCheckClassMethodClassMethod): RulesEslintConventionsRequireNamingConventionCheckClassMethodReturns {
    // Skip constructors.
    if (node.kind === 'constructor') {
      return;
    }

    if (node.key.type !== 'Identifier') {
      return;
    }

    const name: RulesEslintConventionsRequireNamingConventionCheckClassMethodName = node.key.name;

    if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, classMethod) === false) {
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
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassPropertyContext}       context       - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassPropertyNode}          node          - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckClassPropertyClassProperty} classProperty - Class property.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckClassPropertyReturns}
   *
   * @since 0.15.0
   */
  private static checkClassProperty(context: RulesEslintConventionsRequireNamingConventionCheckClassPropertyContext, node: RulesEslintConventionsRequireNamingConventionCheckClassPropertyNode, classProperty: RulesEslintConventionsRequireNamingConventionCheckClassPropertyClassProperty): RulesEslintConventionsRequireNamingConventionCheckClassPropertyReturns {
    if (node.key.type !== 'Identifier') {
      return;
    }

    const name: RulesEslintConventionsRequireNamingConventionCheckClassPropertyName = node.key.name;

    if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, classProperty) === false) {
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
   * @param {RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationContext}    context    - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationNode}       node       - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationEnum}       enumCasing - Enum casing.
   * @param {RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationEnumMember} enumMember - Enum member.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationReturns}
   *
   * @since 0.15.0
   */
  private static checkEnumDeclaration(context: RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationContext, node: RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationNode, enumCasing: RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationEnum, enumMember: RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationEnumMember): RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationReturns {
    const name: RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationName = node.id.name;

    if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, enumCasing) === false) {
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
        const memberName: RulesEslintConventionsRequireNamingConventionCheckEnumDeclarationMemberName = member.id.name;

        if (RulesEslintConventionsRequireNamingConvention.checkCasing(memberName, enumMember) === false) {
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
   * @param {RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationContext}        context              - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationNode}           node                 - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationFunction}       functionCasing       - Function casing.
   * @param {RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationReactComponent} reactComponentCasing - React component casing.
   * @param {RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationParameter}      parameter            - Parameter.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationReturns}
   *
   * @since 0.15.0
   */
  private static checkFunctionDeclaration(context: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationContext, node: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationNode, functionCasing: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationFunction, reactComponentCasing: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationReactComponent, parameter: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationParameter): RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationReturns {
    if (node.id === null) {
      return;
    }

    const name: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationName = node.id.name;

    // React components use PascalCase — detect by uppercase first letter.
    const isUppercaseStart: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationIsUppercaseStart = name.charAt(0) === name.charAt(0).toUpperCase() && name.charAt(0) !== name.charAt(0).toLowerCase();
    const expectedCasing: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationExpectedCasing = (isUppercaseStart === true) ? reactComponentCasing : functionCasing;
    const expectedContext: RulesEslintConventionsRequireNamingConventionCheckFunctionDeclarationExpectedContext = (isUppercaseStart === true) ? 'a React component' : 'a function';

    if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, expectedCasing) === false) {
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
    RulesEslintConventionsRequireNamingConvention.checkParameter(context, node, parameter);

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
   * @param {RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationContext}   context         - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationNode}      node            - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationInterface} interfaceCasing - Interface casing.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationReturns}
   *
   * @since 0.15.0
   */
  private static checkInterfaceDeclaration(context: RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationContext, node: RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationNode, interfaceCasing: RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationInterface): RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationReturns {
    const name: RulesEslintConventionsRequireNamingConventionCheckInterfaceDeclarationName = node.id.name;

    if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, interfaceCasing) === false) {
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
   * @param {RulesEslintConventionsRequireNamingConventionCheckParameterContext}   context   - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckParameterNode}      node      - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckParameterParameter} parameter - Parameter.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckParameterReturns}
   *
   * @since 0.15.0
   */
  private static checkParameter(context: RulesEslintConventionsRequireNamingConventionCheckParameterContext, node: RulesEslintConventionsRequireNamingConventionCheckParameterNode, parameter: RulesEslintConventionsRequireNamingConventionCheckParameterParameter): RulesEslintConventionsRequireNamingConventionCheckParameterReturns {
    for (const param of node.params) {
      if (param.type === 'Identifier') {
        const name: RulesEslintConventionsRequireNamingConventionCheckParameterName = param.name;

        if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, parameter) === false) {
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
        const name: RulesEslintConventionsRequireNamingConventionCheckParameterName = param.left.name;

        if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, parameter) === false) {
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
   * enforce casing on type alias names, which defaults to PascalCase.
   *
   * @private
   *
   * @param {RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationContext}   context   - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationNode}      node      - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationTypeAlias} typeAlias - Type alias.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationReturns}
   *
   * @since 0.15.0
   */
  private static checkTypeAliasDeclaration(context: RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationContext, node: RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationNode, typeAlias: RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationTypeAlias): RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationReturns {
    const name: RulesEslintConventionsRequireNamingConventionCheckTypeAliasDeclarationName = node.id.name;

    if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, typeAlias) === false) {
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
   * @param {RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorContext}             context             - Context.
   * @param {RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorNode}                node                - Node.
   * @param {RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorVariable}            variable            - Variable.
   * @param {RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorConstant}            constant            - Constant.
   * @param {RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorConstructorVariable} constructorVariable - Constructor variable.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorReturns}
   *
   * @since 0.15.0
   */
  private static checkVariableDeclarator(context: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorContext, node: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorNode, variable: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorVariable, constant: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorConstant, constructorVariable: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorConstructorVariable): RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorReturns {
    if (node.id.type !== 'Identifier') {
      return;
    }

    const name: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorName = node.id.name;
    const parent: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorParent = node.parent;

    if (parent === undefined || parent.type !== 'VariableDeclaration') {
      return;
    }

    // Skip function/arrow assignments — handled by function checks.
    const init: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorInit = node.init;

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

    // Const with immutable value → constant casing.
    if (parent.kind === 'const' && RulesEslintConventionsRequireNamingConvention.isImmutableValue(init) === true) {
      if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, constant) === false) {
        // Also accept camelCase for const primitives (allow either).
        if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, 'camelCase') === false) {
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
    const scope: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorScope = context.sourceCode.getScope(node);
    const scopeVariable: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorScopeVariable = scope.set.get(name);
    let isConstructor: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorIsConstructor = false;

    if (scopeVariable !== undefined) {
      for (const reference of scopeVariable.references) {
        const ref: RulesEslintConventionsRequireNamingConventionCheckVariableDeclaratorReference = reference;

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
      if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, constructorVariable) === false) {
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
    if (RulesEslintConventionsRequireNamingConvention.checkCasing(name, variable) === false) {
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
   * @param {RulesEslintConventionsRequireNamingConventionIsImmutableValueNode} init - Init.
   *
   * @returns {RulesEslintConventionsRequireNamingConventionIsImmutableValueReturns}
   *
   * @since 0.15.0
   */
  private static isImmutableValue(init: RulesEslintConventionsRequireNamingConventionIsImmutableValueNode): RulesEslintConventionsRequireNamingConventionIsImmutableValueReturns {
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
