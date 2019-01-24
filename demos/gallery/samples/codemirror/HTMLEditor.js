import { HTMLEditor } from "@hpcc-js/codemirror";

new HTMLEditor()
    .target("target")
    .html(`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>hpcc-js</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="packages/util/dist/index.js"></script>
        <script src="packages/common/dist/index.js"></script>
        <script src="packages/api/dist/index.js"></script>
        <script src="packages/codemirror/dist/index.js"></script>
    </head>
    <body>
        <div id="target" style="width:500px;height:500px;"></div>
        <script>
            new window["@hpcc-js/codemirror"].CSSEditor()
                .target("target")
                .css("body { margin: 0; }")
                .render()
                ;
        </script>
    </body>
    </html>`)
    .render()
    ;
