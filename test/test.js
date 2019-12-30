const assert = require("assert");
const path = require("path");
const dirwalk = require("../");

describe("dirwalk", function () {
    describe("walk", function () {
        it("should traverse directory asynchronusly", function (done) {
            var foundfiles;
            dirwalk.walk(path.join(__dirname, "testdir"), (err, path, info) => {
                if (err) {
                    throw err;
                }
                foundfiles = path;
            });
            assert.ifError(foundfiles);
            done();
        });
    });

    describe("walkSync", function () {
        it("should traverse directory synchronusly", function (done) {
            var foundfiles;
            var files = dirwalk.walkSync(path.join(__dirname, "testdir"));
            foundfiles = files;
            assert.notStrictEqual(foundfiles, undefined);
            done();
        });
    });
});
