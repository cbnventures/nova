/**
 * App - App.
 *
 * Renders the generated React workspace title.
 * Replace this starter component with application routes and features.
 *
 * @returns {React.JSX.Element}
 *
 * @since 0.0.0
 */
export function App(): React.JSX.Element {
  return (
    <main className="nova-launchpad" data-nova-framework="react">
      <div className="nova-launchpad__shell">
        <header className="nova-launchpad__header">
          <div className="nova-launchpad__brand">
            <svg className="nova-launchpad__mark" aria-hidden="true" viewBox="0 0 1024 1024"><use href="/nova-socials.svg#nova" /></svg>
            <span>Nova</span>
            <span className="nova-launchpad__cross">×</span>
            <span>React + Vite</span>
          </div>
          <a className="nova-launchpad__docs-link" href="https://nova.cbnventures.io/docs/quickstart/" target="_blank" rel="noreferrer">
            Read Nova Docs ↗
          </a>
        </header>
        <div className="nova-launchpad__body">
          <section>
            <h1 className="nova-launchpad__title">
              <span>React</span>
              <span className="nova-launchpad__title-accent">starts here.</span>
            </h1>
            <p className="nova-launchpad__lede">
              A focused React workspace with strict checks, tests, and a clean path from first component to production.
            </p>
            <div className="nova-launchpad__actions">
              <a className="nova-launchpad__primary-link" href="https://react.dev/learn" target="_blank" rel="noreferrer">
                Explore React docs ↗
              </a>
              <span className="nova-launchpad__edit-hint">
                Start in
                {' '}
                <code>src/app.tsx</code>
              </span>
            </div>
          </section>
          <aside className="nova-launchpad__sequence" aria-label="Launch sequence">
            <p className="nova-launchpad__sequence-label">Launch sequence</p>
            <ol className="nova-launchpad__steps">
              <li className="nova-launchpad__step">
                <span className="nova-launchpad__step-number">01</span>
                <div>
                  <strong>Shape the experience</strong>
                  <p>Replace this starter with your first real product experience.</p>
                </div>
              </li>
              <li className="nova-launchpad__step">
                <span className="nova-launchpad__step-number">02</span>
                <div>
                  <strong>Keep the contract</strong>
                  <p>Run the workspace checks while the project takes shape.</p>
                </div>
              </li>
              <li className="nova-launchpad__step">
                <span className="nova-launchpad__step-number">03</span>
                <div>
                  <strong>Ship confidently</strong>
                  <p>Build the same production artifact Nova already validates.</p>
                </div>
              </li>
            </ol>
          </aside>
        </div>
        <footer className="nova-launchpad__footer">
          <span>Generated with Nova</span>
          <nav className="nova-launchpad__socials" aria-label="CBN Ventures social media">
            <a className="nova-launchpad__social-link" href="https://www.facebook.com/cbnventures" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#facebook" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://x.com/cbnventures" target="_blank" rel="noreferrer" aria-label="X">
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#x" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://www.youtube.com/@cbnventures" target="_blank" rel="noreferrer" aria-label="YouTube">
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#youtube" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://www.instagram.com/cbnventures/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#instagram" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://github.com/cbnventures" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#github" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://play.google.com/store/apps/dev?id=6419450160526226105" target="_blank" rel="noreferrer" aria-label="Google Play">
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#google-play" /></svg>
            </a>
            <a className="nova-launchpad__social-link" href="https://www.linkedin.com/company/cbnventures/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg className="nova-launchpad__social-icon" aria-hidden="true"><use href="/nova-socials.svg#linkedin" /></svg>
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
