import Testing

@testable import [__WORKSPACE_IDENTIFIER__]

///
/// [__WORKSPACE_TITLE__] Tests.
///
/// Covers the shared sample library that every platform folder builds on.
///
/// - Since: UNRELEASED
///
@MainActor
internal struct [__WORKSPACE_IDENTIFIER__]Tests {
    ///
    /// [__WORKSPACE_TITLE__] Tests - Toggle Favorite Adds And Removes.
    ///
    /// - Since: UNRELEASED
    ///
    @Test
    internal func toggleFavoriteAddsAndRemoves() {
        let library = SampleLibraryViewModel()
        let item = SampleItem.samples[0]

        library.toggleFavorite(item)

        #expect(library.isFavorite(item))

        library.toggleFavorite(item)

        #expect(library.isFavorite(item) == false)
    }

    ///
    /// [__WORKSPACE_TITLE__] Tests - Favorites Filter Hides Other Items.
    ///
    /// - Since: UNRELEASED
    ///
    @Test
    internal func favoritesFilterHidesOtherItems() {
        let item = SampleItem.samples[1]
        let library = SampleLibraryViewModel(favoriteItemIDs: [item.id])

        library.showsFavoritesOnly = true

        #expect(library.visibleItems == [item])
    }

    ///
    /// [__WORKSPACE_TITLE__] Tests - Toggle Favorite For Selection.
    ///
    /// - Since: UNRELEASED
    ///
    @Test
    internal func toggleFavoriteForSelection() {
        let library = SampleLibraryViewModel()
        let item = SampleItem.samples[2]

        library.toggleFavoriteForSelection()

        #expect(library.favoriteItemIDs.isEmpty)

        library.selectedItemID = item.id
        library.toggleFavoriteForSelection()

        #expect(library.isFavorite(item))
    }
}
