import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import "../style/resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 300);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  let ResizableProps: ResizableBoxProps =
    direction === "horizontal"
      ? {
          className: "resize-horizontal",
          minConstraints: [innerWidth * 0.2, Infinity],
          maxConstraints: [innerWidth * 0.75, Infinity],
          height: Infinity,
          width,
          resizeHandles: ["e"],
          onResizeStop: (_, data) => {
            setWidth(data.size.width);
          },
        }
      : {
          minConstraints: [Infinity, 50],
          maxConstraints: [Infinity, innerHeight * 0.9],
          height: 300,
          width: Infinity,
          resizeHandles: ["s"],
        };

  return <ResizableBox {...ResizableProps}>{children}</ResizableBox>;
};

export default Resizable;
