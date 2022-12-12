// A library of various functions that can be called by the app.
// This is kept in a seperate module, so the navbar and the shortcuts can call the same functions.
appFunctions = (function() {
	return {
		// Discard the current document and create an empty one.
		fileNew() {
			if (!unsavedChanges.confirmContinue()) {
				return;
			}
			$("#textArea").val(settings.getDefaultValue("documentContent"));
			mindmap.render();
			documentTitle.setTitle(settings.getDefaultValue("documentTitle"));
			unsavedChanges.setHasChanges(false);
			settings.setSetting("documentContent", settings.getDefaultValue("documentContent"));
			settings.setSetting("documentTitle", settings.getDefaultValue("documentTitle"));
		},

		// Open a markdown file from the user's computer
		fileOpen() {
			if (!unsavedChanges.confirmContinue()) {
				return;
			}
			fileImport.chooseFile();
		},

		// Save the current markdown document to the user's computer
		fileSave() {
			const content = $("#textArea").val();
			const title = documentTitle.getTitle();
			const type = ".txt";
			fileExport.saveFile(content, title, type);
			unsavedChanges.setHasChanges(false);
			settings.setSetting("documentTitle", settings.getDefaultValue("documentTitle"));
			settings.setSetting("documentContent", settings.getDefaultValue("documentContent"));
		},

		// Set the focus on the input box for renaming the document
		fileRename() {
			documentTitle.focus();
		},

		// Open the settings modal
		filePreferences() {
			$("#settings-modal").addClass("active");
		}
	};
}());