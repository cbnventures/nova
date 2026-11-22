import SwiftUI

///
/// Sample Item Row View.
///
/// Renders one library entry for lists, sidebars, and cards, with the summary
/// and favorite marker following the shared settings.
///
/// - Since: UNRELEASED
///
internal struct SampleItemRowView: View {
    ///
    /// Sample Item Row View - Item.
    ///
    /// - Since: UNRELEASED
    ///
    private let item: SampleItem

    ///
    /// Sample Item Row View - Is Favorite.
    ///
    /// - Since: UNRELEASED
    ///
    private let isFavorite: Bool

    ///
    /// Sample Item Row View - Shows Summary.
    ///
    /// - Since: UNRELEASED
    ///
    private let showsSummary: Bool

    ///
    /// Sample Item Row View - Constructor.
    ///
    /// - Parameter item: Item.
    /// - Parameter isFavorite: Is favorite.
    /// - Parameter showsSummary: Shows summary.
    ///
    /// - Since: UNRELEASED
    ///
    internal init(item: SampleItem, isFavorite: Bool, showsSummary: Bool) {
        self.item = item
        self.isFavorite = isFavorite
        self.showsSummary = showsSummary
    }

    ///
    /// Sample Item Row View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        HStack(spacing: 12) {
            Image(systemName: item.symbolName)
                .font(.title3)
                .foregroundStyle(.tint)
                .frame(width: 28)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                Text(item.title)
                    .font(.headline)

                if showsSummary {
                    Text(item.summary)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                }
            }

            Spacer(minLength: 8)

            if isFavorite {
                Image(systemName: "star.fill")
                    .foregroundStyle(.yellow)
                    .accessibilityLabel("Favorite")
            }
        }
        .padding(.vertical, 4)
    }
}

///
/// Sample Item Row View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    List {
        SampleItemRowView(item: SampleItem.samples[0], isFavorite: true, showsSummary: true)
        SampleItemRowView(item: SampleItem.samples[1], isFavorite: false, showsSummary: false)
    }
}
