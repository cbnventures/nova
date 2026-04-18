---
title: "The Day We Stopped Trusting the Network"
authors: [james]
tags: [philosophy, zero-trust]
---

We spent the first half of our careers building walls. Firewalls, perimeter defenses, gateway appliances — all predicated on a single assumption: the network has an inside and an outside, and the inside is safe.

<!-- truncate -->

That assumption was always wrong. We just did not know it yet.

## The Perimeter That Was Never There

> "The perimeter dissolved years ago. The industry spent a decade pretending it had not."

Enterprise networks in 2015 had a clean topology. Employees connected from offices. Servers lived in data centers. The firewall sat between the two and decided who got in. If you were inside, you were trusted. If you were outside, you were not.

Then remote work happened. Then contractors happened. Then multi-cloud happened. The network stopped having an inside. But the firewalls stayed, guarding a boundary that no longer existed.

## What a Firewall Rule Looks Like

Here is a traditional perimeter rule. It grants access based on source IP — a static fact about where you are, not who you are or what you are doing:

```text title="Traditional firewall rule"
ALLOW src=10.0.0.0/8 dst=api-cluster port=443
DENY  src=* dst=api-cluster port=443
```

If you are on the corporate network, you are in. If your credentials are compromised from inside that range, the attacker is in too. The firewall cannot tell the difference.

## What a Sentinel Policy Looks Like

Here is the same access decision expressed as a Sentinel trust policy. It evaluates continuously, not once:

```text title="trust-policy.grain"
policy "api-access" {
  resource = "api-cluster"
  effect   = "allow"

  conditions {
    device.posture   >= 80
    user.mfa         = true
    network.location = ["office", "vpn"]
    behavior.score   >= 70
  }

  on_failure {
    action = "revoke"
    notify = "security-ops"
  }
}
```

This policy does not care where you are. It cares whether your device is healthy, whether you authenticated with a second factor, whether your behavior is consistent with your history. And it checks every 90 seconds.

:::danger Legacy Perimeter Assumptions
A firewall rule that trusts an IP range trusts every device on that range — compromised or not. Sentinel does not grant trust to a network. It grants trust to a combination of person, device, and context, and it revokes it the moment any of those change.
:::

## Why We Built Sentinel

The founding observation was simple: every VPN is a trust assumption. You authenticate once, and for the duration of the session, the network assumes you are still the same person, on the same device, with the same intent. That assumption is a vulnerability.

We built Sentinel to eliminate it. Not by building a better wall, but by replacing the wall with continuous evaluation. Watchtower checks posture every 90 seconds. Drawbridge adjusts access in real time. Garrison enforces compliance on every endpoint. Rampart segments the network so that even a successful breach cannot spread.

> "Access is not a door you open once. It is a conversation that never ends."

That is the principle. The network is not trusted. The user is not trusted. The device is not trusted. Trust is computed from evidence, re-evaluated continuously, and revoked the moment the evidence changes.

## What Changed

Since deploying Sentinel internally:

- **Credential theft incidents dropped to zero.** Stolen passwords are useless without a compliant device and a passing posture check.
- **Lateral movement became impossible.** Rampart zones mean a compromised service account cannot reach anything outside its segment.
- **Audit preparation went from weeks to hours.** Spyglass maintains a 7-year immutable log. Compliance evidence is always current.

The network is not safe. It was never safe. We stopped pretending and started verifying.

## Start Here

```bash
spark install sentinel-agent
sentinel evaluate --policy production-access
```

Two commands. Continuous trust. Read the [Platform Overview](/docs/platform-overview/) to understand the architecture, or jump to [Your First Policy](/docs/getting-started/your-first-policy/) to write your first trust rule.
