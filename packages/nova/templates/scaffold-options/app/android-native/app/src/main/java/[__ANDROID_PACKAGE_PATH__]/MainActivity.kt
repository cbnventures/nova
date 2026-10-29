package [__ANDROID_APPLICATION_ID__]

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import [__ANDROID_APPLICATION_ID__].theme.[__WORKSPACE_IDENTIFIER__]Theme

/**
 * Main Activity.
 *
 * Hosts the generated Compose application.
 *
 * @since UNRELEASED
 */
public class MainActivity : ComponentActivity() {
    /**
     * Main Activity - On Create.
     *
     * @param savedInstanceState - Saved instance state.
     *
     * @since UNRELEASED
     */
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        enableEdgeToEdge()
        setContent {
            [__WORKSPACE_IDENTIFIER__]Theme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background,
                ) {
                    MainNavigation()
                }
            }
        }
    }
}
