# Google Play Graphic Assets

Create only the official image targets you intend to replace:

```text
android/<locale>/featureGraphic/feature.png
android/<locale>/icon/icon.png
android/<locale>/promoGraphic/promo.png
android/<locale>/tvBanner/banner.png
```

Each target accepts one PNG or JPEG. Nova leaves absent targets untouched and rejects an existing empty target directory.
