// Logic for the general modal UI.
modal = (function() {
	let $tabs;
	let $contents;
	let $close;

	$(document).ready(function() {
		// Setup jQuery element.
		$tabs = $(".modal-tabs > li");
		$contents = $(".tab-content");
		$close = $(".close-modal");

		// Close the modal
		$close.on("click touchstart", function() {
			$(this).closest(".modal").removeClass("active");
		});

		// Switch to the clicked tab
		$tabs.on("click touchstart", function() {
			$contents.removeClass("active");
			$(`#${$(this).data("tab")}`).addClass("active");
			$tabs.removeClass("active");
			$(this).addClass("active");
		});
	})
}());
