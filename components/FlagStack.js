import { useMemo } from "react";

import Flag from "./Flag";

const FlagStack = ({ isos = [], size = 32 }) => {
  const memoizedIsos = useMemo(() => [...isos].reverse(), [isos]);

  return (
    <div className="flex w-auto flex-row-reverse justify-end">
      {memoizedIsos.map((iso, index) => {
        return (
          <Flag
            key={iso}
            iso={iso}
            size={size}
            className="drop-shadow-[1px_0px_0px_rgba(255,255,255,1)] first:drop-shadow-none rounded-full"
            style={{
              marginLeft: index === isos.length - 1 ? 0 : `-${size / 3}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default FlagStack;
