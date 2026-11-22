import SwiftUI

///
/// Sample Empty State View.
///
/// Explains why the library is empty when the favorites filter hides every
/// item, using only views that exist on every supported platform version.
///
/// - Since: UNRELEASED
///
internal struct SampleEmptyStateView: View {
    ///
    /// Sample Empty State View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "star")
                .font(.system(size: 40))
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)

            Text("No Favorites Yet")
                .font(.title2.weight(.semibold))

            Text("Mark an item as a favorite, or turn off Show Favorites Only in Settings.")
                .font(.body)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

///
/// Sample Empty State View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    SampleEmptyStateView()
}
