import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import customLocations from "../../../public/customLocations.json";
const locations = customLocations.locations;

type Marker = {
  x: number;
  y: number;
  abbr: string;
  name: string;
  lat: number;
  lng: number;
};

const colors = {
  map: "#4B3EFF80",
  mapStroke: "#4B3EFF50",
};

export default function Map() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [states, setStates] = useState([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const statesRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const projection = d3.geoMercator().scale(300).translate([400, 400]);
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then((geo) => setStates(geo.features));
    setMarkers(
      locations.map((loc) => {
        const proj = projection([loc.lng, loc.lat]) as [number, number];
        return { ...loc, x: proj[0], y: proj[1] };
      })
    );
  }, []);

  const markerConnect = () => {
    // Connect only every two consecutive markers as a separate arc
    if (markers.length < 2) return "";
    let d = "";
    for (let i = 0; i < markers.length - 1; i += 2) {
      const m1 = markers[i];
      const m2 = markers[i + 1];
      const dx = m2.x - m1.x;
      const dy = m2.y - m1.y;
      const dr = Math.sqrt(dx * dx + dy * dy);
      d += `M${m1.x},${m1.y}A${dr},${dr} 0 0,1 ${m2.x},${m2.y}`;
    }
    return d;
  };

  return (
    <div className="w-full max-w-5xl flex justify-center h-full mx-auto bg-white ">
      <svg
        ref={svgRef}
        width="100%"
        viewBox="-550 -310 1900 1100"
        style={{ display: "block" }}
        preserveAspectRatio="xMidYMid meet">
        <g ref={statesRef}>
          {/* MAP */}
          {states.map((feature, i) => (
            <path
              key={i}
              d={
                d3
                  .geoPath()
                  .projection(
                    d3.geoMercator().scale(300).translate([400, 400])
                  )(feature) ?? ""
              }
              fill={colors.map}
              stroke={colors.mapStroke}
            />
          ))}
        </g>

        {/* LINES */}
        <path
          className={`fill-none stroke-[#5F1E97] stroke-[3] [stroke-dasharray:6_6] pointer-events-none animate-[marching-ants_1s_linear_infinite] `}
          d={markerConnect()}
        />

        {markers.map((marker, i) => (
          <g
            key={i}
            transform={`translate(${marker.x},${marker.y}) scale(0.4)`}
            className="cursor-pointer w-10">
            {/* MARKER */}
            <path
              className={`fill-[#FFCC00] stroke-[#5F1E97] stroke-[4]`}
              d="M0 0l28.592-28.592c15.78-15.78 15.908-41.24.128-57.02a40.424 40.424 0 0 0-57.124 57.2z"
            />
            {/* <TEXT> */}
            {/* <text
              x="0"
              y="-45"
              textAnchor="middle"
              className={`stroke-none fill-[#003399] font-sans text-[26px] font-medium font-Inter`}>
              {marker.abbr}
            </text> */}
          </g>
        ))}
      </svg>
    </div>
  );
}
