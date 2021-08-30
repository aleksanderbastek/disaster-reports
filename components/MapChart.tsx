import React, { memo } from "react";
import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";

import { useCountryTotalCount } from "../apiServices/apiService";
import { useConvertToISOA3 } from "../hooks/ISOA3Converter";

import GeographyItem from "./GeographyItem";

const geoUrl =
	"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
interface Props {
	selectCountry(country: string);
	setTooltipContent(content: string);
}
const MapChart = ({ selectCountry, setTooltipContent }: Props) => {
	const totalCountry = useCountryTotalCount();
	const isoTotalCountry = useConvertToISOA3(totalCountry.data);

	return (
		<>
			<ComposableMap
				data-tip=""
				projectionConfig={{
					rotate: [-10, 0, 0],
					scale: 180,
					center: [25, 0]
				}}
				style={{ outline: "none" }}
			>
				{totalCountry.data ? (
					<>
						<ZoomableGroup>
							<Geographies geography={geoUrl}>
								{({ geographies }) =>
									geographies.map(geo => {
										const d = isoTotalCountry.find(
											s => s.ISO3 === geo.properties.ISO_A3
										);
										return (
											<GeographyItem
												key={geo.rsmKey}
												geo={geo}
												d={d}
												selectCountry={selectCountry}
												setTooltipContent={setTooltipContent}
											/>
										);
									})
								}
							</Geographies>
						</ZoomableGroup>
					</>
				) : (
					<></>
				)}
			</ComposableMap>
		</>
	);
};

export default memo(MapChart);
