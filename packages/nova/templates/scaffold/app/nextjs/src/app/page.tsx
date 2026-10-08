import type { App_Page_Home_Returns } from '../types/app/page.d.ts';

/**
 * Page - Home.
 *
 * Renders the generated application landing page.
 * Replace this content as the first product routes are introduced.
 *
 * @returns {App_Page_Home_Returns}
 *
 * @since 0.0.0
 */
function Home(): App_Page_Home_Returns {
  return (
    <main>
      <h1>[__PROJECT_SLUG__]</h1>
      <p>Welcome to your Next.js application.</p>
    </main>
  );
}

export default Home;
