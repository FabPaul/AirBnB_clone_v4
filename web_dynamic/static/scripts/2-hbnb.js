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

	const url = "http://0.0.0.0:5001/api/v1/status/";
	$.get(url, function (data) {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	})
});
