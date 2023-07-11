const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

function ejs2html({ path, outPath, data, options }) {
  fs.readFile(path, "utf8", function(err, data) {
    if (err) {
      console.log(err);
      return false;
    }
    ejs.renderFile(path, data, options, (err, html) => {
      if (err) {
        console.log(err);
        return false;
      }
      fs.writeFile(outPath, html, function(err) {
        if (err) {
          console.log(err);
          return false;
        }
        return true;
      });
    });
  });
}

ejs2html({
  path: `${__dirname}/views/CineWorld.ejs`,
  outPath: `${__dirname}/public/CineWorld.html`
});

ejs2html({
    path: `${__dirname}/views/logPage.ejs`,
    outPath: `${__dirname}/public/logPage.html`
  });

  ejs2html({
    path: `${__dirname}/views/signUpPage.ejs`,
    outPath: `${__dirname}/public/signUpPage.html`
  });