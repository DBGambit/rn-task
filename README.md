# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions up to the "Creating a new application" step before proceeding.

## Additional Requirements

1. **React Native Version**: This project uses **React Native v0.75.2**. Ensure that your **Java version** is **17 or higher**.
2. **Node.js Version**: Make sure your **Node.js version** is **18 or higher**.

## Step 1: Start the Metro Server

First, you need to start **Metro**, the JavaScript _bundler_ that ships with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android

# using npm
npm run ios

# OR using Yarn
yarn ios
```


## Building the Application

To create a build of your React Native app for distribution, follow these steps:

### Android

1. Navigate to the `android` directory:

    ```bash
    cd android
    ```

2. **On Windows**:

    - To create an APK:

        ```bash
        gradlew assembleRelease
        ```

    - To create an AAB (Android App Bundle):

        ```bash
        gradlew bundleRelease
        ```

3. **On Mac**:

    - To create an APK:

        ```bash
        ./gradlew assembleRelease
        ```

    - To create an AAB (Android App Bundle):

        ```bash
        ./gradlew bundleRelease
        ```

### iOS

1. Open the iOS project in Xcode:

    - Navigate to the `ios` folder and open the `.xcworkspace` file in Xcode.
  
2. Build the app for release:

    - Go to **Product > Archive** in the menu or use the **Archive** button in the Xcode toolbar to create an archive of your app.
