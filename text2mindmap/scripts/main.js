(function() {
    if (/Mobi/.test(navigator.userAgent)) {
        alert("The website doesn't currently work very well in mobile browsers, so it's recommended that you use a computer. Sorry about that!")
    }

    $(document).ready(function() {
        documentTitle.setTitle(settings.getSetting("documentTitle"));

        // Before the user closes the window, warn them if they have unsaved changes.
        $(window).on("beforeunload", function(event) {
            if (unsavedChanges.getHasChanges() && false ) { //TODO:
                const message = "You have unsaved changes. Are you sure you want to leave without saving?";
                if (event) {
                    event.returnValue = message;
                }
                return message;
            }
            return;
        });

        // Set up shortcut bindings
	    $(document).on("keydown", shortcuts.handleKeypress);
	    const bindings = {
            "Ctrl+N": appFunctions.fileNew,
            "Ctrl+O": appFunctions.fileOpen,
            "Ctrl+S": appFunctions.fileSave
        };
        shortcuts.addBindings(bindings);

        $("#modal-settings-save").on("click", function() {
            $(".modal").removeClass("active");
        });

        $("#textArea").val(settings.getSetting("documentContent"));
        mindmap.render();
    
        function updateMindMap() {
            const value = $("#textArea").val();
            unsavedChanges.setHasChanges(value !== settings.getDefaultValue("documentContent"));
            settings.setSetting("documentContent", value);
            mindmap.render();
        }

        $('#textArea').on("input propertychange", updateMindMap);
        $('#textArea').on("keydown", function(e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode == 9 || keyCode == 13) { 
                updateMindMap();
            } 
            unsavedChanges.setHasChanges(true);
        });
    })
}());