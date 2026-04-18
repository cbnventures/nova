import type { LibWorkflowTemplatesMetadata } from '../types/lib/workflow-templates.d.ts';

/**
 * Lib - Workflow Templates - Lib Workflow Templates Metadata.
 *
 * Defines metadata for each bundled GitHub Actions workflow
 * template, including variable formats and defaults.
 *
 * @since 0.20.0
 */
export const libWorkflowTemplatesMetadata: LibWorkflowTemplatesMetadata = [
  {
    name: 'check-sponsor-gated-issues',
    description: 'Gate issues by GitHub sponsor status',
    variables: {
      'GITHUB_TOKEN': {
        format: 'secret', default: 'GITHUB_TOKEN', auto: true,
      },
      'PERSONAL_ACCESS_TOKEN': {
        format: 'secret', default: 'PERSONAL_ACCESS_TOKEN',
        description: 'Personal access token with read:org and read:user scopes for sponsor lookups',
      },
      'ISSUE_LABELS': {
        format: 'var', default: 'ISSUE_LABELS',
        description: 'Comma-separated labels to apply when gating issues',
      },
      'ISSUE_LIMIT_COMMENTER': {
        format: 'var', default: 'ISSUE_LIMIT_COMMENTER',
        description: 'Whether to limit comments to the issue opener and repo owners',
      },
      'ISSUE_LOCK_ON_CLOSE': {
        format: 'var', default: 'ISSUE_LOCK_ON_CLOSE',
        description: 'Whether to lock issues when closed',
      },
      'ISSUE_MESSAGE_NOT_SPONSOR': {
        format: 'var', default: 'ISSUE_MESSAGE_NOT_SPONSOR',
        description: 'Message shown to non-sponsors when they open an issue',
      },
      'ISSUE_MESSAGE_WELCOME': {
        format: 'var', default: 'ISSUE_MESSAGE_WELCOME',
        description: 'Welcome message shown to sponsors when they open an issue',
      },
      'IS_ORGANIZATION': {
        format: 'var', default: 'IS_ORGANIZATION',
        description: 'Whether the repository owner is an organization',
      },
      'SPONSOR_ACTIVE_ONLY': {
        format: 'var', default: 'SPONSOR_ACTIVE_ONLY',
        description: 'Whether to require active sponsorship status',
      },
      'SPONSOR_EXEMPT_FILE_LOCATION': {
        format: 'var', default: 'SPONSOR_EXEMPT_FILE_LOCATION',
        description: 'Path to a file listing users exempt from sponsor requirements',
      },
      'SPONSOR_MINIMUM': {
        format: 'var', default: 'SPONSOR_MINIMUM',
        description: 'Minimum monthly sponsorship amount in dollars',
      },
    },
  },
  {
    name: 'lock-inactive-issues',
    description: 'Lock inactive issues and pull requests',
    variables: {
      'GITHUB_TOKEN': {
        format: 'secret', default: 'GITHUB_TOKEN', auto: true,
      },
    },
  },
  {
    name: 'publish-to-aws-amplify-nextjs',
    description: 'Deploy Next.js to AWS Amplify',
    variables: {
      'AWS_ACCESS_KEY_ID': {
        format: 'secret', default: 'AWS_ACCESS_KEY_ID',
        description: 'AWS access key ID for Amplify deployments',
      },
      'AWS_SECRET_ACCESS_KEY': {
        format: 'secret', default: 'AWS_SECRET_ACCESS_KEY',
        description: 'AWS secret access key for Amplify deployments',
      },
      'AMPLIFY_APP_ID': {
        format: 'var', default: 'AMPLIFY_APP_ID',
        description: 'Amplify application ID',
      },
      'AMPLIFY_BRANCH_NAME': {
        format: 'var', default: 'AMPLIFY_BRANCH_NAME',
        description: 'Amplify branch name to deploy to',
      },
      'AWS_REGION': {
        format: 'var', default: 'AWS_REGION',
        description: 'AWS region where the Amplify app is hosted',
      },
    },
  },
  {
    name: 'publish-to-cloudflare-pages-docusaurus',
    description: 'Deploy Docusaurus to Cloudflare Pages',
    variables: {
      'CLOUDFLARE_API_TOKEN': {
        format: 'secret', default: 'CLOUDFLARE_API_TOKEN',
        description: 'Cloudflare API token with Pages deployment permissions',
      },
      'CLOUDFLARE_ACCOUNT_ID': {
        format: 'var', default: 'CLOUDFLARE_ACCOUNT_ID',
        description: 'Cloudflare account ID',
      },
      'CLOUDFLARE_PROJECT_NAME': {
        format: 'var', default: 'CLOUDFLARE_PROJECT_NAME',
        description: 'Cloudflare Pages project name',
      },
      'ROOT_WORKING_DIR': {
        format: 'literal',
        description: 'Relative path to the project root',
        example: './',
      },
      'DOCUSAURUS_WORKING_DIR': {
        format: 'literal',
        description: 'Relative path to the Docusaurus app directory',
        example: './apps/docs',
      },
    },
  },
  {
    name: 'publish-to-docker-hub',
    description: 'Publish Docker images to Docker Hub',
    variables: {
      'DOCKERHUB_TOKEN': {
        format: 'secret', default: 'DOCKERHUB_TOKEN',
        description: 'Docker Hub access token for publishing images',
      },
      'DOCKERHUB_USERNAME': {
        format: 'var', default: 'DOCKERHUB_USERNAME',
        description: 'Docker Hub username or organization name',
      },
    },
  },
  {
    name: 'publish-to-github-packages',
    description: 'Publish packages to GitHub Packages',
    variables: {
      'GITHUB_TOKEN': {
        format: 'secret', default: 'GITHUB_TOKEN', auto: true,
      },
      'ROOT_WORKING_DIR': {
        format: 'literal',
        description: 'Relative path to the project root',
        example: './',
      },
      'NPM_WORKING_DIR': {
        format: 'literal',
        description: 'Relative path to the package directory',
        example: './packages/my-package',
      },
    },
  },
  {
    name: 'publish-to-github-pages-docusaurus',
    description: 'Deploy Docusaurus to GitHub Pages',
    variables: {
      'GITHUB_TOKEN': {
        format: 'secret', default: 'GITHUB_TOKEN', auto: true,
      },
      'ROOT_WORKING_DIR': {
        format: 'literal',
        description: 'Relative path to the project root',
        example: './',
      },
      'DOCUSAURUS_WORKING_DIR': {
        format: 'literal',
        description: 'Relative path to the Docusaurus app directory',
        example: './apps/docs',
      },
    },
  },
  {
    name: 'publish-to-npm',
    description: 'Publish packages to npm with token or OIDC trusted publishing',
    variables: {
      'NPM_TOKEN': {
        format: 'secret', default: 'NPM_TOKEN',
        description: 'npm access token for publishing, leave empty for OIDC trusted publishing',
      },
      'ROOT_WORKING_DIR': {
        format: 'literal',
        description: 'Relative path to the project root',
        example: './',
      },
      'NPM_WORKING_DIR': {
        format: 'literal',
        description: 'Relative path to the package directory',
        example: './packages/my-package',
      },
    },
  },
];
