package [__ANDROID_APPLICATION_ID__].ui.main

import [__ANDROID_APPLICATION_ID__].data.DataRepository
import junit.framework.TestCase.assertEquals
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.test.runTest
import org.junit.Test

/**
 * Main Screen View Model Test.
 *
 * @since UNRELEASED
 */
public class MainScreenViewModelTest {
  /**
   * Main Screen View Model Test - UI State Initially Loading.
   *
   * @since UNRELEASED
   */
  @Test
  public fun uiState_initiallyLoading() = runTest {
    val viewModel = MainScreenViewModel(FakeMyModelRepository())
    assertEquals(viewModel.uiState.first(), MainScreenUiState.Loading)
  }

  /**
   * Main Screen View Model Test - Saved Item Displayed.
   *
   * @since UNRELEASED
   */
  @Test
  public fun uiState_onItemSaved_isDisplayed() = runTest {
    val viewModel = MainScreenViewModel(FakeMyModelRepository())
    assertEquals(viewModel.uiState.first(), MainScreenUiState.Loading)
  }
}

/**
 * Fake Model Repository.
 *
 * @private
 * @since UNRELEASED
 */
private class FakeMyModelRepository : DataRepository {
  /**
   * Fake Model Repository - Data.
   *
   * @private
   * @since UNRELEASED
   */
  public override val data: Flow<List<String>> = flow { emit(listOf("Sample")) }
}
