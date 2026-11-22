import SwiftUI

///
/// visionOS Library View.
///
/// Shows the sample items in a split view. A bottom ornament holds the
/// favorite and settings controls, and settings open in their own window.
///
/// - Since: UNRELEASED
///
internal struct VisionOS_LibraryView: View {
    ///
    /// visionOS Library View - Library.
    ///
    /// - Since: UNRELEASED
    ///
    @EnvironmentObject private var library: SampleLibraryViewModel

    ///
    /// visionOS Library View - Open Window.
    ///
    /// - Since: UNRELEASED
    ///
    @Environment(\.openWindow) private var openWindow

    ///
    /// visionOS Library View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        NavigationSplitView {
            List(library.visibleItems, selection: $library.selectedItemID) { item in
                SampleItemRowView(
                    item: item,
                    isFavorite: library.isFavorite(item),
                    showsSummary: library.showsSummaries
                )
                .tag(item.id)
            }
            .navigationTitle("Library")
            .overlay {
                if library.visibleItems.isEmpty {
                    SampleEmptyStateView()
                }
            }
        } detail: {
            detail
        }
        .ornament(attachmentAnchor: .scene(.bottom)) {
            ornamentControls
        }
    }

    ///
    /// visionOS Library View - Detail.
    ///
    /// - Since: UNRELEASED
    ///
    @ViewBuilder
    private var detail: some View {
        if let selectedItem = library.selectedItem {
            SampleItemDetailView(item: selectedItem)
        } else {
            Text("Select an item to see its details.")
                .font(.title3)
                .foregroundStyle(.secondary)
        }
    }

    ///
    /// visionOS Library View - Ornament Controls.
    ///
    /// - Since: UNRELEASED
    ///
    private var ornamentControls: some View {
        HStack(spacing: 12) {
            Button {
                library.toggleFavoriteForSelection()
            } label: {
                Label("Toggle Favorite", systemImage: "star")
            }
            .disabled(library.selectedItem == nil)

            Button {
                openWindow(id: VisionOS_SettingsWindow.windowID)
            } label: {
                Label("Settings", systemImage: "gearshape")
            }
        }
        .labelStyle(.iconOnly)
        .padding(12)
        .glassBackgroundEffect()
    }
}

///
/// visionOS Library View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    VisionOS_LibraryView()
        .environmentObject(SampleLibraryViewModel())
}
