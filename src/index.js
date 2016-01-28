var _ = require("lodash");
// var ResumeBuilder = require("./build");
var data = require("./resume.json");
var path = require("path");
var fs = require("fs");
var rimraf = require("rimraf");
var Handlebars = require("handlebars");
// var Templates = require("./build/templates");

// Templates.init();
registerPartials();

var templatePath = path.resolve(__dirname, "./index-template.html");
var templateSource = fs.readFileSync(templatePath, "utf-8");
var template = Handlebars.compile(templateSource);
var resumeContent = template(data);
var fileName = path.resolve(__dirname, "../index.html");

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

function registerPartials() {
  var partialsPath = path.resolve(__dirname, "./partials"),
    partials = fs.readdirSync(partialsPath);

  partials.forEach(function(partial) {
    var partialName = partial.substr(2, (partial.lastIndexOf(".") - 2));
    var partialFilepath = path.resolve(__dirname, "./partials", partial);

    var partialContent = fs.readFileSync(partialFilepath, "utf-8", function(err) {
      if (err) {
        console.log("ERROR registering partial:", partialFilepath, err);
      }

    });
    Handlebars.registerPartial(partialName, partialContent);
  });
}
