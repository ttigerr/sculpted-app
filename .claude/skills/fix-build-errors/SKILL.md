---
name: fix-build-errors
description: Diagnose and fix common build/run failures for this React Native 0.73 + Expo 50 app (iOS CocoaPods errors, Metro cache, node_modules mismatches, babel/alias issues, Android Gradle). Trigger when `yarn start`, `yarn ios`, `yarn android`, or `xcodebuild` fails, or when the user reports a build/bundle/pod error.
---

# Fix build errors — SCULPTED app

Stack snapshot (grounded in this repo):
- React Native **0.73.7**, Expo **50**, Hermes on, Flipper disabled
- iOS: CocoaPods via `ios/Podfile` (Expo autolinking + `use_expo_modules!`); workspace is `ios/Scultpted.xcworkspace`
- Metro: `expo/metro-config` merged with `@react-native/metro-config`
- Babel: `module-resolver` aliases (`@components`, `@screens`, …), `react-native-dotenv` (`@env` from `.env`), and `react-native-reanimated/plugin` **must stay last**
- Package manager: **yarn**, Node `>=18`

## 0. First, read the actual error

Scroll back to the **first** error line (not the last). Xcode and Gradle print cascades — the earliest message is usually the real cause. Match it against the sections below.

## 1. iOS: missing Pods / xcconfig errors

**Symptoms**
- `Unable to open base configuration reference file '…/Pods/Target Support Files/Pods-Scultpted/Pods-Scultpted.debug.xcconfig'`
- `Unable to load contents of file list: '…/Pods-Scultpted-*-input-files.xcfilelist'`
- `ld: library 'Pods-Scultpted' not found`

**Fix**
```bash
cd ios && pod install
```

If that fails or produces weird version resolution:
```bash
cd ios
rm -rf Pods Podfile.lock build
pod install --repo-update
```

Why: `ios/Pods/` is gitignored and must be regenerated after fresh clones, after dependency changes in `package.json`, or when switching branches that touched native modules.

## 2. iOS: pod install itself fails

**`[!] CocoaPods could not find compatible versions for pod "…"`**
→ A JS dep changed native requirements. Run `yarn install` first so autolinking sees the new version, then `cd ios && pod install --repo-update`.

**`ruby` / Ruby version errors**
→ Repo pins Ruby via `Gemfile`. Use the project Ruby (bundler or rbenv). If `pod` command uses system Ruby, re-run with `bundle exec pod install`.

**Hermes download fails** (`hermes-engine` tarball 404 / checksum mismatch)
→ Network / CDN issue. Retry; if persistent, `rm -rf ~/Library/Caches/CocoaPods && pod install --repo-update`.

**`use_expo_modules!` / autolinking errors**
→ Make sure `expo` is actually installed in `node_modules` (`yarn install`), then re-run `pod install`.

## 3. iOS: builds but crashes at launch or shows red screen

**"No bundle URL present" / "Could not connect to development server"**
→ Metro isn't running or simulator can't reach it:
```bash
yarn start --reset-cache
```
Then shake the sim (Cmd+D) → Reload. If still failing: `xcrun simctl shutdown all && xcrun simctl erase all` is a nuclear option — ask before running it.

**Builds `.xcodeproj` instead of `.xcworkspace`**
→ Always open `ios/Scultpted.xcworkspace` (not `.xcodeproj`). CocoaPods only works via the workspace.

## 4. Metro / JS bundler errors

**`Unable to resolve module …` for a package that is installed**
```bash
yarn start --reset-cache
# or
watchman watch-del-all && rm -rf $TMPDIR/metro-* && yarn start --reset-cache
```

**`Unable to resolve module` for an alias like `@components/Foo`**
→ Check `babel.config.js` — the alias must exist in the `module-resolver` plugin. Aliases in use: `src`, `@assets`, `@components`, `@ui-library`, `@constants`, `@helpers`, `@hooks`, `@models`, `@navigation`, `@redux`, `@screens`, `@services`, `@theme`, `@utils`, `@img`.

**`@env` import errors (`Cannot find module '@env'`)**
→ A `.env` file must exist at project root. `react-native-dotenv` reads from it; `allowUndefined: true` is set so missing vars return `undefined` rather than crashing — but the file itself must exist.

**Reanimated: `Native part of Reanimated doesn't seem to be initialized` or `Reanimated 2 failed to create a worklet`**
→ `react-native-reanimated/plugin` MUST be the **last** plugin in `babel.config.js`. If a plugin was added after it, move reanimated back to the end, then `yarn start --reset-cache` and rebuild native (`yarn ios` / `yarn android`).

## 5. node_modules / lockfile issues

**Random `Cannot find module` after pulling / switching branches**
```bash
rm -rf node_modules
yarn install
cd ios && pod install   # if native deps changed
```

**Version mismatch warnings from React Native CLI**
→ This project pins `react-native@0.73.7`. Don't `yarn upgrade` without intent; it will cascade through autolinking.

## 6. Android: Gradle failures

**`SDK location not found`**
→ Create `android/local.properties` with `sdk.dir=/Users/<you>/Library/Android/sdk`.

**`Could not resolve …` / dependency fetch failure**
→ Network blip, retry. If persistent: `cd android && ./gradlew --refresh-dependencies`.

**Daemon stuck / strange cache errors**
```bash
cd android && ./gradlew clean && ./gradlew --stop
```

**JDK version error** → RN 0.73 wants **JDK 17**. Check `java -version`.

## 7. Fonts / vector-icons

`react-native.config.js` lists `./assets/fonts` and `link-assets-manifest.json` tracks linked fonts. If an icon renders as `?`:
- iOS: `cd ios && pod install` then rebuild.
- Confirm the font file is actually under `assets/fonts/`.
- Don't manually run `react-native link` on RN 0.73 — autolinking handles it.

## 8. Last-resort full reset

Only when the targeted fixes above fail — this is slow (several minutes):
```bash
watchman watch-del-all 2>/dev/null
rm -rf node_modules ios/Pods ios/Podfile.lock ios/build android/build android/app/build
yarn install
cd ios && pod install
cd ..
yarn start --reset-cache
```
Then in a second terminal: `yarn ios` or `yarn android`.

## Diagnostic flow for new errors

1. Capture the **first** error line.
2. Classify: iOS native (xcodebuild / pod), JS/Metro, Android/Gradle, or runtime.
3. Try the single targeted fix for that section — don't jump to the nuclear reset first.
4. If a dependency was just added/removed/upgraded: run `yarn install` then `pod install`.
5. After fixing, rebuild via `yarn ios` or `yarn android` (not just reload) when the error was native-side.

## Things to avoid

- Don't `rm -rf ios/Pods` without also removing `ios/Podfile.lock` if you're trying to recover from version drift — the lockfile will just re-pin the broken state.
- Don't open `ios/Scultpted.xcodeproj` directly — always the `.xcworkspace`.
- Don't run `react-native link` — RN 0.73 uses autolinking.
- Don't reorder `babel.config.js` plugins without putting `react-native-reanimated/plugin` back at the end.
- Don't commit `.env`, `ios/Pods/`, or `node_modules/`.
