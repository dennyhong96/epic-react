// Control Props
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
import {Switch} from "../switch";
import warning from "warning";

const callAll =
	(...fns) =>
	(...args) =>
		fns.forEach(fn => fn?.(...args));

const actionTypes = {
	toggle: "toggle",
	reset: "reset",
};

function toggleReducer(state, {type, initialState}) {
	switch (type) {
		case actionTypes.toggle: {
			return {on: !state.on};
		}
		case actionTypes.reset: {
			return initialState;
		}
		default: {
			throw new Error(`Unsupported type: ${type}`);
		}
	}
}

function useControlledSwitchWarning(
	controlPropValue,
	controlPropName,
	componentName,
) {
	const isControlled = ![null, undefined].includes(controlPropValue);
	const wasControlledRef = React.useRef(isControlled);
	const {current: wasControlled} = wasControlledRef;

	React.useEffect(() => {
		warning(
			!(isControlled && !wasControlled),
			`Warning: Prop ${controlPropName} is changing an uncontrolled input of type undefined to be controlled. Decide between using a controlled or uncontrolled value for the lifetime of the ${componentName} component. More info: https://fb.me/react-controlled-components`,
		);
		warning(
			!(!isControlled && wasControlled),
			`Warning: Prop ${controlPropName} is changing a controlled input of type undefined to be uncontrolled. Decide between using a controlled or uncontrolled value for the lifetime of the ${componentName} component. More info: https://fb.me/react-controlled-components`,
		);
	}, [isControlled, wasControlled, componentName, controlPropName]);
}

function useOnChangeReadOnlyWarning(
	controlPropValue,
	controlPropName,
	componentName,
	hasOnChange,
	onChangePropName,
	readOnly,
	readOnlyPropName,
	initialValueProp,
) {
	const isControlled = ![null, undefined].includes(controlPropValue);
	React.useEffect(() => {
		warning(
			!(isControlled && !hasOnChange && !readOnly),
			`${componentName} Component: Warning: Failed prop type: You provided a \`${controlPropName}\` prop to a form field without an \`onChange\` handler. This will render a read-only field. If the field should be mutable use \`defaultValue\`. Otherwise, set either \`${onChangePropName}\` or \`${readOnlyPropName}\`.`,
		);
	}, [
		controlPropValue,
		controlPropName,
		componentName,
		hasOnChange,
		onChangePropName,
		readOnly,
		readOnlyPropName,
		initialValueProp,
		isControlled,
	]);
}

function useToggle({
	initialOn = false,
	reducer = toggleReducer,
	on: controlledOn,
	onChange,
	readOnly = false,
} = {}) {
	// refs
	const {current: initialState} = React.useRef({on: initialOn});

	// states
	const [state, dispatch] = React.useReducer(reducer, initialState);

	// Derived states
	const isControlled = ![null, undefined].includes(controlledOn);
	const hasOnChange = Boolean(onChange);
	const on = isControlled ? controlledOn : state.on;

	// Warn devs they are using the hook wrong
	if (process.env.NODE_ENV !== "production") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useControlledSwitchWarning(controlledOn, "on", "useToggle"); // violation of rules of hook is fine here since process.env.NODE_ENV is never dynamic
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useOnChangeReadOnlyWarning(
			controlledOn,
			"on",
			"useToggle",
			hasOnChange,
			"onChange",
			readOnly,
			"readOnly",
			initialState,
		);
	}

	// Handlers
	const toggle = () => {
		dispatchWithOnChange({type: actionTypes.toggle});
	};
	const reset = () => {
		dispatchWithOnChange({type: actionTypes.reset, initialState});
	};

	// We want to call `onChange` any time we need to make a state change, but we
	// only want to call `dispatch` if `!onIsControlled` (otherwise we could get
	// unnecessary renders).
	const dispatchWithOnChange = action => {
		if (!isControlled) dispatch(action); // if state is controlled, no need to dispatch and cause an extra render
		if (onChange) {
			const nextState = reducer({...state, on}, action);
			onChange(nextState, action); // Call on change with "Suggested changes", and the action
		}
	};
	// 🦉 "Suggested changes" refers to: the changes we would make if we were
	// managing the state ourselves. This is similar to how a controlled <input />
	// `onChange` callback works. When your handler is called, you get an event
	// which has information about the value input that _would_ be set to if that
	// state were managed internally.
	// So how do we determine our suggested changes? What code do we have to
	// calculate the changes based on the `action` we have here? That's right!
	// The reducer! So if we pass it the current state and the action, then it
	// should return these "suggested changes!"

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

function Toggle({on: controlledOn, onChange, readOnly}) {
	const {on, getTogglerProps} = useToggle({
		on: controlledOn,
		onChange,
		readOnly,
	});
	return <Switch {...getTogglerProps({on})} />;
}

function App() {
	const [bothOn, setBothOn] = React.useState(false);
	const [timesClicked, setTimesClicked] = React.useState(0);

	function handleToggleChange(nextState, action) {
		if (action.type === actionTypes.toggle && timesClicked > 4) return;
		setBothOn(nextState.on);
		setTimesClicked(c => c + 1);
	}

	function handleResetClick() {
		setBothOn(false);
		setTimesClicked(0);
	}

	return (
		<div>
			<div>
				<Toggle on={bothOn} readOnly />
				<Toggle on={bothOn} onChange={handleToggleChange} />
			</div>
			{timesClicked > 4 ? (
				<div data-testid="notice">
					Whoa, you clicked too much!
					<br />
				</div>
			) : (
				<div data-testid="click-count">Click count: {timesClicked}</div>
			)}
			<button onClick={handleResetClick}>Reset</button>
			<hr />
			<div>
				<div>Uncontrolled Toggle:</div>
				<Toggle
					onChange={(...args) =>
						console.info("Uncontrolled Toggle onChange", ...args)
					}
				/>
			</div>
		</div>
	);
}

export default App;

// we're adding the Toggle export for tests
export {Toggle};
