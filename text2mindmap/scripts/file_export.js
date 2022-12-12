// Save a file to the user's local drive.
fileExport = (function() {
	// Convert some data to a file and save it to the user's local drive with
	// the speficied filename and extension.
	function saveFile(data, filename, extension) {
	    const file = new Blob([data]);
	    if (window.navigator.msSaveOrOpenBlob) {
	        window.navigator.msSaveOrOpenBlob(file, filename + extension);
	    } else {
	    	const url = URL.createObjectURL(file);
	    	const a = document.createElement("a");
	        a.href = url;
	        a.download = filename + extension;
	        document.body.appendChild(a);
	        a.click();
	        setTimeout(function() {
	            document.body.removeChild(a);
	            window.URL.revokeObjectURL(url);
	        }, 0);
	    }
	}

	return {
		saveFile
	};
}());
