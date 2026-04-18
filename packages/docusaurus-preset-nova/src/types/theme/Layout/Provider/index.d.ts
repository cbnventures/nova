import type { ComponentType, ReactNode } from 'react';

/**
 * Theme - Layout - Provider.
 *
 * @since 0.15.0
 */
export type ThemeLayoutProviderPropsChildren = ReactNode;

export type ThemeLayoutProviderProps = {
  children: ThemeLayoutProviderPropsChildren;
};

/**
 * Theme - Layout - Provider - Layout Provider.
 *
 * @since 0.15.0
 */
export type ThemeLayoutProviderLayoutProviderProviderChildren = ReactNode;

export type ThemeLayoutProviderLayoutProviderProviderProps = {
  children: ThemeLayoutProviderLayoutProviderProviderChildren;
};

export type ThemeLayoutProviderLayoutProviderProvider = ComponentType<ThemeLayoutProviderLayoutProviderProviderProps>;
