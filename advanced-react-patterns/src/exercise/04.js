// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from "react";
import {Switch} from "../switch";

const callFuncs =
	(...funcs) =>
	(...args) =>
		funcs.forEach(func => func?.(...args));

function useToggle() {
	const [on, setOn] = React.useState(false);
	const toggle = () => setOn(!on);
	const getTogglerProps = ({onClick, ...customProps} = {}) => {
		return {
			"aria-pressed": on,
			onClick: callFuncs(toggle, onClick),
			...customProps,
		};
	};
	return {
		on, // still provide on prop here in case hook is not used specifically for a toggle component
		toggle, // still provide toggle prop
		getTogglerProps, // returns all the props that are typically needed by a switch/toggle type component
	};
}

function App() {
	const {on, getTogglerProps} = useToggle();
	return (
		<div>
			<Switch {...getTogglerProps({on})} />
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
