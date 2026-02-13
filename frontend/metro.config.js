const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { pathToFileURL } = require('url');

const config = getDefaultConfig(__dirname);

// Ensure the project root is a valid file URL for Windows ESM support
if (process.platform === 'win32') {
  config.projectRoot = pathToFileURL(__dirname).href;
}

module.exports = withNativeWind(config, { input: './global.css' });
