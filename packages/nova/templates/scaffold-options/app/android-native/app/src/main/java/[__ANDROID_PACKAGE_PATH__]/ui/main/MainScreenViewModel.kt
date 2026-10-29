package [__ANDROID_APPLICATION_ID__].ui.main

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import [__ANDROID_APPLICATION_ID__].data.DataRepository
import [__ANDROID_APPLICATION_ID__].ui.main.MainScreenUiState.Success
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

/**
 * Main Screen View Model.
 *
 * @param dataRepository - Data repository.
 *
 * @since UNRELEASED
 */
public class MainScreenViewModel(dataRepository: DataRepository) : ViewModel() {
  /**
   * Main Screen View Model - UI State.
   *
   * @since UNRELEASED
   */
  public val uiState: StateFlow<MainScreenUiState> =
    dataRepository.data
      .map<List<String>, MainScreenUiState>(::Success)
      .catch { emit(MainScreenUiState.Error(it)) }
      .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), MainScreenUiState.Loading)
}

/**
 * Main Screen UI State.
 *
 * @since UNRELEASED
 */
public sealed interface MainScreenUiState {
  /**
   * Main Screen UI State - Loading.
   *
   * @since UNRELEASED
   */
  public object Loading : MainScreenUiState

  /**
   * Main Screen UI State - Error.
   *
   * @param throwable - Throwable.
   *
   * @since UNRELEASED
   */
  public data class Error(public val throwable: Throwable) : MainScreenUiState

  /**
   * Main Screen UI State - Success.
   *
   * @param data - Data.
   *
   * @since UNRELEASED
   */
  public data class Success(public val data: List<String>) : MainScreenUiState
}
