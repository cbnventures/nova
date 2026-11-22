import SwiftUI

///
/// visionOS Root View.
///
/// Arranges the shared feature into a window whose tab bar floats beside it as
/// an ornament, the standard layout for Apple Vision Pro apps.
///
/// - Since: UNRELEASED
///
internal struct VisionOS_RootView: View {
    ///
    /// visionOS Root View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        TabView {
            LaunchpadView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }

            VisionOS_LibraryView()
                .tabItem {
                    Label("Library", systemImage: "books.vertical")
                }
        }
    }
}

///
/// visionOS Root View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    VisionOS_RootView()
        .environmentObject(SampleLibraryViewModel())
}
