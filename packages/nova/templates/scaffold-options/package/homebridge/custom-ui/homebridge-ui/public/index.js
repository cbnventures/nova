window.homebridge.addEventListener('ready', () => {
  const tabButtons = document.querySelectorAll('[data-nova-tab]');
  const tabPanels = document.querySelectorAll('[data-nova-panel]');
  const dropdownButton = document.querySelector('[data-nova-dropdown]');
  const dropdownMenu = document.querySelector('[data-nova-dropdown-menu]');
  const accordionButton = document.querySelector('[data-nova-accordion]');
  const accordionPanel = document.querySelector('[data-nova-accordion-panel]');
  const actionStatus = document.getElementById('nova-homebridge-action-status');
  const customInterface = document.querySelector('[data-nova-custom-interface]');
  const nativeConfiguration = document.querySelector('[data-nova-native-configuration]');
  const openConfigurationButton = document.querySelector('[data-nova-open-configuration]');
  const closeConfigurationButton = document.querySelector('[data-nova-close-configuration]');
  const description = document.getElementById('nova-homebridge-description');
  const title = document.getElementById('nova-homebridge-title');
  const version = document.getElementById('nova-homebridge-version');
  let activeTabName = 'about';

  /**
   * Index - Close Dropdown.
   *
   * Keeps the native Bootstrap menu state synchronized without loading a
   * second Bootstrap JavaScript bundle inside Homebridge's injected shell.
   *
   * @returns {void}
   *
   * @since 0.0.0
   */
  function closeDropdown() {
    if (dropdownButton !== null) {
      dropdownButton.setAttribute('aria-expanded', 'false');
    }

    if (dropdownMenu !== null) {
      dropdownMenu.classList.remove('show');
    }

    return;
  }

  /**
   * Index - Activate Tab.
   *
   * Switches the visible example panel while remembering which tab the custom
   * interface should restore after the native configuration view closes.
   *
   * @param {string} tabName - Tab name.
   *
   * @returns {void}
   *
   * @since 0.0.0
   */
  function activateTab(tabName) {
    activeTabName = tabName;

    tabButtons.forEach((button) => {
      const active = button.getAttribute('data-nova-tab') === tabName;

      button.classList.toggle('active', active);

      button.setAttribute('aria-selected', String(active));

      return;
    });

    tabPanels.forEach((panel) => {
      if (panel.getAttribute('data-nova-panel') === tabName) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }

      return;
    });

    closeDropdown();

    window.homebridge.fixScrollHeight();

    return;
  }

  /**
   * Index - Open Native Configuration.
   *
   * Replaces the custom interface with a minimal return action while
   * Homebridge owns and renders the schema-backed configuration form.
   *
   * @returns {void}
   *
   * @since 0.0.0
   */
  function openNativeConfiguration() {
    closeDropdown();

    if (customInterface !== null) {
      customInterface.setAttribute('hidden', '');
    }

    if (nativeConfiguration !== null) {
      nativeConfiguration.removeAttribute('hidden');
    }

    window.homebridge.showSchemaForm();

    window.homebridge.fixScrollHeight();

    return;
  }

  /**
   * Index - Close Native Configuration.
   *
   * Hides Homebridge's schema form and restores the custom interface at the
   * example tab that was active before the native configuration was opened.
   *
   * @returns {void}
   *
   * @since 0.0.0
   */
  function closeNativeConfiguration() {
    window.homebridge.hideSchemaForm();

    if (nativeConfiguration !== null) {
      nativeConfiguration.setAttribute('hidden', '');
    }

    if (customInterface !== null) {
      customInterface.removeAttribute('hidden');
    }

    activateTab(activeTabName);

    return;
  }

  if (title !== null) {
    title.textContent = window.homebridge.plugin.displayName ?? window.homebridge.plugin.name;
  }

  if (description !== null && window.homebridge.plugin.description !== '') {
    description.textContent = window.homebridge.plugin.description;
  }

  if (version !== null) {
    version.textContent = `v${window.homebridge.plugin.installedVersion}`;
  }

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activateTab(button.getAttribute('data-nova-tab') ?? 'about');

      return;
    });

    return;
  });

  if (openConfigurationButton !== null) {
    openConfigurationButton.addEventListener('click', () => {
      openNativeConfiguration();

      return;
    });
  }

  if (closeConfigurationButton !== null) {
    closeConfigurationButton.addEventListener('click', () => {
      closeNativeConfiguration();

      return;
    });
  }

  if (dropdownButton !== null) {
    dropdownButton.addEventListener('click', (event) => {
      const expanded = dropdownButton.getAttribute('aria-expanded') === 'true';

      event.stopPropagation();

      dropdownButton.setAttribute('aria-expanded', String(expanded === false));

      if (dropdownMenu !== null) {
        dropdownMenu.classList.toggle('show', expanded === false);
      }

      window.homebridge.fixScrollHeight();

      return;
    });
  }

  document.querySelectorAll('[data-nova-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-nova-action') ?? 'Example action';

      if (actionStatus !== null) {
        actionStatus.textContent = `${action} selected.`;
      }

      window.homebridge.toast.info(`${action} is an example and did not change the plugin configuration.`);

      closeDropdown();

      return;
    });

    return;
  });

  document.querySelectorAll('[data-nova-toast]').forEach((button) => {
    button.addEventListener('click', () => {
      window.homebridge.toast.success(button.getAttribute('data-nova-toast') ?? 'Example action selected');

      return;
    });

    return;
  });

  if (accordionButton !== null) {
    accordionButton.addEventListener('click', () => {
      const expanded = accordionButton.getAttribute('aria-expanded') === 'true';

      accordionButton.setAttribute('aria-expanded', String(expanded === false));

      accordionButton.classList.toggle('collapsed', expanded);

      if (accordionPanel !== null) {
        accordionPanel.classList.toggle('show', expanded === false);

        if (expanded === true) {
          accordionPanel.setAttribute('hidden', '');
        } else {
          accordionPanel.removeAttribute('hidden');
        }
      }

      window.homebridge.fixScrollHeight();

      return;
    });
  }

  document.addEventListener('click', () => {
    closeDropdown();

    return;
  });

  window.homebridge.hideSchemaForm();

  activateTab('about');

  return;
});
