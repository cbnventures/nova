plugins {
  alias(libs.plugins.android.application)
  alias(libs.plugins.compose.compiler)
  alias(libs.plugins.kotlin.serialization)
}

android {
  namespace = "[__ANDROID_APPLICATION_ID__]"
  compileSdk = [__SCAFFOLD_VERSION_ANDROID_COMPILE_SDK__]

  defaultConfig {
    applicationId = "[__ANDROID_APPLICATION_ID__]"
    minSdk = [__SCAFFOLD_VERSION_ANDROID_MIN_SDK__]
    targetSdk = [__SCAFFOLD_VERSION_ANDROID_TARGET_SDK__]
    versionCode = 1
    versionName = "[__WORKSPACE_VERSION__]"
  }

  buildTypes {
    release {
      isMinifyEnabled = false
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
    }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }

  buildFeatures {
    compose = true
    aidl = false
    buildConfig = false
    shaders = false
  }

  packaging {
    resources {
      excludes += "/META-INF/{AL2.0,LGPL2.1}"
    }
  }
}

kotlin {
    jvmToolchain(17)
}

dependencies {
  val composeBom = platform(libs.androidx.compose.bom)
  implementation(composeBom)

  // Core Android dependencies.
  implementation(libs.androidx.core.ktx)
  implementation(libs.androidx.lifecycle.runtime.ktx)
  implementation(libs.androidx.activity.compose)

  // Architecture components.
  implementation(libs.androidx.lifecycle.runtime.compose)
  implementation(libs.androidx.lifecycle.viewmodel.compose)

  // Compose.
  implementation(libs.androidx.compose.ui)
  implementation(libs.androidx.compose.ui.tooling.preview)
  implementation(libs.androidx.compose.material3)
  // Tooling.
  debugImplementation(libs.androidx.compose.ui.tooling)

  // Local tests: JUnit and coroutines.
  testImplementation(libs.junit)
  testImplementation(libs.kotlinx.coroutines.test)

  // Navigation.
  implementation(libs.androidx.navigation3.ui)
  implementation(libs.androidx.navigation3.runtime)
  implementation(libs.androidx.lifecycle.viewmodel.navigation3)
}
