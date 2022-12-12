// Logic for the top navigation bar (navbar) in the app.
navbar = (function() {
	// Close all open dropdowns from the navbar.
	function closeDropdowns() {
		$(".navbar-dropdown .dropdown-content").hide();
	}

	// Set the state of the visibility icon of a dropdown item,
	// signaling whether something is displayed or not.
	function setVisibilityIcon(buttonId, visibility) {
		$(`#${buttonId} > i`).removeClass("fa-eye fa-eye-slash");
		if (visibility) {
			$(`#${buttonId} > i`).addClass("fa-eye");
		} else {
			$(`#${buttonId} > i`).addClass("fa-eye-slash");
		}
	}

	$(document).ready(function() {
		// A map of dropdown item ids and functions to call when the item is clicked.
		const idFunctionMap = {
			"file-new": appFunctions.fileNew,
			"file-open": appFunctions.fileOpen,
			"file-save": appFunctions.fileSave,
			"file-rename": appFunctions.fileRename,
			"file-preferences": appFunctions.filePreferences,
		};

		let $links = $(".navbar a");

		// When the dropdown item is clicked, call the appropriate function.
		$links.on("click", function(event) {
			if ($(this).attr("href") === "#") {
				event.preventDefault();
			}
			const id = $(this).attr("id");
			if (id in idFunctionMap) {
				idFunctionMap[id]($(this));
				closeDropdowns();
			}
		});

		// Close all open dropdowns if the user clicks anywhere but the dropdown.
		$(document).click(function(event) {
			closeDropdowns();
			let $navbarDropdown = $(event.target).parent(".navbar-dropdown");
			if ($navbarDropdown.length !== 0) {
				$navbarDropdown.find(".dropdown-content").show();
			}
		});
	});

	return {
		setVisibilityIcon
	}
}());