import SwiftUI

///
/// iOS Library View.
///
/// Lists the sample items in a navigation stack, with swipe actions for
/// favorites and a push transition into the shared detail screen.
///
/// - Since: UNRELEASED
///
internal struct iOS_LibraryView: View {
    ///
    /// iOS Library View - Library.
    ///
    /// - Since: UNRELEASED
    ///
    @EnvironmentObject private var library: SampleLibraryViewModel

    ///
    /// iOS Library View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        NavigationStack {
            Group {
                if library.visibleItems.isEmpty {
                    SampleEmptyStateView()
                } else {
                    itemList
                }
            }
            .navigationTitle("Library")
            .navigationDestination(for: SampleItem.self) { item in
                SampleItemDetailView(item: item)
            }
        }
    }

    ///
    /// iOS Library View - Item List.
    ///
    /// - Since: UNRELEASED
    ///
    private var itemList: some View {
        List(library.visibleItems) { item in
            NavigationLink(value: item) {
                SampleItemRowView(
                    item: item,
                    isFavorite: library.isFavorite(item),
                    showsSummary: library.showsSummaries
                )
            }
            .swipeActions(edge: .trailing) {
                Button {
                    library.toggleFavorite(item)
                } label: {
                    Label("Favorite", systemImage: "star")
                }
                .tint(.yellow)
            }
        }
    }
}

///
/// iOS Library View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    iOS_LibraryView()
        .environmentObject(SampleLibraryViewModel())
}
