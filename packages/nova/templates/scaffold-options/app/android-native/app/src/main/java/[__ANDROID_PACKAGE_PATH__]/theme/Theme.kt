package [__ANDROID_APPLICATION_ID__].theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

/**
 * Dark Color Scheme.
 *
 * @private
 * @since UNRELEASED
 */
private val DarkColorScheme = darkColorScheme(primary = Purple80, secondary = PurpleGrey80, tertiary = Pink80)

/**
 * Light Color Scheme.
 *
 * @private
 * @since UNRELEASED
 */
private val LightColorScheme =
  lightColorScheme(
    primary = Purple40,
    secondary = PurpleGrey40,
    tertiary = Pink40,

    /* Other default colors to override
    background = Color(0xFFFFFBFE),
    surface = Color(0xFFFFFBFE),
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Color.White,
    onBackground = Color(0xFF1C1B1F),
    onSurface = Color(0xFF1C1B1F),
    */
  )

/**
 * [__WORKSPACE_TITLE__] Theme.
 *
 * @param darkTheme - Dark theme.
 * @param dynamicColor - Dynamic color.
 * @param content - Content.
 *
 * @since UNRELEASED
 */
@Composable
public fun [__WORKSPACE_IDENTIFIER__]Theme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  // Dynamic color is available on Android 12+
  dynamicColor: Boolean = true,
  content: @Composable () -> Unit,
) {
  val colorScheme =
    when {
      dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
        val context = LocalContext.current
        if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
      }
      darkTheme -> DarkColorScheme
      else -> LightColorScheme
    }

  MaterialTheme(colorScheme = colorScheme, typography = Typography, content = content)
}
