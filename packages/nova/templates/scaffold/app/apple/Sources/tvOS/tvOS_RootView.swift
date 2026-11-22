import SwiftUI

///
/// tvOS Root View.
///
/// Arranges the shared feature into the top tab bar that Apple TV users move
/// through with the Siri Remote.
///
/// - Since: UNRELEASED
///
internal struct tvOS_RootView: View {
    ///
    /// tvOS Root View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        TabView {
            LaunchpadView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }

            tvOS_LibraryView()
                .tabItem {
                    Label("Library", systemImage: "books.vertical")
                }

            NavigationStack {
                SampleSettingsForm()
                    .frame(maxWidth: 1_000)
            }
            .tabItem {
                Label("Settings", systemImage: "gearshape")
            }
        }
    }
}

///
/// tvOS Root View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    tvOS_RootView()
        .environmentObject(SampleLibraryViewModel())
}
