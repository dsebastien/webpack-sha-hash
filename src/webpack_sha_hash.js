"use strict";

const createHash = require("sha.js");
const sha256 = createHash("sha256");

class WebpackSHAHash {
    constructor(options = {}) {
        // TODO handle options
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

    /**
     * Called by Webpack which gives a referencer to its compiler object.
     * Reference: https://github.com/webpack/docs/wiki/plugins
     * @param compiler the Webpack compiler object
     */
    apply(compiler) {
        compiler.plugin("compilation", (compilation) => {
            compilation.plugin("chunk-hash", (chunk, chunkHash) => {
                const source = chunk.modules.sort(this.compareModules).map(this.getModuleSource).reduce(this.concatenateSource, ""); // we provide an initialValue in case there is an empty module source. Ref: http://es5.github.io/#x15.4.4.21
                const hash = sha256.update(source, "utf8");
                const calculatedChunkHash = hash.digest("hex");

                chunkHash.digest = () => {
                    return calculatedChunkHash;
                };
            });
        });
    }
}

module.exports = WebpackSHAHash;
