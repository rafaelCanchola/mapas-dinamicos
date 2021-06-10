import React, {useState} from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import './AnalyticMap.css'

function AnalyticMap(){
    const geoUrl =
        "https://raw.githubusercontent.com/angelnmara/geojson/master/mexicoHigh.json";
    const [content, setContent] = useState();
    return (
        <div id={"map"}>
            <ComposableMap height={260}
                           projectionConfig={{
                               rotate: [100.0, 15, 0],
                               scale: 800
                           }}
                           projection={"geoAlbers"}
            >
                <Geographies geography={geoUrl}
                             fill="#D6D6DA"
                             stroke="#FFFFFF"
                             strokeWidth={0.5} >
                    {({ geographies }) =>
                        geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                    }
                </Geographies>
                <Geographies geography={geoUrl}
                             fill="#000000"
                             stroke="#FFFFFF"
                             strokeWidth={0.5} >
                    {({ geographies }) =>
                        geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                    }
                </Geographies>
            </ComposableMap>

        </div>
    )
}

export default AnalyticMap;

