import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "sparkles")
                .font(.largeTitle)

            Text("[__WORKSPACE_TITLE__]")
                .font(.title)

            Text("Your Nova-managed Apple app is ready.")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
