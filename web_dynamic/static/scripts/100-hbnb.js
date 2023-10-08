/* global $ */
$(document).ready(function () {
  const checkedAmenities = {};
  const checkedCities = {};
  const checkedStates = {};

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

  $(document).on('change', "input[id='amenities']", function () {
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
  $(document).on('change', "input[id='states'], input[id='cities']", function () {
    if (this.checked) {
      if (this.id === 'states') {
        checkedStates[$(this).data('id')] = $(this).data('name');
      } else {
        checkedCities[$(this).data('id')] = $(this).data('name');
      }
    } else {
      if (this.id === 'states') {
        delete checkedStates[$(this).data('id')];
      } else {
        delete checkedCities[$(this).data('id')];
      }
    }

    const selectedStates = Object.values(checkedStates).join(', ');
    const selectedCities = Object.values(checkedCities).join(', ');

    const selectedLocations = [];

    if (selectedStates) {
      selectedLocations.push(selectedStates);
    }

    if (selectedCities) {
      selectedLocations.push(selectedCities);
    }

    const locationsText = selectedLocations.join(', ');

    if (locationsText.length > 0) {
      $('div.locations h4').text(locationsText);
    } else {
      $('div.locations h4').html('&nbsp;');
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

  $('button').click(function () {
    $('SECTION.places').empty();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({
        amenities: Object.keys(checkedAmenities),
        cities: Object.keys(checkedCities),
        states: Object.keys(checkedStates)
      }),
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
  });
});
