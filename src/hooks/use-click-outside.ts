import React from "react";

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  callback: (value: React.SetStateAction<boolean>) => void
) => {
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event?.target &&
        ref.current.contains(event.target as ChildNode)
      ) {
        return;
      }
      callback(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, [ref, callback]);
};
