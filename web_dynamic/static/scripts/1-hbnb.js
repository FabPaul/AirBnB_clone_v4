$(document).ready(function () {
	const checked_amenities = {};

	$(document).on("change", "input=[type='checkbox']", function () {
		if (this.checked) {
			checked_amenities[$(this).data("id")] = $(this).data("name");
		} else {
			delete checked_amenities[$(this).data("id")];
		}

		let list = object.values(checked_amenities);
		if (list.length > 0) {
			$("div.amenities > h4").text(object.values(checked_amenities).join(", "));
		} else {
			$("div.amenities > h4>").html("&nbsp");
		}
	});
});
