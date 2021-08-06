import React, { MouseEventHandler } from "react";

type Props = {
	class: string | undefined;
	text: string;
	action: MouseEventHandler<HTMLButtonElement>;
};

const Button = (props: Props) => {
	return (
		<>
			<button onClick={props.action} className={props.class}>
				{props.text}
			</button>
		</>
	);
};

export default Button;
