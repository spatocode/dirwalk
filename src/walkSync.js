var fs = require("fs");
var path = require("path");

module.exports = function (path) {
    var info = fs.lstatSync(path);
    if (info.isFile()) {
        throw new Error("Cannot traverse a file. Path should be a directory not file.");
    }
    return traverse(path);
};

var files = [];
function traverse (root) {
    files.push(root);

    if (fs.lstatSync(root).isDirectory()) {
        var filenames = fs.readdirSync(root);
        for (var i = 0; i < filenames.length; i++) {
            var file = path.join(root, filenames[i]);
            var info = fs.lstatSync(file);
            traverse(file, info);
        }
    }

    return files;
}
