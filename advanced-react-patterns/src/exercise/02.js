// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";
import {Switch} from "../switch";

// 💰 React.Children.map(props.children, child => {/* return child clone here */})
// 📜 https://reactjs.org/docs/react-api.html#reactchildren
// 📜 https://reactjs.org/docs/react-api.html#cloneelement

const allowedTypes = [
	"ToggleOn",
	"ToggleOff",
	"ToggleButton",
	"MyToggleButton",
];

function Toggle({children}) {
	const [on, setOn] = React.useState(false);
	const toggle = () => setOn(!on);
	return React.Children.map(children, child => {
		console.log(child);
		if (
			typeof child.type === "string" ||
			!allowedTypes.includes(child.type.name)
		) {
			return child;
		}
		return React.cloneElement(child, {on, toggle});
	});
}

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({children, on}) => (on ? children : null);

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({children, on}) => (on ? null : children);

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />;

// User can also grab implicitly shared state and create custom compound component children
const MyToggleButton = ({on}) => (on ? "On yoo!" : "Off yoo!");

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
				<p>Hello</p>
				<MyToggleButton />
			</Toggle>
		</div>
	);
}

export default App;
