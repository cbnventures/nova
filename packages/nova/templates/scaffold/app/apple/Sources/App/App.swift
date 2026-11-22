import SwiftUI

///
/// [__WORKSPACE_TITLE__] Application.
///
/// Creates the scenes for every supported Apple platform and routes each one
/// to the root view in its own platform folder.
///
/// - Since: UNRELEASED
///
@main
internal struct [__WORKSPACE_IDENTIFIER__]App: App {
    ///
    /// [__WORKSPACE_TITLE__] Application - Library.
    ///
    /// Shares one sample library across every window, menu command, and
    /// settings screen of the running app.
    ///
    /// - Since: UNRELEASED
    ///
    @StateObject private var library = SampleLibraryViewModel()

    ///
    /// [__WORKSPACE_TITLE__] Application - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some Scene {
        WindowGroup {
            rootView
                .environmentObject(library)
#if os(macOS)
                .frame(minWidth: 760, minHeight: 520)
#endif
        }
#if os(macOS)
        .commands {
            MacOS_Commands(library: library)
        }
#endif

#if os(macOS)
        Settings {
            settingsView
                .environmentObject(library)
        }
#endif

#if os(visionOS)
        WindowGroup(id: VisionOS_SettingsWindow.windowID) {
            VisionOS_SettingsWindow()
                .environmentObject(library)
        }
        .defaultSize(width: 520, height: 480)
#endif
    }

    ///
    /// [__WORKSPACE_TITLE__] Application - Root View.
    ///
    /// Picks the platform folder's root view. On macOS, the "MacOS" folder
    /// serves macOS 13 and later, and the "MacOS_12" folder serves macOS 12.
    ///
    /// - Since: UNRELEASED
    ///
    @ViewBuilder
    private var rootView: some View {
#if os(macOS)
        if #available(macOS 13.0, *) {
            MacOS_RootView()
        } else {
            MacOS_12_RootView()
        }
#elseif os(visionOS)
        VisionOS_RootView()
#elseif os(tvOS)
        tvOS_RootView()
#else
        iOS_RootView()
#endif
    }

#if os(macOS)
    ///
    /// [__WORKSPACE_TITLE__] Application - Settings View.
    ///
    /// Picks the Settings window content with the same macOS version split as
    /// the root view.
    ///
    /// - Since: UNRELEASED
    ///
    @ViewBuilder
    private var settingsView: some View {
        if #available(macOS 13.0, *) {
            MacOS_SettingsView()
        } else {
            MacOS_12_SettingsView()
        }
    }
#endif
}
