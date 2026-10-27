import SwiftUI

///
/// Content View.
///
/// Presents an adaptive Nova launchpad that gives a generated Apple application
/// one clear starting point across iPhone, iPad, and macOS window sizes.
///
/// - Since: UNRELEASED
///
internal struct ContentView: View {
    ///
    /// Content View - Documentation Link.
    ///
    /// Keeps the starter action attached to Apple's primary SwiftUI learning
    /// path without introducing product-specific navigation.
    ///
    /// - Since: UNRELEASED
    ///
    private static let documentationLink = URL(string: "https://developer.apple.com/swiftui/get-started/")!

    ///
    /// Content View - Nova Documentation Link.
    ///
    /// Gives the generated application a stable route back to Nova's
    /// quickstart documentation.
    ///
    /// - Since: UNRELEASED
    ///
    private static let novaDocumentationLink = URL(string: "https://nova.cbnventures.io/docs/quickstart/")!

    ///
    /// Content View - Body.
    ///
    /// Builds the launchpad from native SwiftUI materials and automatically
    /// switches between wide and compact arrangements as space changes.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some View {
        ZStack {
            LinearGradient(
                colors: [
                    Color.accentColor.opacity(0.16),
                    Color.clear,
                ],
                startPoint: .topTrailing,
                endPoint: .center
            )
            .ignoresSafeArea()

            GeometryReader { geometry in
                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        header

                        Spacer(minLength: 72)

                        responsiveContent

                        Spacer(minLength: 72)

                        footer
                    }
                    .frame(
                        maxWidth: 1_080,
                        minHeight: max(geometry.size.height - 56, 0),
                        alignment: .leading
                    )
                    .padding(28)
                    .frame(maxWidth: .infinity, alignment: .center)
                }
            }
        }
    }

    ///
    /// Content View - Header.
    ///
    /// Identifies the generated Apple workspace and provides a compact route
    /// back to Nova's documentation.
    ///
    /// - Since: UNRELEASED
    ///
    private var header: some View {
        HStack(spacing: 16) {
            HStack(spacing: 10) {
                Image("NovaLogo")
                    .resizable()
                    .scaledToFit()
                .frame(width: 36, height: 36)
                .accessibilityLabel("Nova")

                Text("Nova × Apple")
                    .font(.headline)
                    .lineLimit(1)
                    .minimumScaleFactor(0.85)
            }
            .layoutPriority(1)

            Spacer(minLength: 12)

            Link(destination: Self.novaDocumentationLink) {
                Text("Read Nova Docs ↗")
                    .font(.caption.weight(.semibold))
            }
            .buttonStyle(.plain)
            .foregroundStyle(.tint)
        }
    }

    ///
    /// Content View - Responsive Content.
    ///
    /// Prefers an editorial two-column composition and falls back to a vertical
    /// stack when a device or window cannot comfortably fit both regions.
    ///
    /// - Since: UNRELEASED
    ///
    private var responsiveContent: some View {
        ViewThatFits(in: .horizontal) {
            HStack(alignment: .bottom, spacing: 64) {
                introduction
                    .frame(maxWidth: .infinity, alignment: .leading)

                sequence
                    .frame(width: 360)
            }

            VStack(alignment: .leading, spacing: 48) {
                introduction
                sequence
            }
        }
    }

    ///
    /// Content View - Introduction.
    ///
    /// Gives the generated project an obvious first edit and points consumers
    /// toward SwiftUI documentation without prescribing application behavior.
    ///
    /// - Since: UNRELEASED
    ///
    private var introduction: some View {
        VStack(alignment: .leading, spacing: 0) {
            VStack(alignment: .leading, spacing: 0) {
                Text("[__WORKSPACE_TITLE__]")
                    .foregroundStyle(.primary)

                Text("starts here.")
                    .foregroundStyle(.tint)
            }
            .font(.system(size: 52, weight: .bold, design: .rounded))
            .tracking(-2.2)
            .accessibilityElement(children: .combine)
            .accessibilityAddTraits(.isHeader)

            Spacer()
                .frame(height: 18)

            Text("A native Apple workspace with strict checks, tests, and a clean path from first view to release.")
                .font(.title3)
                .foregroundStyle(.secondary)
                .lineSpacing(5)
                .fixedSize(horizontal: false, vertical: true)

            Spacer()
                .frame(height: 26)

            Link(destination: Self.documentationLink) {
                Label("Explore SwiftUI", systemImage: "arrow.up.right")
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)

            Spacer()
                .frame(height: 14)

            Text("Start in Sources/ContentView.swift")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
    }

    ///
    /// Content View - Sequence.
    ///
    /// Offers a short path from generated starter to shipped application while
    /// remaining easy to replace when real product content arrives.
    ///
    /// - Since: UNRELEASED
    ///
    private var sequence: some View {
        VStack(alignment: .leading, spacing: 24) {
            Text("LAUNCH SEQUENCE")
                .font(.caption2.weight(.bold))
                .tracking(1.4)
                .foregroundStyle(.secondary)

            LaunchStepView(
                number: "01",
                title: "Shape the experience",
                description: "Replace this starter with your first real product experience."
            )

            LaunchStepView(
                number: "02",
                title: "Keep the contract",
                description: "Run the workspace checks while the project takes shape."
            )

            LaunchStepView(
                number: "03",
                title: "Ship confidently",
                description: "Build the same production artifact Nova already validates."
            )
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 28))
    }

    ///
    /// Content View - Footer.
    ///
    /// Keeps Nova ownership visible and exposes the same CBN Ventures
    /// destinations as the generated web launchpads.
    ///
    /// - Since: UNRELEASED
    ///
    private var footer: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Generated with Nova")
                .font(.caption2.weight(.semibold))
                .tracking(1.1)
                .foregroundStyle(.secondary)
                .textCase(.uppercase)

            HStack(spacing: 4) {
                SocialLinkView(image: "SocialFacebook", label: "Facebook", url: "https://www.facebook.com/cbnventures")
                SocialLinkView(image: "SocialX", label: "X", url: "https://x.com/cbnventures")
                SocialLinkView(image: "SocialYouTube", label: "YouTube", url: "https://www.youtube.com/@cbnventures")
                SocialLinkView(image: "SocialInstagram", label: "Instagram", url: "https://www.instagram.com/cbnventures/")
                SocialLinkView(image: "SocialGitHub", label: "GitHub", url: "https://github.com/cbnventures")
                SocialLinkView(image: "SocialGooglePlay", label: "Google Play", url: "https://play.google.com/store/apps/dev?id=6419450160526226105")
                SocialLinkView(image: "SocialLinkedIn", label: "LinkedIn", url: "https://www.linkedin.com/company/cbnventures/")
            }
        }
    }
}

