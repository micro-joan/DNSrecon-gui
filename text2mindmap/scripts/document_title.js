// Logic for the document title input field. To properly resize the input field,
// a hidden input field is mirroring the visible's field's text.
documentTitle = (function() {
	// Max width for the input element.
	const maxWidth = 300;
	// The amount of extra width to add to the input element.
	const extraWidth = 3;

	// Set up the jQuery elements.
	let $input;
	let $mirror;

	let oldTitle;

	$(document).ready(function() {
		$input = $(`.document-title-input`);
		$mirror = $(`.document-title-mirror`);
		
		// When the input loses focus, finalize the title
		$input.on("focusout", function(event) {
			setTitle($input.val());
		});

		// When the input is changed, mirror the text to the hidden input.
		$input.on("input change load focusout", function() {
			mirrorWidth($input, $mirror);
		});

		// When the input is clicked, highlight the text if it's the default title.
		$input.on("focus", function(event) {
			if ($input.val() === settings.getDefaultValue("documentTitle")) {
				$input.select();
			}
		});

		// If the enter or escape key is pressed, either finalize the title or
		// cancel the edit and revert to the old title.
		$input.on("keydown", function(key) {
			if (key.keyCode === 13) {
				$input.blur();
			} else if (key.keyCode === 27) {
				$input.val(oldTitle);
				$input.blur();
			}
		});
	});

	// Get the document's title.
	function getTitle() {
		$input.blur();
		return $input.val();
	}

	// Set the document's title
	function setTitle(title) {
		if (title === null || title === "") {
			title = settings.getDefaultValue("documentTitle");
		}
		$input.val(title);
		oldTitle = title;
		mirrorWidth($input, $mirror);
		unsavedChanges.setHasChanges(true);
		settings.setSetting("documentTitle", title);
	}

	// Shift focus to the title input.
	function focus() {
		$input.focus();
	}

	// Mirror the text of the visble input to the hidden input.
	// This is used to resize the input width dynamically.
	function mirrorWidth($input, $mirror) {
		$mirror.text($input.val());
		let width = parseInt($mirror.css("width"));
		if (!isNaN(width)) {
			width += extraWidth;
			width = Math.min(maxWidth, width);
			$input.css("width", width + "px");
		}
	}

	return {
		getTitle,
		setTitle,
		focus
	};
}());
