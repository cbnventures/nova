import SwiftUI

///
/// macOS 12 Root View.
///
/// Shows the same sidebar and detail screens as "MacOS_RootView" using
/// "NavigationView", which macOS 12 supports and "NavigationSplitView" does
/// not. The app switches to this view when macOS 13 APIs are unavailable.
///
/// - Since: UNRELEASED
///
internal struct MacOS_12_RootView: View {
    ///
    /// macOS 12 Root View - Library.
    ///
    /// - Since: UNRELEASED
    ///
    @EnvironmentObject private var library: SampleLibraryViewModel

    ///
    /// macOS 12 Root View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        NavigationView {
            sidebar

            detail
        }
        .toolbar {
            ToolbarItem(placement: .navigation) {
                Button {
                    library.selectedItemID = nil
                } label: {
                    Label("Home", systemImage: "house")
                }
                .help("Show Home")
            }
        }
    }

    ///
    /// macOS 12 Root View - Sidebar.
    ///
    /// - Since: UNRELEASED
    ///
    private var sidebar: some View {
        List(selection: $library.selectedItemID) {
            Section {
                ForEach(library.visibleItems) { item in
                    SampleItemRowView(
                        item: item,
                        isFavorite: library.isFavorite(item),
                        showsSummary: library.showsSummaries
                    )
                    .tag(item.id)
                }
            } header: {
                Text("Library")
            }
        }
        .listStyle(.sidebar)
        .frame(minWidth: 220, idealWidth: 260)
        .overlay {
            if library.visibleItems.isEmpty {
                SampleEmptyStateView()
            }
        }
    }

    ///
    /// macOS 12 Root View - Detail.
    ///
    /// Shows the launchpad until an item is selected in the sidebar.
    ///
    /// - Since: UNRELEASED
    ///
    @ViewBuilder
    private var detail: some View {
        if let selectedItem = library.selectedItem {
            SampleItemDetailView(item: selectedItem)
        } else {
            LaunchpadView()
        }
    }
}

///
/// macOS 12 Root View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    MacOS_12_RootView()
        .environmentObject(SampleLibraryViewModel())
        .frame(width: 960, height: 620)
}
