const React = require("react");

const Layout = (props) => {
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        ></link>

        {/* fonts  */}

        {/* style sheet  */}
        <link rel="stylesheet" href="/css/main.css" />
        {/* title  */}
        <title>Todo App</title>
      </head>
      <body>{props.children}</body>
    </>
  );
};

module.exports = Layout;
