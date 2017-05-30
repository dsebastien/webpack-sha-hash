"use strict";

const createHash = require("sha.js");

class WebpackSHAHash {
    /**
     * Parse the options and initialize the plugin.
     * @param options the options if any
     */
    constructor(options = {}) {
        // Hashing algorithm
        if(!options.hasOwnProperty("hashingAlgorithm")){
            options.hashingAlgorithm = "sha256"; // default
        }

        this.hashingAlgorithm = options.hashingAlgorithm;

        try{
            createHash(this.hashingAlgorithm);
        } catch(e) {
            throw new Error("You have most probably provided an invalid value for the 'hashingAlgorithm' option of the WebpackSHAHash plugin! Error details: " + e.stack + "\n -----------");
        }

        // remove the option from the object once processed (so that we can identify if unknown options have been passed)
        delete options.hashingAlgorithm;

        // Check if unknown options were passed (i.e., fail fast and be helpful)
        for(const prop in options){
            if(options.hasOwnProperty(prop)) {
                throw new Error("You have passed an unknown option to the WebpackSHAHash plugin: " + prop);
            }
        }
    }

    compareModules(a, b) {
        let retVal = 0;

        if(a.resource < b.resource) {
            retVal = -1;
        } else if(a.resource > b.resource) {
            retVal = 1;
        }

        return retVal;
    }

    getModuleSource(module) {
        const source = module._source || {};

        return source._value || "";
    }

    concatenateSource(result, moduleSource) {
        return result + moduleSource;
    }

    generateHash(content) {
        return createHash(this.hashingAlgorithm).update(content, "utf8").digest("hex");
    }

    /**
     * Called by Webpack which gives a referencer to its compiler object.
     * Reference: https://github.com/webpack/docs/wiki/plugins
     * @param compiler the Webpack compiler object
     */
    apply(compiler) {
        compiler.plugin("compilation", (compilation) => {
            compilation.plugin("chunk-hash", (chunk, chunkHash) => {
                const source = chunk.modules.sort(this.compareModules).map(this.getModuleSource).reduce(this.concatenateSource, ""); // we provide an initialValue in case there is an empty module source. Ref: http://es5.github.io/#x15.4.4.21
                const calculatedChunkHash = this.generateHash(source);

                chunkHash.digest = () => {
                    return calculatedChunkHash;
                };
            });
        });
    }
}

module.exports = WebpackSHAHash;
