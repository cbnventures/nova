package [__ANDROID_APPLICATION_ID__].ui.main

import androidx.annotation.StringRes
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import [__ANDROID_APPLICATION_ID__].R
import [__ANDROID_APPLICATION_ID__].data.DefaultDataRepository
import [__ANDROID_APPLICATION_ID__].theme.[__WORKSPACE_IDENTIFIER__]Theme

/**
 * Android Documentation Link.
 *
 * Keeps the generated launchpad's primary action close to the Android learning
 * path without adding application-specific navigation.
 *
 * @since UNRELEASED
 */
private const val ANDROID_DOCUMENTATION_LINK = "https://developer.android.com/develop/ui/compose/documentation"

/**
 * Nova Documentation Link.
 *
 * Gives the generated application a stable route back to the Nova quickstart.
 *
 * @since UNRELEASED
 */
private const val NOVA_DOCUMENTATION_LINK = "https://nova.cbnventures.io/docs/quickstart/"

/**
 * Main Screen.
 *
 * Connects the generated view model to a polished starting surface while
 * preserving the architecture supplied by Nova's Android template.
 *
 * @param modifier - Modifier.
 * @param viewModel - View model.
 *
 * @since UNRELEASED
 */
@Composable
public fun MainScreen(
    modifier: Modifier = Modifier,
    viewModel: MainScreenViewModel = viewModel { MainScreenViewModel(DefaultDataRepository()) },
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    when (state) {
        MainScreenUiState.Loading -> {
            MainScreenLoading(modifier = modifier)
        }

        is MainScreenUiState.Success -> {
            val stateSuccess = state as MainScreenUiState.Success

            MainScreen(data = stateSuccess.data, modifier = modifier)
        }

        is MainScreenUiState.Error -> {
            val stateError = state as MainScreenUiState.Error

            MainScreenError(message = stateError.throwable.message, modifier = modifier)
        }
    }
}

/**
 * Main Screen - Content.
 *
 * Renders the launchpad independently from the view model so previews and UI
 * tests exercise the same content shown by the application.
 *
 * @param data - Data.
 * @param modifier - Modifier.
 *
 * @since UNRELEASED
 */
@Composable
internal fun MainScreen(data: List<String>, modifier: Modifier = Modifier) {
    val platformName = data.firstOrNull() ?: stringResource(R.string.platform_android)
    val uriHandler = LocalUriHandler.current

    Column(
        modifier =
            modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState()),
    ) {
        MainScreenHeader(
            platformName = platformName,
            onNovaDocumentationClick = {
                uriHandler.openUri(NOVA_DOCUMENTATION_LINK)
            },
        )

        Spacer(modifier = Modifier.height(56.dp))

        BoxWithConstraints(modifier = Modifier.fillMaxWidth()) {
            if (maxWidth >= 760.dp) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(64.dp),
                    verticalAlignment = Alignment.Bottom,
                ) {
                    MainScreenIntroduction(
                        modifier = Modifier.weight(1.15f),
                        onDocumentationClick = {
                            uriHandler.openUri(ANDROID_DOCUMENTATION_LINK)
                        },
                    )

                    MainScreenSequence(modifier = Modifier.weight(0.85f))
                }
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(48.dp)) {
                    MainScreenIntroduction(
                        onDocumentationClick = {
                            uriHandler.openUri(ANDROID_DOCUMENTATION_LINK)
                        },
                    )

                    MainScreenSequence()
                }
            }
        }

        Spacer(modifier = Modifier.height(56.dp))

        MainScreenFooter(onSocialClick = uriHandler::openUri)
    }
}

/**
 * Main Screen - Header.
 *
 * Identifies the Nova and Android pairing while providing a compact route back
 * to Nova's documentation.
 *
 * @param platformName - Platform name.
 * @param onNovaDocumentationClick - On Nova documentation click.
 *
 * @since UNRELEASED
 */
@Composable
private fun MainScreenHeader(
    platformName: String,
    onNovaDocumentationClick: () -> Unit,
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Image(
                modifier = Modifier.size(36.dp),
                painter = painterResource(R.drawable.nova_logo),
                contentDescription = stringResource(R.string.nova_logo_content_description),
            )

            Text(
                text = stringResource(R.string.nova_platform_name, platformName),
                fontWeight = FontWeight.Bold,
                style = MaterialTheme.typography.labelLarge,
            )
        }

        TextButton(onClick = onNovaDocumentationClick) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(stringResource(R.string.read_nova_docs))

                Icon(
                    modifier = Modifier.size(16.dp),
                    painter = painterResource(R.drawable.arrow_up_right),
                    contentDescription = null,
                )
            }
        }
    }
}

