import { HomebridgePluginUiServer } from '@homebridge/plugin-ui-utils';

/**
 * Server.
 *
 * Provides the backend entry point expected by Homebridge Config UI X. Add
 * request handlers here when the custom setup flow needs server-side work.
 *
 * @since 0.0.0
 */
class [__WORKSPACE_IDENTIFIER__]ConfigUiServer extends HomebridgePluginUiServer {
  /**
   * Server - Constructor.
   *
   * Creates the custom UI backend.
   * Signals readiness after custom request handlers are registered.
   *
   * @since 0.0.0
   */
  public constructor() {
    super();

    this.ready();

    return;
  }
}

void new [__WORKSPACE_IDENTIFIER__]ConfigUiServer();
