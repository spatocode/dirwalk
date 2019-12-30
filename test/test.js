const assert = require("assert");
const path = require("path");
const dirwalk = require("../");

var expectedfiles = [
    path.join(__dirname, "testdir"),
    path.join(__dirname, "testdir", ".file"),
    path.join(__dirname, "testdir", "dir1"),
    path.join(__dirname, "testdir", "dir1", ".dir1file"),
    path.join(__dirname, "testdir", "dir2"),
    path.join(__dirname, "testdir", "dir2", ".dir2file"),
    path.join(__dirname, "testdir", "dir3"),
    path.join(__dirname, "testdir", "dir3", ".dir3file")
];

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

        it("should return an array of files", function (done) {
            var files = dirwalk.walkSync(path.join(__dirname, "testdir"));
            assert.deepStrictEqual(files, expectedfiles);
            done();
        });

        it("should find all the files in a directory", function (done) {
            var files = dirwalk.walkSync(path.join(__dirname, "testdir"));
            assert.deepStrictEqual(files.length, expectedfiles.length);
            done();
        });
    });
});
