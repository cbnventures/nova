import SwiftUI

///
/// macOS Commands.
///
/// Adds a Library menu to the menu bar so the shared feature is reachable from
/// the keyboard. It uses only macOS 12 APIs, so both macOS root views share it.
///
/// - Since: UNRELEASED
///
internal struct MacOS_Commands: Commands {
    ///
    /// macOS Commands - Library.
    ///
    /// - Since: UNRELEASED
    ///
    @ObservedObject private var library: SampleLibraryViewModel

    ///
    /// macOS Commands - Constructor.
    ///
    /// - Parameter library: Library.
    ///
    /// - Since: UNRELEASED
    ///
    internal init(library: SampleLibraryViewModel) {
        self.library = library
    }

    ///
    /// macOS Commands - Body.
    ///
    /// - Since: UNRELEASED
    ///
    internal var body: some Commands {
        SidebarCommands()

        CommandMenu("Library") {
            Button("Show Home") {
                library.selectedItemID = nil
            }
            .keyboardShortcut("0", modifiers: .command)

            Divider()

            Button("Toggle Favorite") {
                library.toggleFavoriteForSelection()
            }
            .keyboardShortcut("d", modifiers: .command)
            .disabled(library.selectedItem == nil)

            Toggle("Show Favorites Only", isOn: $library.showsFavoritesOnly)
                .keyboardShortcut("f", modifiers: [
                    .command,
                    .shift,
                ])
        }
    }
}
