"use strict";

require.ensure("./module", (require) => {
    const module = require("./module");

    console.log(module);
});
