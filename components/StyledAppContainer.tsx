import { Menu } from "antd";
import styled from "styled-components";
interface ListWrapperProps {
	showList: boolean;
	isLoading: boolean;
}
export const SearchWrapper = styled.div`
	z-index: 999;
`;
export const ListWrapper = styled.div<ListWrapperProps>`
	position: absolute;
	right: ${props => (props.showList && !props.isLoading ? "0%" : "-100%")};
	margin: 10px;
	width: 40vw;
	transition: 1s;
	z-index: 999;
	background-color: white;
`;

export const HeaderListWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const MenuS = styled(Menu)`
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 60px;
`;

export const Logo = styled.div`
	display: flex;
	align-items: center;
	font-family: "Anton", sans-serif;
	font-weight: 600;
	font-size: 2.4em;
	color: white;
`;