/**
 * Main Screen - Introduction.
 *
 * Gives a new project one obvious place to begin and links to the platform's
 * primary Compose documentation without inventing product-specific behavior.
 *
 * @param modifier - Modifier.
 * @param onDocumentationClick - On documentation click.
 *
 * @since UNRELEASED
 */
@Composable
private fun MainScreenIntroduction(
    modifier: Modifier = Modifier,
    onDocumentationClick: () -> Unit,
) {
    Column(modifier = modifier) {
        Text(
            modifier = Modifier.semantics { heading() },
            text = stringResource(R.string.starter_title),
            fontSize = 48.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = (-1.8).sp,
            lineHeight = 50.sp,
        )

        Spacer(modifier = Modifier.height(18.dp))

        Text(
            text = stringResource(R.string.starter_description),
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            lineHeight = 24.sp,
            style = MaterialTheme.typography.bodyLarge,
        )

        Spacer(modifier = Modifier.height(26.dp))

        Button(onClick = onDocumentationClick) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(stringResource(R.string.explore_android_docs))

                Icon(
                    modifier = Modifier.size(16.dp),
                    painter = painterResource(R.drawable.arrow_up_right),
                    contentDescription = null,
                )
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        Text(
            text = stringResource(R.string.starter_edit_hint),
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            style = MaterialTheme.typography.labelMedium,
        )
    }
}

/**
 * Main Screen - Footer.
 *
 * Keeps Nova ownership visible and exposes the same CBN Ventures destinations
 * as the generated web launchpads.
 *
 * @param onSocialClick - On social click.
 *
 * @since UNRELEASED
 */
@Composable
private fun MainScreenFooter(onSocialClick: (String) -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Text(
            text = stringResource(R.string.generated_with_nova),
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            fontWeight = FontWeight.SemiBold,
            letterSpacing = 1.1.sp,
            style = MaterialTheme.typography.labelSmall,
        )

        Row {
            MainScreenSocialLink(
                icon = R.drawable.social_facebook,
                label = R.string.social_facebook,
                url = "https://www.facebook.com/cbnventures",
                onSocialClick = onSocialClick,
            )
            MainScreenSocialLink(
                icon = R.drawable.social_x,
                label = R.string.social_x,
                url = "https://x.com/cbnventures",
                onSocialClick = onSocialClick,
            )
            MainScreenSocialLink(
                icon = R.drawable.social_youtube,
                label = R.string.social_youtube,
                url = "https://www.youtube.com/@cbnventures",
                onSocialClick = onSocialClick,
            )
            MainScreenSocialLink(
                icon = R.drawable.social_instagram,
                label = R.string.social_instagram,
                url = "https://www.instagram.com/cbnventures/",
                onSocialClick = onSocialClick,
            )
            MainScreenSocialLink(
                icon = R.drawable.social_github,
                label = R.string.social_github,
                url = "https://github.com/cbnventures",
                onSocialClick = onSocialClick,
            )
            MainScreenSocialLink(
                icon = R.drawable.social_google_play,
                label = R.string.social_google_play,
                url = "https://play.google.com/store/apps/dev?id=6419450160526226105",
                onSocialClick = onSocialClick,
            )
            MainScreenSocialLink(
                icon = R.drawable.social_linkedin,
                label = R.string.social_linkedin,
                url = "https://www.linkedin.com/company/cbnventures/",
                onSocialClick = onSocialClick,
            )
        }
    }
}

/**
 * Main Screen - Social Link.
 *
 * Renders one accessible social icon and opens its destination through the
 * current platform URI handler.
 *
 * @param icon - Icon.
 * @param label - Label.
 * @param url - URL.
 * @param onSocialClick - On social click.
 *
 * @since UNRELEASED
 */
