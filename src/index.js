var fs = require("fs");
var path = require("path");
var rimraf = require("rimraf");
var Handlebars = require("handlebars");
var data = require("./resume.json");
var templatePath = path.resolve(__dirname, "./index-template.html");
var templateSource = fs.readFileSync(templatePath, "utf-8");

// format skills data for rendering
data.skillRows = [];
while (data.skills.length) {
  data.skillRows.push(data.skills.splice(0, 4));
}

registerPartials();

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
  var partialsPath = path.resolve(__dirname, "./partials");
  var partials = fs.readdirSync(partialsPath);

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
