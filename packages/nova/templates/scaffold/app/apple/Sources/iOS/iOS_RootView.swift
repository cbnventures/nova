import SwiftUI

///
/// iOS Root View.
///
/// Arranges the shared feature into a tab bar for iPhone and iPad, with one
/// navigation stack per tab so each tab keeps its own history.
///
/// - Since: UNRELEASED
///
internal struct iOS_RootView: View {
    ///
    /// iOS Root View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        TabView {
            LaunchpadView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }

            iOS_LibraryView()
                .tabItem {
                    Label("Library", systemImage: "books.vertical")
                }

            NavigationStack {
                SampleSettingsForm()
                    .navigationTitle("Settings")
            }
            .tabItem {
                Label("Settings", systemImage: "gearshape")
            }
        }
    }
}

///
/// iOS Root View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    iOS_RootView()
        .environmentObject(SampleLibraryViewModel())
}
