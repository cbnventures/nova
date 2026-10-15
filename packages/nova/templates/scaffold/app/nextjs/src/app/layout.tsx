import '../styles/nova-launchpad.css';
import './globals.css';

import type {
  App_Layout_Metadata,
  App_Layout_RootLayout_Props,
  App_Layout_RootLayout_Returns,
} from '../types/app/layout.d.ts';

/**
 * Layout - Metadata.
 *
 * Provides the starter title and description consumed by Next.js.
 * Consumers can extend this object as the application identity grows.
 *
 * @since 0.0.0
 */
export const metadata: App_Layout_Metadata = {
  title: 'Nova × Next.js',
  description: 'A Nova-managed Next.js application',
  icons: {
    icon: '/favicon.svg',
  },
};

/**
 * Layout - Root Layout.
 *
 * Wraps every generated application route in the shared HTML document.
 * This is the root layout required by the Next.js App Router.
 *
 * @param {App_Layout_RootLayout_Props} props - Props.
 *
 * @returns {App_Layout_RootLayout_Returns}
 *
 * @since 0.0.0
 */
function RootLayout(props: App_Layout_RootLayout_Props): App_Layout_RootLayout_Returns {
  return (
    <html lang="en">
      <body>{props['children']}</body>
    </html>
  );
}

export default RootLayout;
