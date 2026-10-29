import SwiftUI

///
/// [__WORKSPACE_TITLE__] Application.
///
/// Creates the shared SwiftUI scene for the generated iOS and macOS
/// application.
///
/// - Since: UNRELEASED
///
@main
internal struct [__WORKSPACE_IDENTIFIER__]App: App {
    ///
    /// [__WORKSPACE_TITLE__] Application - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some Scene {
#if os(macOS)
        WindowGroup {
            ContentView()
                .frame(minWidth: 640, minHeight: 620)
        }
        .defaultSize(width: 1_136, height: 620)
        .windowResizability(.contentMinSize)
#else
        WindowGroup {
            ContentView()
        }
#endif
    }
}
