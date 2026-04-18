/**
 * Get Swizzle Config - Get Swizzle Config.
 *
 * @since 0.15.0
 */
export type GetSwizzleConfigGetSwizzleConfigComponentActionsEject = 'safe' | 'unsafe' | 'forbidden';

export type GetSwizzleConfigGetSwizzleConfigComponentActionsWrap = 'safe' | 'unsafe' | 'forbidden';

export type GetSwizzleConfigGetSwizzleConfigComponentActions = {
  eject: GetSwizzleConfigGetSwizzleConfigComponentActionsEject;
  wrap: GetSwizzleConfigGetSwizzleConfigComponentActionsWrap;
};

export type GetSwizzleConfigGetSwizzleConfigComponent = {
  actions: GetSwizzleConfigGetSwizzleConfigComponentActions;
};

export type GetSwizzleConfigGetSwizzleConfigComponents = Record<string, GetSwizzleConfigGetSwizzleConfigComponent>;

export type GetSwizzleConfigGetSwizzleConfigReturnsComponents = Record<string, GetSwizzleConfigGetSwizzleConfigComponent>;

export type GetSwizzleConfigGetSwizzleConfigReturns = {
  components: GetSwizzleConfigGetSwizzleConfigReturnsComponents;
};
