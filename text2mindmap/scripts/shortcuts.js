// Logic for handling bindings for keyboard shortcuts.
shortcuts = (function() {
	const bindings = {};

	// Handler function for all keypress events the user makes.
	// Will convert the key-combination to a string and compare it to existing
	// shortcut bindings. If the binding is found, call the appropriate function.
	function handleKeypress(event) {
		const keys = [event.key.toLowerCase()];
		if (event.shiftKey) {
			keys.push("shift");
		}
		if ((event.ctrlKey || event.metaKey)) {
			keys.push("ctrl");
		}
		if (event.altKey) {
			keys.push("alt");
		}
		for (let key in bindings) {
			if (keysEqual(key.split("+"), keys)) {
				event.preventDefault();
				bindings[key]();
			}
		}
	}

	// Add a keyboard binding to the list.
	// Shortcut is a string formatted like this: "ctrl+shift+v"
	// Callback is the function to call when the shortcut is pressed.
	function addBinding(shortcut, callback) {
		bindings[shortcut.toLowerCase()] = callback;
	}

	// Add an array of bindings to the list.
	function addBindings(newBindings) {
		for (let binding in newBindings) {
			bindings[binding.toLowerCase()] = newBindings[binding];
		}
	}

	// Check if two arrays of keys are equal.
	function keysEqual(keys1, keys2) {
		if (!keys1 || !keys2) {
			return false;
		}
		if (keys1.length !== keys2.length) {
			return false;
		}
		keys1.sort();
		keys2.sort();
		for (let i = 0; i < keys1.length; i++) {
			if (keys1[i] instanceof Array && keys2[i] instanceof Array) {
				if (!keys1[i].equals(keys2[i])) {
					return false;
				}
			} else if (keys1[i] !== keys2[i]) {
				return false;
			}
		}
		return true;
	}

	return {
		addBinding,
		addBindings,
		handleKeypress
	};
}());