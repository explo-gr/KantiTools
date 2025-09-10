const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = exclusionList([
    /LICENSE$/,
    /README\.md$/,
    /TODO\.md$/,
    /scripts\/.*/,
    /eas\.json$/,
]);

module.exports = config;
