import { libEnvGithub } from './env-github.js';

import type {
  Lib_EnvReconcile_Changes,
  Lib_EnvReconcile_Confirmed,
  Lib_EnvReconcile_Create,
  Lib_EnvReconcile_Created,
  Lib_EnvReconcile_Done,
  Lib_EnvReconcile_IntendedSecret,
  Lib_EnvReconcile_LibEnvReconcile,
  Lib_EnvReconcile_Remaining,
  Lib_EnvReconcile_Removals,
  Lib_EnvReconcile_Removed,
  Lib_EnvReconcile_Restore,
  Lib_EnvReconcile_RestoreCreated,
  Lib_EnvReconcile_Restored,
  Lib_EnvReconcile_RestoreDeleted,
} from '../types/lib/env-reconcile.d.ts';

/**
 * Lib - Env Reconcile - Lib Env Reconcile.
 *
 * Turns a status classification into a create, delete, and restore plan and applies it
 * through the gh-backed name channel so missing keys are stubbed, stale keys are deleted,
 * and type-mismatched keys restored, gated by a confirm reporting done-versus-remaining.
 *
 * @since 0.21.0
 */
export const libEnvReconcile: Lib_EnvReconcile_LibEnvReconcile = {
  plan: (status) => {
    const create: Lib_EnvReconcile_Create = [];
    const removals: Lib_EnvReconcile_Removals = [];
    const restore: Lib_EnvReconcile_Restore = [];

    // Missing keys are created, stale keys are deleted, and type-mismatched keys are
    // restored. Declared, empty-bake, optional-absent, and unmanaged keys are never
    // touched, so an optional credential legitimately absent (an OIDC repo's NPM_TOKEN)
    // is never auto-created and an unmanaged key under no Nova prefix is never deleted.
    for (const entry of status) {
      if (entry['state'] === 'missing') {
        create.push(entry['name']);
      } else if (entry['state'] === 'stale') {
        removals.push(entry['name']);
      } else if (entry['state'] === 'type-mismatch') {
        restore.push(entry['name']);
      }
    }

    return {
      create,
      delete: removals,
      restore,
    };
  },
  apply: async (plan, secretByName, confirm) => {
    const changes: Lib_EnvReconcile_Changes = [
      ...plan['create'],
      ...plan['delete'],
      ...plan['restore'],
    ];
    const done: Lib_EnvReconcile_Done = [];
    const remaining: Lib_EnvReconcile_Remaining = [];

    // Nothing to reconcile, so never reach for gh at all.
    if (changes.length === 0) {
      return {
        available: true,
        done,
        remaining,
      };
    }

    // gh missing or unauthenticated is not a failure to retry per name; surface it as a
    // friendly short-circuit that still carries the full change list.
    if ((await libEnvGithub.read())['available'] === false) {
      return {
        available: false,
        done,
        remaining: changes,
      };
    }

    // The confirm callback gates the whole batch; a decline applies nothing.
    const confirmed: Lib_EnvReconcile_Confirmed = await confirm(plan);

    if (confirmed !== true) {
      return {
        available: true,
        done,
        remaining: changes,
      };
    }

    // Create each missing key as a stub of its intended kind.
    for (const createName of plan['create']) {
      let created: Lib_EnvReconcile_Created = false;

      try {
        created = await libEnvGithub.createStub(createName, secretByName[createName] === true);
      } catch {
        created = false;
      }

      if (created === true) {
        done.push(createName);
      } else {
        remaining.push(createName);
      }
    }

    // Delete each stale key under the kind it is currently stored as.
    for (const deleteName of plan['delete']) {
      let removed: Lib_EnvReconcile_Removed = false;

      try {
        removed = await libEnvGithub.delete(deleteName, secretByName[deleteName] === true);
      } catch {
        removed = false;
      }

      if (removed === true) {
        done.push(deleteName);
      } else {
        remaining.push(deleteName);
      }
    }

    // Restore each type-mismatched key: drop the wrongly-stored entry (the opposite of the
    // intended kind) then recreate it as the intended kind.
    for (const restoreName of plan['restore']) {
      let restored: Lib_EnvReconcile_Restored = false;

      try {
        const intendedSecret: Lib_EnvReconcile_IntendedSecret = secretByName[restoreName] === true;
        const restoreDeleted: Lib_EnvReconcile_RestoreDeleted = await libEnvGithub.delete(restoreName, intendedSecret === false);
        const restoreCreated: Lib_EnvReconcile_RestoreCreated = await libEnvGithub.createStub(restoreName, intendedSecret);

        restored = restoreDeleted === true && restoreCreated === true;
      } catch {
        restored = false;
      }

      if (restored === true) {
        done.push(restoreName);
      } else {
        remaining.push(restoreName);
      }
    }

    return {
      available: true,
      done,
      remaining,
    };
  },
};
