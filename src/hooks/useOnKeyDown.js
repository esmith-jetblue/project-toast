import React from "react";

function useOnKeyDown({ key = "Escape", onKeyDown = () => {} }) {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") {
        return;
      }

      onKeyDown();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyDown]);
}

export default useOnKeyDown;
