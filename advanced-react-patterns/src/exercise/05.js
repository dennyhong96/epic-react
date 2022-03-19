// State Reducer
// http://localhost:3000/isolated/exercise/05.js

import * as React from "react";
import {Switch} from "../switch";

const callAll =
	(...fns) =>
	(...args) =>
		fns.forEach(fn => fn?.(...args));

// To avoid typos
const toggleActionTypes = {
	toggle: "toggle",
	reset: "reset",
};

function toggleReducer(state, {type, initialState}) {
	switch (type) {
		case toggleActionTypes.toggle: {
			return {on: !state.on};
		}
		case toggleActionTypes.reset: {
			return initialState;
		}
		default: {
			throw new Error(`Unsupported type: ${type}`);
		}
	}
}

// 🐨 add a new option called `reducer` that defaults to `toggleReducer`
function useToggle({initialOn = false, reducer = toggleReducer} = {}) {
	const {current: initialState} = React.useRef({on: initialOn});

	const [state, dispatch] = React.useReducer(reducer, initialState);
	const {on} = state;

	const toggle = () => dispatch({type: toggleActionTypes.toggle});
	const reset = () => dispatch({type: toggleActionTypes.reset, initialState});

	function getTogglerProps({onClick, ...props} = {}) {
		return {
			"aria-pressed": on,
			onClick: callAll(onClick, toggle),
			...props,
		};
	}

	function getResetterProps({onClick, ...props} = {}) {
		return {
			onClick: callAll(onClick, reset),
			...props,
		};
	}

	return {
		on,
		reset,
		toggle,
		getTogglerProps,
		getResetterProps,
	};
}
// export {useToggle, toggleReducer, toggleActionTypes}
// import {useToggle, toggleReducer, toggleActionTypes}

function App() {
	const [timesClicked, setTimesClicked] = React.useState(0);
	const clickedTooMuch = timesClicked >= 4;

	function toggleStateReducer(state, action) {
		switch (action.type) {
			case toggleActionTypes.toggle: {
				if (clickedTooMuch) return {on: state.on};
				return {on: !state.on};
			}
			default: {
				return toggleReducer(state, action); // delegate to the default toggleReducer
			}
		}
	}

	const {on, getTogglerProps, getResetterProps} = useToggle({
		reducer: toggleStateReducer,
	});

	return (
		<div>
			<Switch
				{...getTogglerProps({
					disabled: clickedTooMuch,
					on: on,
					onClick: () => setTimesClicked(count => count + 1),
				})}
			/>
			{clickedTooMuch ? (
				<div data-testid="notice">
					Whoa, you clicked too much!
					<br />
				</div>
			) : timesClicked > 0 ? (
				<div data-testid="click-count">Click count: {timesClicked}</div>
			) : null}
			<button {...getResetterProps({onClick: () => setTimesClicked(0)})}>
				Reset
			</button>
		</div>
	);
}

export default App;
