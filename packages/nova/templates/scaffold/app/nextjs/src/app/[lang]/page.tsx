import { notFound } from 'next/navigation';

import { hasLocale } from '../../i18n/config';
import { getDictionary } from './dictionaries';

import type {
  App_Lang_Page_Home_Dictionary,
  App_Lang_Page_Home_Params,
  App_Lang_Page_Home_Props,
  App_Lang_Page_Home_Returns,
} from '../../types/app/[lang]/page.d.ts';

/**
 * Page - Home.
 *
 * Renders the generated application landing page from the active locale's
 * server-side dictionary.
 *
 * @param {App_Lang_Page_Home_Props} props - Props.
 *
 * @returns {App_Lang_Page_Home_Returns}
 *
 * @since 0.0.0
 */
async function Home(props: App_Lang_Page_Home_Props): App_Lang_Page_Home_Returns {
  const params: App_Lang_Page_Home_Params = await props['params'];

  if (hasLocale(params['lang']) === false) {
    notFound();
  }

  const dictionary: App_Lang_Page_Home_Dictionary = await getDictionary(params['lang']);

  return (
    <main className="nova-launchpad" data-nova-framework="nextjs">
      <div className="nova-launchpad__shell">
        <header className="nova-launchpad__header">
          <div className="nova-launchpad__brand">
            <svg className="nova-launchpad__mark" aria-hidden="true" viewBox="0 0 1024 1024"><use href="/nova-socials.svg#nova" /></svg>
            <span>{dictionary['brandNova']}</span>
            <span className="nova-launchpad__cross">×</span>
            <span>{dictionary['brandFramework']}</span>
          </div>
          <a className="nova-launchpad__docs-link" href="https://nova.cbnventures.io/docs/quickstart/" target="_blank" rel="noreferrer">
            {dictionary['readNovaDocs']}
          </a>
        </header>
        <div className="nova-launchpad__body">
          <section>
            <h1 className="nova-launchpad__title">
              <span>{dictionary['title']}</span>
              <span className="nova-launchpad__title-accent">{dictionary['titleAccent']}</span>
            </h1>
            <p className="nova-launchpad__lede">
              {dictionary['description']}
            </p>
            <div className="nova-launchpad__actions">
              <a className="nova-launchpad__primary-link" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
                {dictionary['exploreDocs']}
              </a>
              <span className="nova-launchpad__edit-hint">
                {dictionary['editHint']}
                {' '}
                <code>src/app/[lang]/page.tsx</code>
              </span>
            </div>
          </section>
          <aside className="nova-launchpad__sequence" aria-label={dictionary['launchSequence']}>
            <p className="nova-launchpad__sequence-label">{dictionary['launchSequence']}</p>
            <ol className="nova-launchpad__steps">
              <li className="nova-launchpad__step">
                <span className="nova-launchpad__step-number">{dictionary['stepOneNumber']}</span>
                <div>
                  <strong>{dictionary['stepOneTitle']}</strong>
                  <p>{dictionary['stepOneDescription']}</p>
                </div>
              </li>
              <li className="nova-launchpad__step">
                <span className="nova-launchpad__step-number">{dictionary['stepTwoNumber']}</span>
                <div>
                  <strong>{dictionary['stepTwoTitle']}</strong>
                  <p>{dictionary['stepTwoDescription']}</p>
                </div>
              </li>
              <li className="nova-launchpad__step">
                <span className="nova-launchpad__step-number">{dictionary['stepThreeNumber']}</span>
                <div>
                  <strong>{dictionary['stepThreeTitle']}</strong>
                  <p>{dictionary['stepThreeDescription']}</p>
                </div>
              </li>
            </ol>
          </aside>
        </div>
        <footer className="nova-launchpad__footer">
          <span>{dictionary['footerCredit']}</span>
          <nav className="nova-launchpad__socials" aria-label={dictionary['socialLabel']}>
            <a className="nova-launchpad__social-link" href="https://www.facebook.com/cbnventures" target="_blank" rel="noreferrer" aria-label={dictionary['facebook']}>
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#facebook" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://x.com/cbnventures" target="_blank" rel="noreferrer" aria-label={dictionary['x']}>
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#x" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://www.youtube.com/@cbnventures" target="_blank" rel="noreferrer" aria-label={dictionary['youtube']}>
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#youtube" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://www.instagram.com/cbnventures/" target="_blank" rel="noreferrer" aria-label={dictionary['instagram']}>
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#instagram" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://github.com/cbnventures" target="_blank" rel="noreferrer" aria-label={dictionary['github']}>
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#github" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://play.google.com/store/apps/dev?id=6419450160526226105" target="_blank" rel="noreferrer" aria-label={dictionary['googlePlay']}>
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#google-play" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://www.linkedin.com/company/cbnventures/" target="_blank" rel="noreferrer" aria-label={dictionary['linkedin']}>
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#linkedin" /></svg>
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}

export default Home;
