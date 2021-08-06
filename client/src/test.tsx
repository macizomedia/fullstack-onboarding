import React, { Children } from "react";
import styled from "styled-components";

const Header = styled.div`
	position: flex;
	color: red;
`;

type Props = { children: React.ReactNode; text: string; logo: string };

const myFunction = (props: Props) => {
	return (
		<div>
			<img src={props.logo} alt="logo" />
			<Header>{props.text}</Header>
			{props.children}
		</div>
	);
};
