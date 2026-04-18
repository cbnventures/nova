---
title: "We Traced a Viral Campaign to a Single Link in a Tuesday Newsletter"
authors: [amara]
tags: [attribution, case-study, prism]
---

We ran a product launch across four channels — social, paid search, email, and retargeting. On day twelve, conversions spiked 40%. We traced the spike to a single Beacon link. It was embedded in a Tuesday newsletter that nobody on the marketing team had flagged as important.

<!-- truncate -->

## The Spike Nobody Planned

Our conversion dashboard looked normal for eleven days. Steady growth, predictable patterns, the kind of curve you show in a quarterly report without flinching. Then day twelve happened. Conversions jumped 40% in a single afternoon.

The paid search team took credit first. Then the social team. Then someone suggested it was the retargeting pixels finally kicking in. Everyone had a theory. Nobody had evidence.

## What Prism Found

We ran the Prism attribution path for every conversion on day twelve. The results were unambiguous:

```json title="Prism attribution summary — Day 12"
{
  "date": "2025-02-12",
  "conversions": 142,
  "dominantTouchpoint": {
    "channel": "email",
    "campaign": "product-launch",
    "variant": "newsletter-sidebar",
    "beacon": "bcn_01J9K8M3N4P5Q6R7S8T9U0V1",
    "appearanceRate": 0.87
  }
}
```

Eighty-seven percent of the day's conversions had a single Beacon link in their attribution path: a sidebar link in the Tuesday newsletter. Not the hero image. Not the CTA button. A sidebar link that read "See what changed" in twelve-point type.

## The Full Touchpoint Table

Prism reconstructed the complete attribution path for the median converter on day twelve:

| Order | Channel     | Variant            | Days Before Conversion | Weight |
|-------|-------------|--------------------|------------------------|--------|
| 1     | Social      | og-card            | 11                     | 0.06   |
| 2     | Paid search | brand-terms        | 8                      | 0.09   |
| 3     | Email       | newsletter-sidebar | 0                      | 0.52   |
| 4     | Retargeting | banner-300x250     | 0                      | 0.33   |

The newsletter link carried 52% of the attribution weight under Prism's decay model with a 7-day half-life. The social post from eleven days earlier — the one the social team took credit for — carried 6%.

## Why This Matters

The interesting finding is not that email performed well. It is that the specific link that drove conversions was not the one anyone designed to perform well. It was a sidebar afterthought.

Attribution reveals the patterns you did not design. That is the entire point. If we had relied on last-click attribution, the retargeting banner would have received 100% credit. If we had relied on first-click, the social post would have. Both would have been wrong.

:::tip
Set up Pulse alerts for anomalous traffic patterns. If we had configured a Pulse alert for conversion spikes exceeding 25% above the rolling average, we would have caught this within minutes instead of discovering it in a post-mortem.
:::

## The Takeaway

We did not plan for a Tuesday newsletter sidebar link to drive 40% of our conversions. But Signal traced it, Prism weighted it, and now we know. The next campaign has a very different email strategy — and a much more intentional sidebar.

Find the signal. It is rarely where you expect it.
