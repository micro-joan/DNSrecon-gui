// Logic for importing a Markdown document from the user's lcoal drive.
// A hidden <input type="file"> tag i clicked and the user is prompted to choose the file.
fileImport = (function() {
	// Only set up the listener if file reading is supported.
	$(document).ready(function() {
		if (window.FileReader) {
			$("#file-input").on("change", fileInput);
		}
	})

	// Handler function for whenever the user chooses a file from the dialog prompt.
	function fileInput(event) {
		event.stopPropagation();
		event.preventDefault();
		let files = null;
		if (event.target && event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0];
			const reader = new FileReader();
			const fileName = selectedFile.name;
			reader.onloadend = function(event) {
				handleUpload(event, fileName);
			};
			reader.readAsText(selectedFile);
		}
		$("#file-input").val("");
	}

	// Handler method for when the file has been loaded from the drive.
	function handleUpload(event, fileName) {
		if (event.target.readyState !== 2) {
			return;
		}
		if (event.target.error) {
			alert("There was an error opening the file.");
			return;
		}
		const content = event.target.result;

		documentTitle.setTitle(fileName.replace("/\.txt$/", ""));
		$("#textArea").val(content);
		mindmap.render();
		unsavedChanges.setHasChanges(false);
		settings.setSetting("documentTitle", settings.getDefaultValue("documentTitle"));
		settings.setSetting("documentContent", settings.getDefaultValue("documentContent"));
	}

	// Try to click the hidden <input type="file"> tag, triggering the file upload process.
	function chooseFile() {
		if (!window.FileReader) {
			alert("Your browser doesn't support opening files, consider upgrading to a newer version of your browser.");
			return;
		}
		$("#file-input").click();
	}

	return {
		chooseFile
	};
}());
