const glob = require("glob-promise");
const path = require("path");
const CustomError = require("./customError");
const storage = require("../utils/storage");

class DirectoryTree {
  constructor(path, name) {
    this.path = path;
    this.name = name;
  }

  updatePath(obj) {
    const _uploadPath = storage.uploadPath();
    obj.path = obj.path.replace(_uploadPath, "");

    if (obj.children) {
      obj.children.forEach((child) => this.updatePath(child));
    }
  }

  async loadDirectoryTree() {
    try {
      const pattern = path.join(this.path, "**", "**");
      const all = await glob(pattern, { cwd: this.path });
      const files = await glob(pattern, { cwd: this.path, nodir: true });

      for (const file of files) {
        const tmpId = all.indexOf(file);
        all.splice(tmpId, 1);
      }

      const directory = {
        name: this.name,
        path: this.path,
        children: []
      };

      all.splice(0, 1);

      const findDirectoryAndAddNode = (dir, dirPath, node) => {
        if (dir.path === dirPath) {
          if (!dir.children) {
            dir.children = [node];
          } else {
            dir.children.push(node);
          }
          return true;
        }
        if (dir.children) {
          for (const child of dir.children) {
            if (findDirectoryAndAddNode(child, dirPath, node)) {
              return true;
            }
          }
        }
        return false;
      };

      all.forEach((child) => {
        const dirPath = path.dirname(child);
        findDirectoryAndAddNode(directory, dirPath, {
          name: path.basename(child),
          path: child,
          children: []
        });
      });

      files.forEach((file) => {
        const dirPath = path.dirname(file);
        findDirectoryAndAddNode(directory, dirPath, {
          name: path.basename(file),
          path: file,
          children: undefined
        });
      });

      this.updatePath(directory);

      return directory;
    } catch (err) {
      console.error(err.message);
      throw new CustomError("Failed to load directory tree", 500);
    }
  }
}

module.exports = DirectoryTree;