@Composable
private fun MainScreenSocialLink(
    icon: Int,
    @StringRes label: Int,
    url: String,
    onSocialClick: (String) -> Unit,
) {
    val shape = RoundedCornerShape(12.dp)

    Box(
        modifier =
            Modifier
                .size(48.dp)
                .clickable(
                    role = Role.Button,
                    onClick = { onSocialClick(url) },
                ),
        contentAlignment = Alignment.CenterStart,
    ) {
        Box(
            modifier =
                Modifier
                    .size(36.dp)
                    .clip(shape)
                    .background(MaterialTheme.colorScheme.surfaceContainerHigh)
                    .border(1.dp, MaterialTheme.colorScheme.outlineVariant, shape),
            contentAlignment = Alignment.Center,
        ) {
            Icon(
                modifier = Modifier.size(18.dp),
                painter = painterResource(icon),
                contentDescription = stringResource(label),
                tint = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

/**
 * Main Screen - Sequence.
 *
 * Presents a small launch checklist that remains useful before consumers
 * replace the starter content with their own product experience.
 *
 * @param modifier - Modifier.
 *
 * @since UNRELEASED
 */
@Composable
private fun MainScreenSequence(modifier: Modifier = Modifier) {
    Column(
        modifier =
            modifier
                .clip(RoundedCornerShape(28.dp))
                .background(MaterialTheme.colorScheme.surfaceContainerLow)
                .padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(22.dp),
    ) {
        Text(
            text = stringResource(R.string.launch_sequence),
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            fontWeight = FontWeight.Bold,
            letterSpacing = 1.2.sp,
            style = MaterialTheme.typography.labelSmall,
        )

        MainScreenStep(
            number = R.string.launch_step_one_number,
            title = R.string.launch_step_one_title,
            description = R.string.launch_step_one_description,
        )

        MainScreenStep(
            number = R.string.launch_step_two_number,
            title = R.string.launch_step_two_title,
            description = R.string.launch_step_two_description,
        )

        MainScreenStep(
            number = R.string.launch_step_three_number,
            title = R.string.launch_step_three_title,
            description = R.string.launch_step_three_description,
        )
    }
}

/**
 * Main Screen - Step.
 *
 * Keeps each launch step visually consistent without hiding the generated
 * application's editable copy behind a data abstraction.
 *
 * @param number - Number.
 * @param title - Title.
 * @param description - Description.
 *
 * @since UNRELEASED
 */
@Composable
private fun MainScreenStep(
    @StringRes number: Int,
    @StringRes title: Int,
    @StringRes description: Int,
) {
    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Row(verticalAlignment = Alignment.Top) {
            Text(
                modifier =
                    Modifier
                        .width(34.dp),
                text = stringResource(number),
                color = MaterialTheme.colorScheme.primary,
                fontWeight = FontWeight.Bold,
                style = MaterialTheme.typography.titleMedium,
            )

            Text(
                modifier =
                    Modifier
                        .weight(1f),
                text = stringResource(title),
                fontWeight = FontWeight.SemiBold,
                style = MaterialTheme.typography.titleMedium,
            )
        }

        Text(
            modifier = Modifier.padding(start = 34.dp),
            text = stringResource(description),
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            lineHeight = 20.sp,
            style = MaterialTheme.typography.bodyMedium,
        )
    }
}

/**
 * Main Screen - Loading.
 *
 * Keeps the generated application visually stable while its starter view model
 * resolves the initial data flow.
 *
 * @param modifier - Modifier.
 *
 * @since UNRELEASED
 */
@Composable
private fun MainScreenLoading(modifier: Modifier = Modifier) {
    Box(modifier = modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator()
    }
}

/**
 * Main Screen - Error.
 *
 * Provides a readable fallback if the starter data flow fails before consumers
 * replace it with product-specific error handling.
 *
 * @param message - Message.
 * @param modifier - Modifier.
 *
 * @since UNRELEASED
 */
@Composable
private fun MainScreenError(message: String?, modifier: Modifier = Modifier) {
    Box(modifier = modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text(
            text = message ?: stringResource(R.string.starter_error),
            color = MaterialTheme.colorScheme.error,
            textAlign = TextAlign.Center,
        )
    }
}

/**
 * Main Screen Preview.
 *
 * Shows the same generated launchpad that the application renders at runtime.
 *
 * @since UNRELEASED
 */
@Preview(showBackground = true, widthDp = 390, heightDp = 840)
@Composable
private fun MainScreenPreview() {
    [__WORKSPACE_IDENTIFIER__]Theme {
        Surface {
            MainScreen(
                data = emptyList(),
                modifier = Modifier.padding(20.dp),
            )
        }
    }
}