///
/// Social Link View.
///
/// Renders one accessible CBN Ventures social destination with a platform-
/// native link and a Nova-owned vector asset.
///
/// - Since: UNRELEASED
///
private struct SocialLinkView: View {
    ///
    /// Social Link View - Image.
    ///
    /// Names the template-rendered image in the generated asset catalog.
    ///
    /// - Since: UNRELEASED
    ///
    private let image: String

    ///
    /// Social Link View - Label.
    ///
    /// Provides an accessible name for the icon-only link.
    ///
    /// - Since: UNRELEASED
    ///
    private let label: LocalizedStringKey

    ///
    /// Social Link View - Destination.
    ///
    /// Stores the validated external URL opened by the link.
    ///
    /// - Since: UNRELEASED
    ///
    private let destination: URL

    ///
    /// Social Link View - Constructor.
    ///
    /// Captures the asset, accessible label, and external destination.
    ///
    /// - Parameter image: Image.
    /// - Parameter label: Label.
    /// - Parameter url: URL.
    ///
    /// - Since: UNRELEASED
    ///
    fileprivate init(image: String, label: LocalizedStringKey, url: String) {
        self.image = image
        self.label = label
        destination = URL(string: url)!
    }

    ///
    /// Social Link View - Body.
    ///
    /// Presents the asset as a compact template-colored external link.
    ///
    /// - Since: UNRELEASED
    ///
    fileprivate var body: some View {
        Link(destination: destination) {
            Image(image)
                .renderingMode(.template)
                .resizable()
                .scaledToFit()
                .frame(width: 18, height: 18)
                .frame(width: 34, height: 34)
                .background(.secondary.opacity(0.1), in: RoundedRectangle(cornerRadius: 10))
                .overlay {
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(.secondary.opacity(0.18), lineWidth: 1)
                }
                .contentShape(RoundedRectangle(cornerRadius: 10))
        }
        .buttonStyle(.plain)
        .foregroundStyle(.secondary)
        .accessibilityLabel(Text(label))
    }
}

///
/// Launch Step View.
///
/// Renders one numbered launch milestone with consistent alignment and spacing
/// inside the generated Apple application's starter sequence.
///
/// - Since: UNRELEASED
///
private struct LaunchStepView: View {
    ///
    /// Launch Step View - Number.
    ///
    /// Provides the visible ordering token for this launch milestone.
    ///
    /// - Since: UNRELEASED
    ///
    private let number: String

    ///
    /// Launch Step View - Title.
    ///
    /// Summarizes the milestone in a short scannable phrase.
    ///
    /// - Since: UNRELEASED
    ///
    private let title: LocalizedStringKey

    ///
    /// Launch Step View - Description.
    ///
    /// Explains how the milestone moves a generated project toward release.
    ///
    /// - Since: UNRELEASED
    ///
    private let description: LocalizedStringKey

    ///
    /// Launch Step View - Constructor.
    ///
    /// Captures the copy required to render one launch milestone.
    ///
    /// - Parameter number: Number.
    /// - Parameter title: Title.
    /// - Parameter description: Description.
    ///
    /// - Since: UNRELEASED
    ///
    fileprivate init(number: String, title: LocalizedStringKey, description: LocalizedStringKey) {
        self.number = number
        self.title = title
        self.description = description
    }

    ///
    /// Launch Step View - Body.
    ///
    /// Aligns the milestone number with its title and supporting description.
    ///
    /// - Since: UNRELEASED
    ///
    fileprivate var body: some View {
        HStack(alignment: .top, spacing: 18) {
            Text(number)
                .font(.headline.weight(.bold))
                .foregroundStyle(.tint)
                .frame(width: 28, alignment: .leading)

            VStack(alignment: .leading, spacing: 5) {
                Text(title)
                    .font(.headline)

                Text(description)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

///
/// Content View Preview.
///
/// Displays the generated launchpad in Xcode without requiring the application
/// target to be launched on a simulator or local Mac.
///
/// - Since: UNRELEASED
///
#Preview {
    ContentView()
}
