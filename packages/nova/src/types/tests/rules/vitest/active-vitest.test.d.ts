import type {
  Shared_ActiveVitest,
  Shared_ActiveVitest_Factory,
} from '../../../shared.d.ts';

/**
 * Tests - Rules - Vitest - Active Vitest - Active Vitest - Drives Describe And It Through The Injected Namespace.
 *
 * @since 0.21.0
 */
export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Calls = string[];

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_CapturedFactories_Item = () => void | Promise<void>;

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_CapturedFactories = Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_CapturedFactories_Item[];

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Sentinel_Describe = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Sentinel_It = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Sentinel = {
  describe: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Sentinel_Describe;
  it: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Sentinel_It;
};

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_FixtureRoot = string;

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Factory = Shared_ActiveVitest_Factory | undefined;

/**
 * Tests - Rules - Vitest - Active Vitest - Active Vitest - Returns The Same Namespace That Was Set.
 *
 * @since 0.21.0
 */
export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ReturnsTheSameNamespaceThatWasSet_IsSame = boolean;

/**
 * Tests - Rules - Vitest - Active Vitest - Active Vitest - Throws When A Different Vitest Namespace Is Set.
 *
 * @since 0.21.0
 */
export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenADifferentVitestNamespaceIsSet_Other_Describe = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenADifferentVitestNamespaceIsSet_Other_It = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenADifferentVitestNamespaceIsSet_Other = {
  describe: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenADifferentVitestNamespaceIsSet_Other_Describe;
  it: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenADifferentVitestNamespaceIsSet_Other_It;
};

/**
 * Tests - Rules - Vitest - Active Vitest - Active Vitest - Throws When No Vitest Namespace Has Been Set.
 *
 * @since 0.21.0
 */
export type Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenNoVitestNamespaceHasBeenSet_Getter = () => Shared_ActiveVitest;
