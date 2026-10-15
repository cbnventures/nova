package [__ANDROID_APPLICATION_ID__]

import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.runtime.rememberNavBackStack
import androidx.navigation3.ui.NavDisplay
import [__ANDROID_APPLICATION_ID__].ui.main.MainScreen

/**
 * Main Navigation.
 *
 * Hosts the generated launch screen inside Nova's Android navigation foundation.
 *
 * @since UNRELEASED
 */
@Composable
public fun MainNavigation() {
    val backStack = rememberNavBackStack(Main)

    NavDisplay(
        backStack = backStack,
        onBack = { backStack.removeLastOrNull() },
        entryProvider =
            entryProvider {
                entry<Main> {
                    MainScreen(
                        modifier =
                            Modifier
                                .safeDrawingPadding()
                                .padding(20.dp),
                    )
                }
            },
    )
}
