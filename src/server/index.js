import 'babel-polyfill';
import express from "express";
import renderer from "./renderer";

const app = express();

app.use(express.static("public"));
app.get("*", function (req, res) {
  const context = {};
  const data = `
      <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>

      <body>
          <div id="root"></div>
          <script src="bundle.js"></script>
      </body>

      </html>
      `
  renderer(data, req.path, context).then(html => {
    if (context.notFound) {
      res.status(404);
    }
    res.send(html);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
