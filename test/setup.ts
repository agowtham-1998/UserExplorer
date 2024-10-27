// Always ensure 'react-native' gets included first
import * as ReactNative from "react-native";
import mockFile from "./mockFile";

// Mocking libraries
jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile), // Mock image resolution
        getSize: jest.fn(
          (
            uri: string, // Image URI
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void // Optional failure callback
          ) => success(100, 100) // Mock fixed image size
        ),
      },
    },
    ReactNative
  );
});

// Mock Expo Localization
jest.mock("expo-localization", () => ({
  ...jest.requireActual("expo-localization"),
  getLocales: () => [{ languageTag: "en-US", textDirection: "ltr" }], // Fixed locale
}));

declare const tron; // Global Tron declaration for debugging

declare global {
  let __TEST__: boolean; // Global test flag
}
