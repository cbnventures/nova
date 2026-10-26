# Google Play Screenshots

Create only the official image targets you intend to replace:

```text
android/<locale>/phoneScreenshots/01-name.png
android/<locale>/sevenInchScreenshots/01-name.png
android/<locale>/tenInchScreenshots/01-name.png
android/<locale>/tvScreenshots/01-name.png
android/<locale>/wearScreenshots/01-name.png
```

Names begin with positions `01` through `10`. Nova leaves absent targets untouched and rejects an existing empty target directory.
