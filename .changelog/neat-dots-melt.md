---
package: "@cbnventures/nova"
category: added
bump: minor
---

Validates uniqueness of publish-target destinations across all workflows. Targets that ship to a named destination (e.g., github-action's release branch, aws-amplify-nextjs's app+branch, cloudflare-pages-docusaurus's project) now declare a uniquenessKey in metadata; nova rejects both colliding workflows when two targets anywhere in the config resolve to the same destination.
