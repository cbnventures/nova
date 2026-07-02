import type {
  Shared_GeneratorRunResult as SharedGeneratorRunResult,
  Shared_NovaConfig as SharedNovaConfig,
  Shared_NovaConfig_Workspaces as SharedNovaConfigWorkspaces,
  Shared_NovaConfigWorkspace as SharedNovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Dotenv as SharedNovaConfigWorkspaceDotenv,
  Shared_NovaConfigWorkspace_Dotenv_Variables as SharedNovaConfigWorkspaceDotenvVariables,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Dotenv - Escape Sample Value.
 *
 * @since 0.20.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Value = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Returns = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_EscapeSampleValue_Result = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Generate For Target.
 *
 * @since 0.20.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options_TargetDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options_Variables = SharedNovaConfigWorkspaceDotenvVariables;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options = {
  targetDirectory: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options_TargetDirectory;
  variables: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options_Variables;
  isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options_IsDryRun;
  isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Options_IsReplaceFile;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Returns = Promise<void>;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TargetDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Variables = SharedNovaConfigWorkspaceDotenvVariables;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Files = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineKeys = Set<string>;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineTemplate = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineTemplateLines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_BaselineKeyMatch = RegExpMatchArray | null;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_EnvLines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_SampleLines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_CustomSection = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_CustomSectionSample = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ExistingEnvPath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ExistingEnv = Map<string, string>;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplateFileName = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TemplatePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_TargetPath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_Content = string | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_AppendSection = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ContentLines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_PreservedLines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_KeyMatch = RegExpMatchArray | null;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_ContentLineKey = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_GenerateForTarget_OriginalLine = string | undefined;

/**
 * CLI - Generate - Must Haves - Dotenv - Is Quote Open.
 *
 * @since 0.20.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Text = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_StartOpen = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Returns = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_InQuote = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_IsQuoteOpen_Escaped = boolean;

/**
 * CLI - Generate - Must Haves - Dotenv - Parse Existing Env.
 *
 * @since 0.20.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_FilePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Returns = Promise<Map<string, string>>;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Existing = Map<string, string>;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Raw = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Lines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_LineIndex = number;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_Line = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_KeyMatch = RegExpMatchArray | null;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_LineKey = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_ValuePortion = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_BlockLines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_IsValueOpen = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseExistingEnv_ContinuationLine = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkingFile = SharedNovaConfig;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspaces = SharedNovaConfigWorkspaces;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_GeneratedCount = number;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkspacePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspace = SharedNovaConfigWorkspace;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Dotenv = SharedNovaConfigWorkspaceDotenv | undefined;
