import type { Lib_EnvStatus_LibEnvStatus_StatusEntry } from './env-status.d.ts';

/**
 * Lib - Env Reconcile - Lib Env Reconcile.
 *
 * @since 0.21.0
 */
export type Lib_EnvReconcile_LibEnvReconcile_PlanResultCreate = string[];

export type Lib_EnvReconcile_LibEnvReconcile_PlanResultDelete = string[];

export type Lib_EnvReconcile_LibEnvReconcile_PlanResultRestore = string[];

export type Lib_EnvReconcile_LibEnvReconcile_PlanResult = {
  create: Lib_EnvReconcile_LibEnvReconcile_PlanResultCreate;
  delete: Lib_EnvReconcile_LibEnvReconcile_PlanResultDelete;
  restore: Lib_EnvReconcile_LibEnvReconcile_PlanResultRestore;
};

export type Lib_EnvReconcile_LibEnvReconcile_Plan = (status: Lib_EnvStatus_LibEnvStatus_StatusEntry[]) => Lib_EnvReconcile_LibEnvReconcile_PlanResult;

export type Lib_EnvReconcile_LibEnvReconcile_SecretByName = {
  [key: string]: boolean;
};

export type Lib_EnvReconcile_LibEnvReconcile_Confirm = (plan: Lib_EnvReconcile_LibEnvReconcile_PlanResult) => Promise<boolean>;

export type Lib_EnvReconcile_LibEnvReconcile_ApplyResultAvailable = boolean;

export type Lib_EnvReconcile_LibEnvReconcile_ApplyResultDone = string[];

export type Lib_EnvReconcile_LibEnvReconcile_ApplyResultRemaining = string[];

export type Lib_EnvReconcile_LibEnvReconcile_ApplyResult = {
  available: Lib_EnvReconcile_LibEnvReconcile_ApplyResultAvailable;
  done: Lib_EnvReconcile_LibEnvReconcile_ApplyResultDone;
  remaining: Lib_EnvReconcile_LibEnvReconcile_ApplyResultRemaining;
};

export type Lib_EnvReconcile_LibEnvReconcile_Apply = (plan: Lib_EnvReconcile_LibEnvReconcile_PlanResult, secretByName: Lib_EnvReconcile_LibEnvReconcile_SecretByName, confirm: Lib_EnvReconcile_LibEnvReconcile_Confirm) => Promise<Lib_EnvReconcile_LibEnvReconcile_ApplyResult>;

export type Lib_EnvReconcile_LibEnvReconcile = {
  plan: Lib_EnvReconcile_LibEnvReconcile_Plan;
  apply: Lib_EnvReconcile_LibEnvReconcile_Apply;
};

export type Lib_EnvReconcile_Create = string[];

export type Lib_EnvReconcile_Removals = string[];

export type Lib_EnvReconcile_Restore = string[];

export type Lib_EnvReconcile_Changes = string[];

export type Lib_EnvReconcile_Done = string[];

export type Lib_EnvReconcile_Remaining = string[];

export type Lib_EnvReconcile_Confirmed = boolean;

export type Lib_EnvReconcile_Created = boolean;

export type Lib_EnvReconcile_Removed = boolean;

export type Lib_EnvReconcile_Restored = boolean;

export type Lib_EnvReconcile_IntendedSecret = boolean;

export type Lib_EnvReconcile_RestoreDeleted = boolean;

export type Lib_EnvReconcile_RestoreCreated = boolean;
