import SwiftUI

@main
struct [__WORKSPACE_IDENTIFIER__]App: App {
    var body: some Scene {
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
