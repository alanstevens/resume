var path = require("path");
var fs = require("fs");
var _ = require("lodash");
var Handlebars = require("handlebars");

function registerHelpers() {
  // #compare - adapted from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44
  Handlebars.registerHelper("compare", function(lval, operator, rval, options) {
    var operators, result;

    if (arguments.length < 3) {
      throw new Error("Handlebars helper 'compare' needs 3 parameters");
    }

    if (options === undefined) {
      options = rval;
      rval = operator;
      operator = "===";
    }

    operators = {
      "==": function(l, r) {
        return l == r;
      },
      "===": function(l, r) {
        return l === r;
      },
      "!=": function(l, r) {
        return l != r;
      },
      "!==": function(l, r) {
        return l !== r;
      },
      "<": function(l, r) {
        return l < r;
      },
      ">": function(l, r) {
        return l > r;
      },
      "<=": function(l, r) {
        return l <= r;
      },
      ">=": function(l, r) {
        return l >= r;
      },
      "typeof": function(l, r) {
        return typeof l == r;
      }
    };

    if (!operators[operator]) {
      throw new Error("Handlebars helper 'compare' doesn't know the operator: " + operator);
    }

    result = operators[operator](lval, rval);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  // #stringify
  Handlebars.registerHelper("stringify", function(target) {
    return JSON.stringify(target, null, 2);
  });

  // #stripChars
  Handlebars.registerHelper("stripChars", function(target) {
    return target.replace(".", "");
  });
}

module.exports.init = function() {
  registerHelpers();
  // registerPartials();
};
