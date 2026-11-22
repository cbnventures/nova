import Combine
import Foundation

///
/// Sample Library View Model.
///
/// Owns the sample library state that every platform root view shares, so
/// selection, favorites, and settings stay in step across iOS, macOS, tvOS,
/// and visionOS.
///
/// - Since: UNRELEASED
///
@MainActor
internal final class SampleLibraryViewModel: ObservableObject {
    ///
    /// Sample Library View Model - Items.
    ///
    /// - Since: UNRELEASED
    ///
    @Published internal private(set) var items: [SampleItem]

    ///
    /// Sample Library View Model - Favorite Item IDs.
    ///
    /// - Since: UNRELEASED
    ///
    @Published internal private(set) var favoriteItemIDs: Set<SampleItem.ID>

    ///
    /// Sample Library View Model - Selected Item ID.
    ///
    /// Drives sidebar and split-view selection on platforms that show the list
    /// and the detail side by side.
    ///
    /// - Since: UNRELEASED
    ///
    @Published internal var selectedItemID: SampleItem.ID?

    ///
    /// Sample Library View Model - Shows Favorites Only.
    ///
    /// - Since: UNRELEASED
    ///
    @Published internal var showsFavoritesOnly: Bool

    ///
    /// Sample Library View Model - Shows Summaries.
    ///
    /// - Since: UNRELEASED
    ///
    @Published internal var showsSummaries: Bool

    ///
    /// Sample Library View Model - Constructor.
    ///
    /// - Parameter items: Items.
    /// - Parameter favoriteItemIDs: Favorite item IDs.
    ///
    /// - Since: UNRELEASED
    ///
    internal init(items: [SampleItem] = SampleItem.samples, favoriteItemIDs: Set<SampleItem.ID> = []) {
        self.items = items
        self.favoriteItemIDs = favoriteItemIDs
        selectedItemID = nil
        showsFavoritesOnly = false
        showsSummaries = true
    }

    ///
    /// Sample Library View Model - Visible Items.
    ///
    /// Applies the favorites filter from the settings screen.
    ///
    /// - Since: UNRELEASED
    ///
    internal var visibleItems: [SampleItem] {
        guard showsFavoritesOnly else {
            return items
        }

        return items.filter { item in favoriteItemIDs.contains(item.id) }
    }

    ///
    /// Sample Library View Model - Selected Item.
    ///
    /// - Since: UNRELEASED
    ///
    internal var selectedItem: SampleItem? {
        guard let selectedItemID = selectedItemID else {
            return nil
        }

        return items.first { item in item.id == selectedItemID }
    }

    ///
    /// Sample Library View Model - Is Favorite.
    ///
    /// - Parameter item: Item.
    ///
    /// - Returns: Whether the item is marked as a favorite.
    ///
    /// - Since: UNRELEASED
    ///
    internal func isFavorite(_ item: SampleItem) -> Bool {
        favoriteItemIDs.contains(item.id)
    }

    ///
    /// Sample Library View Model - Toggle Favorite.
    ///
    /// - Parameter item: Item.
    ///
    /// - Since: UNRELEASED
    ///
    internal func toggleFavorite(_ item: SampleItem) {
        if favoriteItemIDs.contains(item.id) {
            favoriteItemIDs.remove(item.id)
        } else {
            favoriteItemIDs.insert(item.id)
        }
    }

    ///
    /// Sample Library View Model - Toggle Favorite For Selection.
    ///
    /// Lets menu commands and ornaments act on whichever item is selected.
    ///
    /// - Since: UNRELEASED
    ///
    internal func toggleFavoriteForSelection() {
        guard let selectedItem = selectedItem else {
            return
        }

        toggleFavorite(selectedItem)
    }
}
