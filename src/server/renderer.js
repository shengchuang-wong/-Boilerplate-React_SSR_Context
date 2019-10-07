import React from "react";
import ReactDOM from "react-dom/server";
import Layout from "../common/Layout";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import getData from "../common/getData";
import StaticContext from "../client/StaticContext";
import serialize from 'serialize-javascript';

export default function renderer(html, path, context) {
  const promises = getData(path);
  context.data = {};
  return Promise.all(promises).then(responses => {
      responses.forEach(r => {
          if (r) Object.assign(context.data, r);
      });
      const serverHtml = ReactDOM.renderToString(
        <StaticContext.Provider value={context.data}>
          <StaticRouter location={path} context={context}>
              <Layout />
          </StaticRouter>
        </StaticContext.Provider>
      );

      
  const regex = /(<div id="root">)(<\/div>)/;
  html = html.replace(regex, function(original, div1, div2) {
      return div1 + serverHtml + div2 + `<script>
      window.INITIAL_DATA=${serialize(context.data)}
    </script>`;
  });

  const helmet = Helmet.renderStatic();
  const head = helmet.title.toString() + helmet.meta.toString();
  const index = html.indexOf("</head>");
  const html1 = html.slice(0, index);
  const html2 = html.slice(index);
  return html1 + head + html2;
  });
}