import type { Metadata } from 'next';
import type {
  ReactElement,
  ReactNode,
} from 'react';

/**
 * Layout.
 *
 * @since 0.0.0
 */
export type App_Layout_Metadata = Metadata;

/**
 * Layout.
 *
 * @since 0.0.0
 */
export type App_Layout_RootLayout_Props_Children = ReactNode;

export type App_Layout_RootLayout_Props = {
  children: App_Layout_RootLayout_Props_Children;
};

export type App_Layout_RootLayout_Returns = ReactElement;
