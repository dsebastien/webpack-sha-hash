"use strict";

const WebpackSHAHash = require("../src/webpack_sha_hash");
const path = require("path");

const src = path.join(__dirname, "/js");
const dest = path.join(__dirname, "/dest");

module.exports = {
    context: src,
    entry: {
        app: "./app.js"
    },
    output: {
        path: dest,
        filename: "[name].js",
        chunkFilename: "[chunkhash].[id].chunk.js"
    },
    plugins: [
        new WebpackSHAHash()
    ]
};
