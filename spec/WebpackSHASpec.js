"use strict";

const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");
const fs = require("fs");
const OUTPUT_DIR = path.join(__dirname, "../.tmp");
const FIXTURES = path.join(__dirname, "./fixtures");

describe("WebpackSHAHash", () => {
    beforeEach((done) => {
        rimraf(OUTPUT_DIR, done);
    });

    it("Compile without plugin", (done) => {
        webpack({
            entry: {
                entry: path.join(FIXTURES, "entry.js")
            },
            output: {
                path: OUTPUT_DIR,
                filename: "[name]-bundle.js",
                chunkFilename: "[chunkhash].[id].chunk.js"
            }
        }, (err, stats) => {
            expect(err).toBeFalsy();
            expect(stats.compilation.errors).toEqual([]);
            expect(stats.compilation.warnings).toEqual([]);

            let outputDir = fs.readdirSync(OUTPUT_DIR);

            expect(outputDir.length).toEqual(2);
            done();
        });
    });

    it("Compile twice without plugin", (done) => {
        var config = {
            entry: {
                entry: path.join(FIXTURES, "entry.js")
            },
            output: {
                path: OUTPUT_DIR,
                filename: "[name]-bundle.js",
                chunkFilename: "[chunkhash].[id].chunk.js"
            }
        };

        webpack(config, (err, stats) => {
            expect(err).toBeFalsy();
            expect(stats.compilation.errors).toEqual([]);
            expect(stats.compilation.warnings).toEqual([]);

            let outputDir = fs.readdirSync(OUTPUT_DIR);

            expect(outputDir.length).toEqual(2);
            webpack(config, (err, stats) => {
                expect(err).toBeFalsy();
                expect(stats.compilation.errors).toEqual([]);
                expect(stats.compilation.warnings).toEqual([]);

                let outputDir = fs.readdirSync(OUTPUT_DIR);

                expect(outputDir.length).toEqual(2);
                done();
            });
        });
    });
});
