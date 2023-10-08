/* global $ */
$(document).ready(function () {
  const checkedAmenities = {};

  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete checkedAmenities[$(this).attr('data-id')];
    }

    const list = Object.values(checkedAmenities);
    if (list.length > 0) {
      $('div.amenities h4').text(Object.values(checkedAmenities).join(', '));
    } else {
      $('div.amenities h4').html('&nbsp;');
    }
  });
});
