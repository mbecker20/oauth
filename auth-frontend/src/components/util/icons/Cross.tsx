import { Component, createSignal, JSX } from "solid-js";
import Grid from "../layout/Grid";

const Cross: Component<{
  style?: JSX.CSSProperties;
  onClick?: () => void;
}> = (p) => {
  const [mouseOver, setMouseOver] = createSignal(false);
  return (
    <Grid
      placeItems="center"
      style={p.style}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <svg
        onClick={(e) => {
          e.stopPropagation();
          if (p.onClick) p.onClick();
        }}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 20 20"
        enable-background="new 0 0 20 20"
        width="100%"
        height="100%"
        // xml:space="preserve"
      >
        <g id="cross_mark_6_">
          <g>
            <path
              style={{ transition: " fill 250ms " }}
              // className={className}
              fill-rule="evenodd"
              fill={mouseOver() ? "#b35659" : "#fceade"}
              clip-rule="evenodd"
              d="M11.41,10l4.29-4.29C15.89,5.53,16,5.28,16,5c0-0.55-0.45-1-1-1
			c-0.28,0-0.53,0.11-0.71,0.29L10,8.59L5.71,4.29C5.53,4.11,5.28,4,5,4C4.45,4,4,4.45,4,5c0,0.28,0.11,0.53,0.29,0.71L8.59,10
			l-4.29,4.29C4.11,14.47,4,14.72,4,15c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29L10,11.41l4.29,4.29
			C14.47,15.89,14.72,16,15,16c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L11.41,10z"
            />
          </g>
        </g>
      </svg>
    </Grid>
  );
};

export default Cross;
