// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from "react";
import {Switch} from "../switch";

const ToggleContext = React.createContext(null);
ToggleContext.displayName = "ToggleContext";
const ToggleProvider = ({children}) => {
	const [on, setOn] = React.useState(false);
	const toggle = React.useCallback(() => setOn(!on), [on]);
	return (
		<ToggleContext.Provider value={{on, toggle}}>
			{children}
		</ToggleContext.Provider>
	);
};
const useToggle = () => {
	const context = React.useContext(ToggleContext);
	if (!context) {
		throw new Error(`useToggle must be used inside a ToggleProvider`);
	}
	return context;
};

function Toggle({children}) {
	return <ToggleProvider>{children}</ToggleProvider>;
}

function ToggleOn({children}) {
	const {on} = useToggle();
	return on ? children : null;
}

function ToggleOff({children}) {
	const {on} = useToggle();
	return on ? null : children;
}

function ToggleButton({...props}) {
	const {on, toggle} = useToggle();
	return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
	return (
		<div>
			<Toggle>
				<ToggleOn>The button is on</ToggleOn>
				<ToggleOff>The button is off</ToggleOff>
				{/* cloneElement solution must have compound components as direct children */}
				{/* with Context, we can have compound components nested however deep */}
				<div>
					<ToggleButton />
				</div>
				<span>Hello</span>
			</Toggle>
		</div>
	);
}

export default App;
