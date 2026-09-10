import type {
  Toolkit_VitestSetup_Runner_Register_Returns,
  Toolkit_VitestSetup_Runner_Register_Vitest,
} from '../types/toolkit/vitest-setup.d.ts';

/**
 * Toolkit - Vitest Setup.
 *
 * Registers Nova's shared test-isolation policy against the consumer's live
 * Vitest hooks so every workspace starts and finishes tests consistently.
 *
 * @since 0.26.0
 */
class Runner {
  /**
   * Toolkit - Vitest Setup - Register.
   *
   * Suppresses console and process output, clears stale exit codes before each
   * test, and restores every Vitest mock without owning the runtime.
   *
   * @param {Toolkit_VitestSetup_Runner_Register_Vitest} vitest - Vitest.
   *
   * @returns {Toolkit_VitestSetup_Runner_Register_Returns}
   *
   * @since 0.26.0
   */
  public static register(vitest: Toolkit_VitestSetup_Runner_Register_Vitest): Toolkit_VitestSetup_Runner_Register_Returns {
    vitest.beforeEach(() => {
      vitest['vi'].spyOn(console, 'error').mockImplementation(() => undefined);

      vitest['vi'].spyOn(console, 'info').mockImplementation(() => undefined);

      vitest['vi'].spyOn(console, 'log').mockImplementation(() => undefined);

      vitest['vi'].spyOn(console, 'warn').mockImplementation(() => undefined);

      vitest['vi'].spyOn(process.stdout, 'write').mockImplementation(() => true);

      vitest['vi'].spyOn(process.stderr, 'write').mockImplementation(() => true);

      process.exitCode = undefined;

      return;
    });

    vitest.afterEach(() => {
      vitest['vi'].restoreAllMocks();

      return;
    });

    return;
  }
}

export default Runner;
