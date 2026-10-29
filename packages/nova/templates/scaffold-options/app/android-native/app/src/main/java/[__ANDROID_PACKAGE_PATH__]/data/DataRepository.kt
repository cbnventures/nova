package [__ANDROID_APPLICATION_ID__].data

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/**
 * Data Repository.
 *
 * Defines the starter data source consumed by the generated launch screen.
 *
 * @since UNRELEASED
 */
public interface DataRepository {
  /**
   * Data Repository - Data.
   *
   * @since UNRELEASED
   */
  public val data: Flow<List<String>>
}

/**
 * Default Data Repository.
 *
 * Supplies starter data until the generated project adopts a real data source.
 *
 * @since UNRELEASED
 */
public class DefaultDataRepository : DataRepository {
  /**
   * Default Data Repository - Data.
   *
   * @since UNRELEASED
   */
  public override val data: Flow<List<String>> = flow { emit(listOf("Android")) }
}
