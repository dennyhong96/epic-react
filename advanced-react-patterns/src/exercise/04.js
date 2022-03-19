// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from "react";
import {Switch} from "../switch";

function useToggle() {
	const [on, setOn] = React.useState(false);
	const toggle = React.useCallback(() => setOn(!on), [on]);
	const getTogglerProps = React.useCallback(
		customProps => {
			return {
				"aria-pressed": on,
				onClick: toggle,
				...customProps,
			};
		},
		[on, toggle],
	);
	return {
		on,
		getTogglerProps,
	};
}

function App() {
	const {on, getTogglerProps} = useToggle();
	return (
		<div>
			<Switch on={on} {...getTogglerProps()} />
			<hr />
			<button
				{...getTogglerProps({
					"aria-label": "custom-button",
					onClick: () => console.log("clicked"),
					id: "custom-button-id",
				})}
			>
				{on ? "on" : "off"}
			</button>
		</div>
	);
}

export default App;

/*
eslint
  no-unused-vars: "off",
*/
