import SwiftUI

///
/// Sample Settings Form.
///
/// Holds the settings controls every platform shows, so each platform folder
/// only chooses where the form appears and how it is styled.
///
/// - Since: UNRELEASED
///
internal struct SampleSettingsForm: View {
    ///
    /// Sample Settings Form - Library.
    ///
    /// - Since: UNRELEASED
    ///
    @EnvironmentObject private var library: SampleLibraryViewModel

    ///
    /// Sample Settings Form - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        Form {
            Section {
                Toggle("Show Favorites Only", isOn: $library.showsFavoritesOnly)
                Toggle("Show Summaries", isOn: $library.showsSummaries)
            } header: {
                Text("Library")
            }

            Section {
                HStack {
                    Text("Version")

                    Spacer()

                    Text(Self.versionText)
                        .foregroundStyle(.secondary)
                }
            } header: {
                Text("About")
            }
        }
    }

    ///
    /// Sample Settings Form - Version Text.
    ///
    /// Reads the marketing version and build number that Nova's release flow
    /// keeps in "project.yml".
    ///
    /// - Since: UNRELEASED
    ///
    private static var versionText: String {
        let infoDictionary = Bundle.main.infoDictionary ?? [:]
        let marketingVersion = infoDictionary["CFBundleShortVersionString"] as? String ?? "0.0.0"
        let buildNumber = infoDictionary["CFBundleVersion"] as? String ?? "0"

        return "\(marketingVersion) (\(buildNumber))"
    }
}

///
/// Sample Settings Form Preview.
///
/// - Since: UNRELEASED
///
#Preview {
    SampleSettingsForm()
        .environmentObject(SampleLibraryViewModel())
}
