import { scaleLinear } from "d3-scale";
import { Geography } from "react-simple-maps";

import { DataIso3 } from "../interfaces";

interface Props {
	geo: unknown;
	d: DataIso3;
	selectCountry(countryName: string | null);
	setTooltipContent(content: string | null);
}
const colorScale = scaleLinear().domain([1, 150]).range(["#ffedea", "#ff5233"]);

const GeographyItem = ({ geo, d, selectCountry, setTooltipContent }: Props) => {
	return (
		<Geography
			stroke="#ffffff"
			strokeWidth={0.5}
			geography={geo}
			onClick={() => selectCountry(d ? d.value : "")}
			fill={d ? colorScale(d.count) : "#F5F4F6"}
			onMouseEnter={() => {
				d
					? setTooltipContent(`${d.value} total cases - ${d.count}`)
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
};

export default GeographyItem;
