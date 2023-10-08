/* global $ */
$(document).ready(function () {
  const checkedAmenities = {};

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
<div class="title_box">
<h2>${place.name}</h2>
<div class="price_by_night">$${place.price_by_night}</div>
</div>
<div class="information">
<div class="max_guest">${place.max_guest} Guests</div>
<div class="number_rooms">${place.number_rooms} Bedrooms</div>
<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
</div>
<div class="description">${place.description}</div>
</article>`;
      }));
    }
  });

  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }

    const list = Object.values(checkedAmenities);
    if (list.length > 0) {
      $('div.amenities h4').text(Object.values(checkedAmenities).join(', '));
    } else {
      $('div.amenities h4').html('&nbsp;');
    }
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
