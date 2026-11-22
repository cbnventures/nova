import SwiftUI

///
/// Sample Item Detail View.
///
/// Shows the full copy for one library entry with a favorite button, and is
/// reused unchanged by every platform's navigation.
///
/// - Since: UNRELEASED
///
internal struct SampleItemDetailView: View {
    ///
    /// Sample Item Detail View - Library.
    ///
    /// - Since: UNRELEASED
    ///
    @EnvironmentObject private var library: SampleLibraryViewModel

    ///
    /// Sample Item Detail View - Item.
    ///
    /// - Since: UNRELEASED
    ///
    private let item: SampleItem

    ///
    /// Sample Item Detail View - Constructor.
    ///
    /// - Parameter item: Item.
    ///
    /// - Since: UNRELEASED
    ///
    internal init(item: SampleItem) {
        self.item = item
    }

    ///
    /// Sample Item Detail View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Image(systemName: item.symbolName)
                    .font(.system(size: 56))
                    .foregroundStyle(.tint)
                    .accessibilityHidden(true)

                VStack(alignment: .leading, spacing: 8) {
                    Text(item.title)
                        .font(.largeTitle.weight(.bold))
                        .accessibilityAddTraits(.isHeader)

                    Text(item.summary)
                        .font(.title3)
                        .foregroundStyle(.secondary)
                }

                Text(item.details)
                    .font(.body)
                    .fixedSize(horizontal: false, vertical: true)

                favoriteButton
            }
            .padding(32)
            .frame(maxWidth: 720, alignment: .leading)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .navigationTitle(item.title)
    }

    ///
    /// Sample Item Detail View - Favorite Button.
    ///
    /// - Since: UNRELEASED
    ///
    private var favoriteButton: some View {
        let isFavorite = library.isFavorite(item)
        let symbolName = (isFavorite) ? "star.fill" : "star"

        return Button {
            library.toggleFavorite(item)
        } label: {
            if isFavorite {
                Label("Remove from Favorites", systemImage: symbolName)
            } else {
                Label("Add to Favorites", systemImage: symbolName)
            }
        }
        .buttonStyle(.bordered)
    }
}

///
/// Sample Item Detail View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    SampleItemDetailView(item: SampleItem.samples[0])
        .environmentObject(SampleLibraryViewModel())
}
