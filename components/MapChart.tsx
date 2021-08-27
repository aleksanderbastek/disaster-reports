import { scaleLinear } from "d3-scale";
import React, { memo } from "react";
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";

import { useCountryTotalCount } from "../apiServices/apiService";

const geoUrl =
	"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const colorScale = scaleLinear().domain([1, 150]).range(["#ffedea", "#ff5233"]);
interface Props {
	selectCountry(country: string);
	setTooltipContent(content: string);
}
const MapChart = ({ selectCountry, setTooltipContent }: Props) => {
	const totalCountry = useCountryTotalCount();

	return (
		<>
			<ComposableMap
				data-tip=""
				projectionConfig={{
					rotate: [-10, 0, 0],
					scale: 147
				}}
			>
				<Sphere stroke="#E4E5E6" strokeWidth={0.5} id="1" fill="#ffffff" />
				<Graticule stroke="#E4E5E6" strokeWidth={0.5} />
				<Geographies geography={geoUrl}>
					{info =>
						info.geographies.map(geo => {
							const d = totalCountry.data.find(
								s =>
									s.value === geo.properties.NAME_LONG ||
									s.value === geo.properties.NAME ||
									s.value === geo.properties.FORMAL_EN ||
									s.value === "Bolivia"
							);
							return (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									onClick={() => selectCountry(geo.properties.NAME)}
									fill={d ? colorScale(d.count) : "#F5F4F6"}
									onMouseEnter={() => {
										d
											? setTooltipContent(
													`${d.value} total cases - ${d.count}`
											  )
											: setTooltipContent("");
									}}
									onMouseLeave={() => {
										setTooltipContent("");
									}}
									style={{
										default: {
											outline: "none"
										},
										pressed: {
											fill: "#800080",
											outline: "none"
										},
										hover: {
											fill: "#800080",
											outline: "none"
										}
									}}
								/>
							);
						})
					}
				</Geographies>
			</ComposableMap>
		</>
	);
};

export default memo(MapChart);
