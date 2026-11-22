import SwiftUI

///
/// visionOS Settings Window.
///
/// Holds the shared settings form in a separate window that people can place
/// next to the main window.
///
/// - Since: UNRELEASED
///
internal struct VisionOS_SettingsWindow: View {
    ///
    /// visionOS Settings Window - Window ID.
    ///
    /// Links the settings scene in the app entry point to the ornament button
    /// that opens it.
    ///
    /// - Since: UNRELEASED
    ///
    internal static let windowID = "settings"

    ///
    /// visionOS Settings Window - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        NavigationStack {
            SampleSettingsForm()
                .navigationTitle("Settings")
        }
    }
}

///
/// visionOS Settings Window Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    VisionOS_SettingsWindow()
        .environmentObject(SampleLibraryViewModel())
}
