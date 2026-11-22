import SwiftUI

///
/// macOS 12 Settings View.
///
/// Presents the shared settings form in the Settings window on macOS 12, which
/// has no grouped form style.
///
/// - Since: UNRELEASED
///
internal struct MacOS_12_SettingsView: View {
    ///
    /// macOS 12 Settings View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        SampleSettingsForm()
            .padding(20)
            .frame(width: 420)
    }
}

///
/// macOS 12 Settings View Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    MacOS_12_SettingsView()
        .environmentObject(SampleLibraryViewModel())
}
