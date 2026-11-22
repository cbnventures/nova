import SwiftUI

///
/// tvOS Library View.
///
/// Shows the sample items as a focusable row of cards. The focused card's
/// summary appears below the row, and selecting a card opens its detail.
///
/// - Since: UNRELEASED
///
internal struct tvOS_LibraryView: View {
    ///
    /// tvOS Library View - Library.
    ///
    /// - Since: UNRELEASED
    ///
    @EnvironmentObject private var library: SampleLibraryViewModel

    ///
    /// tvOS Library View - Focused Item ID.
    ///
    /// Follows the Siri Remote focus so the summary panel describes the card
    /// the user is looking at.
    ///
    /// - Since: UNRELEASED
    ///
    @FocusState private var focusedItemID: SampleItem.ID?

    ///
    /// tvOS Library View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        NavigationStack {
            Group {
                if library.visibleItems.isEmpty {
                    SampleEmptyStateView()
                } else {
                    VStack(alignment: .leading, spacing: 48) {
                        cardRow

                        focusedSummary
                    }
                }
            }
            .navigationDestination(for: SampleItem.self) { item in
                SampleItemDetailView(item: item)
            }
        }
    }

    ///
    /// tvOS Library View - Card Row.
    ///
    /// - Since: UNRELEASED
    ///
    private var cardRow: some View {
        ScrollView(.horizontal) {
            LazyHStack(spacing: 48) {
                ForEach(library.visibleItems) { item in
                    NavigationLink(value: item) {
                        card(for: item)
                    }
                    .buttonStyle(.card)
                    .focused($focusedItemID, equals: item.id)
                    .contextMenu {
                        Button {
                            library.toggleFavorite(item)
                        } label: {
                            Label("Toggle Favorite", systemImage: "star")
                        }
                    }
                }
            }
            .padding(.vertical, 40)
        }
        .scrollClipDisabled()
    }

    ///
    /// tvOS Library View - Focused Summary.
    ///
    /// - Since: UNRELEASED
    ///
    @ViewBuilder
    private var focusedSummary: some View {
        let focusedItem = library.visibleItems.first { item in item.id == focusedItemID }

        if let focusedItem = focusedItem {
            VStack(alignment: .leading, spacing: 12) {
                Text(focusedItem.title)
                    .font(.title2.weight(.semibold))

                Text(focusedItem.details)
                    .font(.body)
                    .foregroundStyle(.secondary)
                    .frame(maxWidth: 1_200, alignment: .leading)
            }
        } else {
            Text("Move focus to an item to read about it.")
                .font(.body)
                .foregroundStyle(.secondary)
        }
    }

    ///
    /// tvOS Library View - Card.
    ///
    /// - Parameter item: Item.
    ///
    /// - Returns: The card content for one item.
    ///
    /// - Since: UNRELEASED
    ///
    private func card(for item: SampleItem) -> some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Image(systemName: item.symbolName)
                    .font(.system(size: 48))
                    .foregroundStyle(.tint)
                    .accessibilityHidden(true)

                Spacer()

                if library.isFavorite(item) {
                    Image(systemName: "star.fill")
                        .foregroundStyle(.yellow)
                        .accessibilityLabel("Favorite")
                }
            }

            Spacer(minLength: 0)

            Text(item.title)
                .font(.headline)

            if library.showsSummaries {
                Text(item.summary)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
            }
        }
        .padding(28)
        .frame(width: 360, height: 240, alignment: .leading)
    }
}

///
/// tvOS Library View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    tvOS_LibraryView()
        .environmentObject(SampleLibraryViewModel())
}
