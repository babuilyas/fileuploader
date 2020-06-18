const util = require("util");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    /*
	const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }
	*/
    //var filename = `${Date.now()}-bezkoder-${file.originalname}`;
    
    /*
    var ofile = path.join(path.join(`${__dirname}/../../upload`), file.originalname);
    var exists = fs.existsSync(ofile);
    if (exists)
    { 
      var esize = fs.statSync(ofile);
     if (req.files[0].fileSize != esize["size"])
      return ;
    }
    */
    var filename = `${file.originalname}`;
    callback(null, filename);
  }
});

function fileFilter (req, file, cb) {
 
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
 
  // To reject this file pass `false`, like so:
  //cb(null, false)
 
  var ofile = path.join(path.join(`${__dirname}/../../upload`), file.originalname);
  var exists = fs.existsSync(ofile);
  if (exists)
  { 
    var esize = fs.statSync(ofile);
   if (req.files[0].fileSize != esize["size"])
    cb(null, false);
  }
  else
  cb(null, true);

  // To accept the file pass `true`, like so:
  //cb(null, true)
 
  // You can always pass an error if something goes wrong:
  //cb(new Error('I don\'t have a clue!'))
 
};

var uploadFiles = multer({ storage: storage , fileFilter: fileFilter }).array("multi-files", 1000);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;