// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";
import {Switch} from "../switch";

// 💰 React.Children.map(props.children, child => {/* return child clone here */})
// 📜 https://reactjs.org/docs/react-api.html#reactchildren
// 📜 https://reactjs.org/docs/react-api.html#cloneelement

function Toggle({children}) {
	const [on, setOn] = React.useState(false);
	const toggle = () => setOn(!on);

	// 🐨 replace this with a call to React.Children.map and map each child in
	// props.children to a clone of that child with the props they need using
	// React.cloneElement.

	return React.Children.map(children, child => {
		console.log(child);
		if (typeof child.type === "string") return child;
		switch (child.type.name) {
			case "ToggleOn":
			case "ToggleOff": {
				return React.cloneElement(child, {on});
			}
			case "ToggleButton": {
				return React.cloneElement(child, {on, toggle});
			}
			default: {
				return null;
			}
		}
	});
}

// 🐨 Flesh out each of these components

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({children, on}) => (on ? children : null);

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({children, on}) => (on ? null : children);

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />;

Toggle.On = ToggleOn;
Toggle.Off = ToggleOff;
Toggle.Button = ToggleButton;

function App() {
	return (
		<div>
			<Toggle>
				<Toggle.On>The button is on</Toggle.On>
				<Toggle.Off>The button is off</Toggle.Off>
				<Toggle.Button />
				<span>Hello</span>
			</Toggle>
		</div>
	);
}

export default App;

/*
eslint
  no-unused-vars: "off",
*/
