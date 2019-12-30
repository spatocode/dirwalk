var fs = require("fs");
var path = require("path");

module.exports = function (path) {
    var paths = [];
    var info = fs.lstatSync(path);
    if (info.isFile()) {
        throw new Error("Cannot traverse a file. Path should be a directory not file.");
    }
    traverse(path, info, paths);
    return paths
};

function traverse (root, stats, paths) {
    if (stats.isFile()) {
        return paths.push(root);
    }

    var filenames = fs.readdirSync(root);
    paths.push(root);
    for (var i = 0; i < filenames.length; i++) {
        var file = path.join(root, filenames[i]);
        var info = fs.lstatSync(file);
        traverse(file, info, paths);
    }

    return paths;
}
