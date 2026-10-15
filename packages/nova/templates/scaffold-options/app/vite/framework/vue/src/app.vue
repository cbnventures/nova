<template>
  <main
    class="nova-launchpad"
    data-nova-framework="vue"
  >
    <div class="nova-launchpad__shell">
      <header class="nova-launchpad__header">
        <div class="nova-launchpad__brand">
          <svg
            class="nova-launchpad__mark"
            aria-hidden="true"
            viewBox="0 0 1024 1024"
          ><use href="/nova-socials.svg#nova" /></svg>
          <span>Nova</span>
          <span class="nova-launchpad__cross">×</span>
          <span>Vue + Vite</span>
        </div>
        <a
          class="nova-launchpad__docs-link"
          href="https://nova.cbnventures.io/docs/quickstart/"
          target="_blank"
          rel="noreferrer"
        >Read Nova Docs ↗</a>
      </header>
      <div class="nova-launchpad__body">
        <section>
          <h1 class="nova-launchpad__title">
            <span>Vue</span>
            <span class="nova-launchpad__title-accent">starts here.</span>
          </h1>
          <p class="nova-launchpad__lede">
            A focused Vue workspace with strict checks, tests, and a clean path from first component to production.
          </p>
          <div class="nova-launchpad__actions">
            <a
              class="nova-launchpad__primary-link"
              href="https://vuejs.org/guide/introduction.html"
              target="_blank"
              rel="noreferrer"
            >
              Explore Vue docs ↗
            </a>
            <span class="nova-launchpad__edit-hint">
              Start in <code>src/app.vue</code>
            </span>
          </div>
        </section>
        <aside
          class="nova-launchpad__sequence"
          aria-label="Launch sequence"
        >
          <p class="nova-launchpad__sequence-label">
            Launch sequence
          </p>
          <ol class="nova-launchpad__steps">
            <li class="nova-launchpad__step">
              <span class="nova-launchpad__step-number">01</span>
              <div>
                <strong>Shape the experience</strong>
                <p>Replace this starter with your first real product experience.</p>
              </div>
            </li>
            <li class="nova-launchpad__step">
              <span class="nova-launchpad__step-number">02</span>
              <div>
                <strong>Keep the contract</strong>
                <p>Run the workspace checks while the project takes shape.</p>
              </div>
            </li>
            <li class="nova-launchpad__step">
              <span class="nova-launchpad__step-number">03</span>
              <div>
                <strong>Ship confidently</strong>
                <p>Build the same production artifact Nova already validates.</p>
              </div>
            </li>
          </ol>
        </aside>
      </div>
      <footer class="nova-launchpad__footer">
        <span>Generated with Nova</span>
        <nav
          class="nova-launchpad__socials"
          aria-label="CBN Ventures social media"
        >
          <a
            class="nova-launchpad__social-link"
            href="https://www.facebook.com/cbnventures"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <svg
              class="nova-launchpad__social-icon"
              aria-hidden="true"
            >
              <use href="/nova-socials.svg#facebook" />
            </svg>
          </a>
          <a
            class="nova-launchpad__social-link"
            href="https://x.com/cbnventures"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
          >
            <svg
              class="nova-launchpad__social-icon"
              aria-hidden="true"
            >
              <use href="/nova-socials.svg#x" />
            </svg>
          </a>
          <a
            class="nova-launchpad__social-link"
            href="https://www.youtube.com/@cbnventures"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <svg
              class="nova-launchpad__social-icon"
              aria-hidden="true"
            >
              <use href="/nova-socials.svg#youtube" />
            </svg>
          </a>
          <a
            class="nova-launchpad__social-link"
            href="https://www.instagram.com/cbnventures/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg
              class="nova-launchpad__social-icon"
              aria-hidden="true"
            >
              <use href="/nova-socials.svg#instagram" />
            </svg>
          </a>
          <a
            class="nova-launchpad__social-link"
            href="https://github.com/cbnventures"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg
              class="nova-launchpad__social-icon"
              aria-hidden="true"
            >
              <use href="/nova-socials.svg#github" />
            </svg>
          </a>
          <a
            class="nova-launchpad__social-link"
            href="https://play.google.com/store/apps/dev?id=6419450160526226105"
            target="_blank"
            rel="noreferrer"
            aria-label="Google Play"
          >
            <svg
              class="nova-launchpad__social-icon"
              aria-hidden="true"
            >
              <use href="/nova-socials.svg#google-play" />
            </svg>
          </a>
          <a
            class="nova-launchpad__social-link"
            href="https://www.linkedin.com/company/cbnventures/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              class="nova-launchpad__social-icon"
              aria-hidden="true"
            >
              <use href="/nova-socials.svg#linkedin" />
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  </main>
</template>
