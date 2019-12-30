var fs = require("fs");
var path = require("path");

module.exports = function (path, walkFn) {
    fs.lstat(path, (err, stats) => {
        if (err) {
            walkFn(err, path, stats);
        }

        if (stats.isFile()) {
            throw new Error("Cannot traverse a file. Path should be a directory not file.");
        }

        traverse(path, stats, walkFn);
    });
};

function traverse (root, stats, walkFn) {
    if (stats.isFile()) {
        return walkFn(null, root, stats);
    }

    fs.readdir(root, (err, files) => {
        walkFn(err, root, stats);
        for (var i = 0; i < files.length; i++) {
            var file = path.join(root, files[i]);
            var info = fs.lstatSync(file);
            traverse(file, info, walkFn);
        }
    });
}
