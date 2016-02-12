"use strict";

const WebpackSHAHash = require("../dist/webpack_sha_hash");
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

    it("Should not complain if no options are passed", (done) => {
        new WebpackSHAHash();
        done();
    });

    it("Should not complain if an empty options object is passed", (done) => {
        new WebpackSHAHash({});
        done();
    });

    it("Should complain if an unknown option is passed", (done) => {
        try{
            new WebpackSHAHash({
                dummyOptionThatShouldNeverExist: true
            });
            expect(false).toBe(true, "An exception should have been thrown!"); //
        } catch(e) {
            expect(e).not.toBeNull();
        }

        done();
    });

    it("Should use sha256 as default hashing algorithm", (done) => {
        const plugin = new WebpackSHAHash();

        expect(plugin.hashingAlgorithm).toBe("sha256");
        done();
    });

    it("Should use the passed hashing algorithm if valid", (done) => {
        let algorithm = "sha512";
        const plugin = new WebpackSHAHash({
            hashingAlgorithm: algorithm
        });

        expect(plugin.hashingAlgorithm).toBe(algorithm);
        done();
    });

    it("Should fail if an unknown hashing algorithm is passed", (done) => {
        try{
            new WebpackSHAHash({
                hashingAlgorithm: "__if_this_one_exists_then_lol__"
            });
            expect(false).toBe(true, "An exception should have been thrown!"); //
        } catch(e) {
            expect(e).not.toBeNull();
        }

        done();
    });

    it("Should compile without plugin", (done) => {
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

    it("Should compile twice without plugin", (done) => {
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
