import SwiftUI

///
/// macOS Settings View.
///
/// Presents the shared settings form inside the app's Settings window, opened
/// from the app menu or with Command-Comma.
///
/// - Since: UNRELEASED
///
@available(macOS 13.0, *)
internal struct MacOS_SettingsView: View {
    ///
    /// macOS Settings View - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        SampleSettingsForm()
            .formStyle(.grouped)
            .frame(width: 460)
            .fixedSize(horizontal: false, vertical: true)
    }
}

///
/// macOS Settings View Preview.
///
/// - Since: UNRELEASED
///
@available(macOS 13.0, *)
#Preview {
    MacOS_SettingsView()
        .environmentObject(SampleLibraryViewModel())
}
