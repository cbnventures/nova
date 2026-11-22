import SwiftUI

///
/// macOS Root View.
///
/// Arranges the shared feature into a sidebar and detail split view for macOS
/// 13 and later. Older macOS versions use "MacOS_12_RootView" instead.
///
/// - Since: UNRELEASED
///
@available(macOS 13.0, *)
internal struct MacOS_RootView: View {
    ///
    /// macOS Root View - Library.
    ///
    /// - Since: UNRELEASED
    ///
    @EnvironmentObject private var library: SampleLibraryViewModel

    ///
    /// macOS Root View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        NavigationSplitView {
            sidebar
        } detail: {
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
    /// macOS Root View - Sidebar.
    ///
    /// - Since: UNRELEASED
    ///
    private var sidebar: some View {
        List(selection: $library.selectedItemID) {
            Section("Library") {
                ForEach(library.visibleItems) { item in
                    SampleItemRowView(
                        item: item,
                        isFavorite: library.isFavorite(item),
                        showsSummary: library.showsSummaries
                    )
                    .tag(item.id)
                }
            }
        }
        .navigationSplitViewColumnWidth(min: 220, ideal: 260)
        .overlay {
            if library.visibleItems.isEmpty {
                SampleEmptyStateView()
            }
        }
    }

    ///
    /// macOS Root View - Detail.
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
/// macOS Root View Preview.
///
/// - Since: UNRELEASED
///
@available(macOS 13.0, *)
#Preview {
    MacOS_RootView()
        .environmentObject(SampleLibraryViewModel())
        .frame(width: 960, height: 620)
}
