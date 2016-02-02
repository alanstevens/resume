var fs = require("fs");
var path = require("path");
var rimraf = require("rimraf");
var Handlebars = require("handlebars");
var data = require("./resume.json");

// format skills data for rendering
data.skillRows = [];
while (data.skills.length) {
  data.skillRows.push(data.skills.splice(0, 4));
}

templateName = "./print/index-template.html";
outputPath = "./../print/index.html";
partialsPath = "./print/partials";
buildView(templateName, outputPath, partialsPath, data);

var templateName = "./web/index-template.html";
var outputPath = "../index.html";
var partialsPath = "./web/partials";
buildView(templateName, outputPath, partialsPath, data);

function buildView(templateName, outputPath, partialsPath, data) {
  var templatePath = path.resolve(__dirname, templateName);
  var templateSource = fs.readFileSync(templatePath, "utf-8");
  var outputFile = path.resolve(__dirname, outputPath);

  registerPartials(partialsPath);

  var template = Handlebars.compile(templateSource);
  var resumeContent = template(data);

  rimraf(outputFile,
    function() {
      fs.writeFile(outputFile, resumeContent, function(err) {
        if (err) {
          console.log("ERROR generating resume:\n", err);
        }
        console.log("SUCCESS! Resume generated to: ", outputFile);
      }); // fs.writeFile
    } // anonymous function
  ); //rimraf
}

function registerPartials(partialsPath) {
  var partialsPath = path.resolve(__dirname, partialsPath);
  var partials = fs.readdirSync(partialsPath);

  partials.forEach(function(partial) {
    var partialName = partial.substr(2, (partial.lastIndexOf(".") - 2));
    var partialFilepath = path.resolve(__dirname, partialsPath, partial);

    var partialContent = fs.readFileSync(partialFilepath, "utf-8", function(err) {
      if (err) {
        console.log("ERROR registering partial:", partialFilepath, err);
      }

    });
    Handlebars.registerPartial(partialName, partialContent);
  });
}
