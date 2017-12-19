var fs = require("fs");
var path = require("path");

var currentPath = process.argv[2],
  newPath = process.argv[3],
  needDel = process.argv[4];

var findAndCopyFiles = function(
  currentPath,
  newPath = process.argv[3],
  needDel = false
) {
  fs.readdir(currentPath, (err, items) => {
    items.forEach(item => {
      var itemPath = path.join(currentPath, item);
      var state = fs.statSync(itemPath);
      if (state.isDirectory()) {
        findAndCopyFiles(itemPath, newPath, needDel);
      } else {
        var letterPath = path.join(newPath, item[0].toUpperCase());
        console.log(letterPath);

        if (!fs.existsSync(letterPath)) {
          fs.mkdirSync(letterPath);
        }

        fs.linkSync(itemPath, path.join(letterPath, item));

        if (needDel) {
          fs.unlinkSync(itemPath);
        }
      }
    });
  });
};

findAndCopyFiles(currentPath, newPath, needDel);
