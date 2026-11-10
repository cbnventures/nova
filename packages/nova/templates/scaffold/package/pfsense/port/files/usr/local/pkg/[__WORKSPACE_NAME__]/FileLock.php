<?php

declare(strict_types=1);

namespace PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime;

use RuntimeException;

/**
 * Coordinates package runs with a non-blocking filesystem lock.
 *
 * The open descriptor owns the lock for the process lifetime. A second scheduled
 * or manual run exits without reading state or starting an update.
 *
 * @since UNRELEASED
 */
final class FileLock
{
    /** @var mixed Open lock-file handle while this instance owns the lock. @since UNRELEASED */
    private mixed $handle = null;

    /**
     * Creates a lock coordinator for one package-owned path.
     *
     * @param string $path - Lock file path.
     *
     * @since UNRELEASED
     */
    public function __construct(private readonly string $path)
    {
    }

    /** Releases an owned lock when the instance leaves scope. @since UNRELEASED */
    public function __destruct()
    {
        $this->release();
    }

    /**
     * Attempts to acquire the package lock without waiting.
     *
     * @return bool
     *
     * @throws RuntimeException When the lock file cannot be opened or protected.
     *
     * @since UNRELEASED
     */
    public function acquire(): bool
    {
        if (is_resource($this->handle)) {
            return true;
        }

        $handle = fopen($this->path, 'c');

        if ($handle === false) {
            throw new RuntimeException(gettext('The package lock is unavailable.'));
        }

        if (chmod($this->path, 0600) === false) {
            fclose($handle);

            throw new RuntimeException(gettext('The package lock is unavailable.'));
        }

        if (flock($handle, LOCK_EX | LOCK_NB) === false) {
            fclose($handle);

            return false;
        }

        ftruncate($handle, 0);
        fwrite($handle, (string) getmypid() . PHP_EOL);
        fflush($handle);

        $this->handle = $handle;

        return true;
    }

    /** Releases the current lock and closes its descriptor. @since UNRELEASED */
    public function release(): void
    {
        if (!is_resource($this->handle)) {
            return;
        }

        flock($this->handle, LOCK_UN);
        fclose($this->handle);

        $this->handle = null;
    }
}
