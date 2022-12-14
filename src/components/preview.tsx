import React, { useEffect, useRef } from "react";

import "../style/preview.css";

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
  <head>
    <style>
      html{background-color :#fff;height: 100%;}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color:red;"> <h4>Runtime Error:</h4> ' + error + '</div>'
        console.error(error)
      }
      window.addEventListener('error', (event)=>{
        event.preventDefault()
        handleError(event.error)
      })
      window.addEventListener('message', (event)=>{
        try{
          eval(event.data)
        }catch (error) {
          handleError(error)
        }
      } ,false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="Stand-alone Development Environment Preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
