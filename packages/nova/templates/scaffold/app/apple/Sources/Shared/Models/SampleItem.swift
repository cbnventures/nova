import Foundation

///
/// Sample Item.
///
/// Describes one entry in the generated sample library so every platform
/// folder can render the same content with its own navigation style.
///
/// - Since: UNRELEASED
///
internal struct SampleItem: Identifiable, Hashable, Sendable {
    ///
    /// Sample Item - ID.
    ///
    /// Stays stable across launches so selections and favorites can refer to
    /// the item without holding the whole value.
    ///
    /// - Since: UNRELEASED
    ///
    internal let id: String

    ///
    /// Sample Item - Title.
    ///
    /// - Since: UNRELEASED
    ///
    internal let title: String

    ///
    /// Sample Item - Summary.
    ///
    /// Gives list rows a one-line description beneath the title.
    ///
    /// - Since: UNRELEASED
    ///
    internal let summary: String

    ///
    /// Sample Item - Details.
    ///
    /// Holds the longer copy shown on the detail screen.
    ///
    /// - Since: UNRELEASED
    ///
    internal let details: String

    ///
    /// Sample Item - Symbol Name.
    ///
    /// Names the SF Symbol drawn beside the item on every platform.
    ///
    /// - Since: UNRELEASED
    ///
    internal let symbolName: String
}

extension SampleItem {
    ///
    /// Sample Item - Samples.
    ///
    /// Seeds the library with enough entries to exercise lists, selection,
    /// and favorites without a network connection or a database.
    ///
    /// - Since: UNRELEASED
    ///
    internal static let samples: [SampleItem] = [
        SampleItem(
            id: "shared-code",
            title: String(localized: "Shared Code"),
            summary: String(localized: "Models and views every platform reuses."),
            details: String(localized: "Put models, view models, and reusable views in Sources/Shared so each platform folder only decides how they are arranged."),
            symbolName: "square.stack.3d.up"
        ),
        SampleItem(
            id: "platform-folders",
            title: String(localized: "Platform Folders"),
            summary: String(localized: "One folder per Apple platform."),
            details: String(localized: "Sources/iOS, Sources/MacOS, Sources/MacOS_12, Sources/tvOS, and Sources/VisionOS compile only for their own destination."),
            symbolName: "folder"
        ),
        SampleItem(
            id: "previews",
            title: String(localized: "Previews"),
            summary: String(localized: "See every screen without launching the app."),
            details: String(localized: "Each view ships with an Xcode preview, so you can change a screen and see the result in the canvas right away."),
            symbolName: "eye"
        ),
        SampleItem(
            id: "localization",
            title: String(localized: "Localization"),
            summary: String(localized: "Strings ready for translation."),
            details: String(localized: "Visible copy flows through Sources/Localizable.xcstrings, so adding a language starts in Xcode's String Catalog editor."),
            symbolName: "globe"
        ),
        SampleItem(
            id: "testing",
            title: String(localized: "Testing"),
            summary: String(localized: "Swift Testing from the first commit."),
            details: String(localized: "The Tests folder covers the shared view model, and the workspace check script runs it on every change."),
            symbolName: "checkmark.seal"
        ),
    ]
}
