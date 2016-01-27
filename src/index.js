var _ = require("lodash");
// var ResumeBuilder = require("./build");
var data = require("./resume.json");
var path = require("path");
var fs = require("fs");
var rimraf = require("rimraf");
var Handlebars = require("handlebars");
var Templates = require("./build/templates");

Templates.init();

var templatePath = path.resolve(__dirname, "./index-template.html");
var fileName = path.resolve(__dirname, "../index.html");
var templateSource = fs.readFileSync(templatePath, "utf-8");
var template = Handlebars.compile(templateSource);
var resumeContent = template(data);

rimraf(fileName,
  function() {
    fs.writeFile(fileName, resumeContent, function(err) {
      if (err) {
        console.log("ERROR generating resume:\n", err);
      }
      console.log("SUCCESS! Resume generated to: ", fileName);
    }); // fs.writeFile
  } // anonymous function
); //rimraf
