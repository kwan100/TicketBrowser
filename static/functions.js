// returns the user's input
export const search = async () => {
	// clear results
	const result = document.querySelector('#result');
	while (result.hasChildNodes()) {
		result.removeChild(result.lastChild);
	}

	const keyword = document.querySelector('#keyword').value;

	if (!keyword) {
		document.querySelector('#keyword').reportValidity();
		return;
	}

	const event = {
		keyword: keyword, 
	};

	return event;
};

export function table(events) {
	const result = document.querySelector('#result');
	const detail = document.querySelector('#detail');
	result.style.height = '100%';
	result.style.paddingTop = '5%';

	if (window.matchMedia('(max-width: 600px)').matches) {
		result.style.paddingTop = '10%';
	}

	// no records found
	if (!events._embedded) {
		while (result.hasChildNodes()) {
			result.removeChild(result.lastChild);
		}
		while (detail.hasChildNodes()) {
			detail.removeChild(detail.lastChild);
		}
		const div = document.createElement('div');
		result.style.paddingTop = '20%';
		if (window.matchMedia('(max-width: 600px)').matches) {
			result.style.paddingTop = '40%';
		}
		div.innerHTML = 'No Results Found';
		div.id = 'none';
		div.style.fontSize = '22px';
		result.appendChild(div);
		document.querySelector('#none').scrollIntoView();
		return;
	}

	// clear results
	while (result.hasChildNodes()) {
		result.removeChild(result.lastChild);
	}

	// clear results
	while (detail.hasChildNodes()) {
		detail.removeChild(detail.lastChild);
	}

	const carousel = document.createElement('div');
	carousel.id = 'carousel';
	carousel.className = 'carousel slide';
	const carouselInner = document.createElement('div');
	carouselInner.className = 'carousel-inner';

	if (window.matchMedia('(max-width: 600px)').matches) {
		// create row for each event
		for (let i = 0; i < events._embedded.events.length; i++) {
			let card, iterations;
			const row = document.createElement('div');
			row.className = 'row justify-content-center';
			const col = document.createElement('div');
			col.style.width = '325px';
			const carouselItem = document.createElement('div');

			if (i == 0) {
				carouselItem.className = 'carousel-item active';
			}
			else {
				carouselItem.className = 'carousel-item';
			}

			card = document.createElement('div');
			card.style.width = '300px';
			card.style.height = '275px';
			card.className = 'card border-primary';
			const cardImg = document.createElement('img');
			cardImg.src = events._embedded.events[i].images[0].url;
			cardImg.alt = '...';
			cardImg.className = 'card-img-top';
			cardImg.style.height = '150px';
			const cardBody = document.createElement('div');
			cardBody.className = 'card-body'
			const cardTitle = document.createElement('div');
			cardTitle.className = 'card-title'
			const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			let date = events._embedded.events[i].dates.start.localDate.split('-');
			let month = Number(date[1]);
			let day = Number(date[2]);
			let formatDate = monthNames[month - 1] + ' ' + day;
			if (events._embedded.events[i].dates.start.localTime) {
				let time = events._embedded.events[i].dates.start.localTime.split(':');
				var hours = Number(time[0]);
				var minutes = Number(time[1]);

				// calculate
				var timeValue;
				if (hours > 0 && hours <= 12) {
				timeValue= '' + hours;
				} else if (hours > 12) {
				timeValue= '' + (hours - 12);
				} else if (hours == 0) {
				timeValue= '12';
				}
				
				timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // get minutes
				timeValue += (hours >= 12) ? ' PM' : ' AM'
				formatDate += ' - ' + timeValue;
			}
			const split = document.createElement('div');
			split.style.clear = 'left';
			const cardText = document.createElement('div');
			cardText.className = 'card-text'
			if (events._embedded.events[i].name.length > 57) {
				cardText.innerHTML = events._embedded.events[i].name.substring(0, 56) + '...';
			}
			else {
				cardText.innerHTML = events._embedded.events[i].name;
			}
			const calendar = document.createElement('img');
			calendar.src = '../static/images/calendar.png';
			calendar.style.float = 'left';
			const format = document.createElement('div');
			format.innerHTML = formatDate;
			format.style.float = 'left';
			const cardVenue = document.createElement('div');
			cardVenue.className = 'cardVenue';
			cardVenue.style.float = 'left';
			cardTitle.appendChild(calendar);
			cardTitle.appendChild(format);
			cardBody.appendChild(cardTitle);
			cardBody.appendChild(split);
			cardBody.appendChild(cardText);
			if (events._embedded.events[i]._embedded && String(events._embedded.events[i]._embedded.venues[0].name) != 'undefined') {
				if (events._embedded.events[i]._embedded.venues[0].name.length > 28) {
					cardVenue.innerHTML = events._embedded.events[i]._embedded.venues[0].name.substring(0, 27) + '...';
				}
				else {
					cardVenue.innerHTML = events._embedded.events[i]._embedded.venues[0].name;
				}
				cardBody.appendChild(cardVenue);
			}
			if (events._embedded.events[i].id) {
				card.style.cursor = 'pointer';
				card.onclick = function(){
					eventDetails(events._embedded.events[i].id);
				}
			}
			card.appendChild(cardImg);
			card.appendChild(cardBody);
			col.appendChild(card);
			row.appendChild(col);
			carouselItem.appendChild(row);
			carouselInner.appendChild(carouselItem);
		}
	}
	else {
		// create row for each event
		for (let i = 0; i < events._embedded.events.length; i+=3) {
			let card, iterations;
			const row = document.createElement('div');
			row.className = 'row justify-content-center';
			const carouselItem = document.createElement('div');

			if (i == 0) {
				carouselItem.className = 'carousel-item active';
			}
			else {
				carouselItem.className = 'carousel-item';
			}

			if (events._embedded.events[i] && events._embedded.events[i + 1] && events._embedded.events[i + 2]) {
				iterations = 3;
			}
			else if (events._embedded.events[i] && events._embedded.events[i + 1]) {
				iterations = 2;
			}
			else if (events._embedded.events[i]) {
				iterations = 1;
			}

			for (let j = 0; j < iterations; j++) {
				const col = document.createElement('div');
				col.className = 'col-3 justify-content-center';
				card = document.createElement('div');
				card.style.width = '300px';
				card.style.height = '275px';
				card.className = 'card border-primary';
				const cardImg = document.createElement('img');
				cardImg.src = events._embedded.events[i + j].images[0].url;
				cardImg.alt = '...';
				cardImg.className = 'card-img-top';
				cardImg.style.height = '150px';
				const cardBody = document.createElement('div');
				cardBody.className = 'card-body'
				const cardTitle = document.createElement('div');
				cardTitle.className = 'card-title'
				const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				let date = events._embedded.events[i + j].dates.start.localDate.split('-');
				let month = Number(date[1]);
				let day = Number(date[2]);
				let formatDate = monthNames[month - 1] + ' ' + day;
				if (events._embedded.events[i + j].dates.start.localTime) {
					let time = events._embedded.events[i + j].dates.start.localTime.split(':');
					var hours = Number(time[0]);
					var minutes = Number(time[1]);

					// calculate
					var timeValue;
					if (hours > 0 && hours <= 12) {
					timeValue= '' + hours;
					} else if (hours > 12) {
					timeValue= '' + (hours - 12);
					} else if (hours == 0) {
					timeValue= '12';
					}
					
					timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // get minutes
					timeValue += (hours >= 12) ? ' PM' : ' AM'
					formatDate += ' - ' + timeValue;
				}
				const split = document.createElement('div');
				split.style.clear = 'left';
				const cardText = document.createElement('div');
				cardText.className = 'card-text'
				if (events._embedded.events[i + j].name.length > 57) {
					cardText.innerHTML = events._embedded.events[i + j].name.substring(0, 56) + '...';
				}
				else {
					cardText.innerHTML = events._embedded.events[i + j].name;
				}
				const calendar = document.createElement('img');
				calendar.src = '../static/images/calendar.png';
				calendar.style.float = 'left';
				const format = document.createElement('div');
				format.innerHTML = formatDate;
				format.style.float = 'left';
				const cardVenue = document.createElement('div');
				cardVenue.className = 'cardVenue';
				cardVenue.style.float = 'left';
				cardTitle.appendChild(calendar);
				cardTitle.appendChild(format);
				cardBody.appendChild(cardTitle);
				cardBody.appendChild(split);
				cardBody.appendChild(cardText);
				if (events._embedded.events[i + j]._embedded && String(events._embedded.events[i + j]._embedded.venues[0].name) != 'undefined') {
					if (events._embedded.events[i + j]._embedded.venues[0].name.length > 28) {
						cardVenue.innerHTML = events._embedded.events[i + j]._embedded.venues[0].name.substring(0, 27) + '...';
					}
					else {
						cardVenue.innerHTML = events._embedded.events[i + j]._embedded.venues[0].name;
					}
					cardBody.appendChild(cardVenue);
				}
				if (events._embedded.events[i + j].id) {
					card.style.cursor = 'pointer';
					card.onclick = function(){
						eventDetails(events._embedded.events[i + j].id);
					}
				}
				card.appendChild(cardImg);
				card.appendChild(cardBody);
				col.appendChild(card);
				row.appendChild(col);
			}

			carouselItem.appendChild(row);
			carouselInner.appendChild(carouselItem);
		}
	}

	carousel.appendChild(carouselInner);

	const prevButton = document.createElement('button');
	prevButton.className = 'carousel-control-prev';
	prevButton.type = 'button';
	prevButton.dataset.bsTarget = '#carousel';
	prevButton.dataset.bsSlide = 'prev';
	const prevIcon = document.createElement('span');
	prevIcon.className = 'carousel-control-prev-icon';
	prevIcon.ariaHidden = 'true';
	prevButton.appendChild(prevIcon);
	
	const nextButton = document.createElement('button');
	nextButton.className = 'carousel-control-next';
	nextButton.type = 'button';
	nextButton.dataset.bsTarget = '#carousel';
	nextButton.dataset.bsSlide = 'next';
	const nextIcon = document.createElement('span');
	nextIcon.className = 'carousel-control-next-icon';
	nextIcon.ariaHidden = 'true';
	nextButton.appendChild(nextIcon);

	carousel.appendChild(prevButton);
	carousel.appendChild(nextButton);
	const topResults = document.createElement('div');
	topResults.innerHTML = 'Top Results';
	topResults.style.fontSize = '22px';
	topResults.style.paddingBottom = '5%';
	if (window.matchMedia('(max-width: 600px)').matches) {
		topResults.style.paddingBottom = '10%';
	}
	result.appendChild(topResults);
	result.appendChild(carousel);

	document.querySelector('#carousel').scrollIntoView();
}

// return event details
export const eventDetails = async (id) => {
	const response = await fetch(`details?id=${id}`);
	const details = await response.json();

	// clear results
	const detail = document.querySelector('#detail');

	while (detail.hasChildNodes()) {
		detail.removeChild(detail.lastChild);
	}

	const cardText = document.createElement('div');
	cardText.className = 'card-text'
	const cardTitle = document.createElement('div');
	cardTitle.className = 'card-title'
	cardTitle.innerHTML = details.name;

	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let yyyymmdd;
	if (details.dates.start && details.dates.start.localDate) {
		yyyymmdd = details.dates.start.localDate.split('-');
	}
	let month = Number(yyyymmdd[1]);
	let day = Number(yyyymmdd[2]);
	let formatDate = monthNames[month - 1] + ' ' + day;
	if (details.dates.start && details.dates.start.localTime) {
		let time = details.dates.start.localTime.split(':');
		var hours = Number(time[0]);
		var minutes = Number(time[1]);

		// calculate
		var timeValue;
		if (hours > 0 && hours <= 12) {
		timeValue= '' + hours;
		} else if (hours > 12) {
		timeValue= '' + (hours - 12);
		} else if (hours == 0) {
		timeValue= '12';
		}
		
		timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // get minutes
		timeValue += (hours >= 12) ? ' PM' : ' AM'
		formatDate += ' - ' + timeValue;
	}
	const date = document.createElement('div');
	date.innerHTML = formatDate;
	const calendar = document.createElement('img');
	calendar.src = '../static/images/calendar.png';
	calendar.style.float = 'left';
	cardText.appendChild(calendar);
	cardText.appendChild(date);
	const split = document.createElement('div');
	split.style.clear = 'left';
	cardText.appendChild(split);
	if (details._embedded && details._embedded.venues && details._embedded.venues[0].name) {
		const a = document.createElement('a');
		const venueResponse = await fetch(`venues?name=${details._embedded.venues[0].name}`);
		const venueInfo = await venueResponse.json();
		if (venueInfo && venueInfo._embedded && venueInfo._embedded.venues) {
			const url = venueDetails(venueInfo);
			a.href = url;
			a.style.textDecoration = 'none';
			a.target = '_blank';
		}
		a.innerHTML = details._embedded.venues[0].name;
		cardText.appendChild(a);
	}

	if (details.priceRanges) {
		const div = document.createElement('div');
		if (details.priceRanges[0].min) {
			if (details.priceRanges[0].currency == 'USD') {
				div.innerHTML += '$' + details.priceRanges[0].min;
			}
			else {
				div.innerHTML += details.priceRanges[0].min;
			}
			if (details.priceRanges[0].currency && details.priceRanges[0].currency != 'USD') {
				div.innerHTML += ' ' + details.priceRanges[0].currency;
			}
			if (details.priceRanges[0].max && details.priceRanges[0].min != details.priceRanges[0].max) {
				if (details.priceRanges[0].currency && details.priceRanges[0].currency == 'USD') {
					div.innerHTML += ' - $' + details.priceRanges[0].max;
				}
				else if (details.priceRanges[0].currency && details.priceRanges[0].currency != 'USD') {
					div.innerHTML += ' - ' + details.priceRanges[0].max;
				}
				if (details.priceRanges[0].currency && details.priceRanges[0].currency != 'USD') {
					div.innerHTML += ' ' + details.priceRanges[0].currency;
				}
			}
		}
		else if (details.priceRanges[0].max) {
			if (details.priceRanges[0].currency == 'USD') {
				div.innerHTML += '$' + details.priceRanges[0].max;
			}
			else {
				div.innerHTML += details.priceRanges[0].max;
			}
			if (details.priceRanges[0].currency != 'USD' && details.priceRanges[0].currency) {
				div.innerHTML += ' ' + details.priceRanges[0].currency;
			}
		}
		div.style.fontWeight = '700';
		cardText.appendChild(div);
	}
	if (details.dates.status && details.dates.status.code) {
		if (details.dates.status.code == 'onsale') {
			const div = document.createElement('div');
			div.innerHTML = 'On Sale';
			div.style.color = 'green';
			cardText.appendChild(div);
		}
		else if (details.dates.status.code == 'offsale') {
			const div = document.createElement('div');
			div.innerHTML = 'Off Sale';
			div.style.color = 'red';
			cardText.appendChild(div);
		}
		else if (details.dates.status.code == 'cancelled') {
			const div = document.createElement('div');
			div.innerHTML = 'Cancelled';
			div.style.color = 'red';
			cardText.appendChild(div);
		}
		else if (details.dates.status.code == 'postponed') {
			const div = document.createElement('div');
			div.innerHTML = 'Postponed';
			div.style.color = 'orange';
			cardText.appendChild(div);
		}
		else if (details.dates.status.code == 'rescheduled') {
			const div = document.createElement('div');
			div.innerHTML = 'Rescheduled';
			div.style.color = 'orange';
			cardText.appendChild(div);
		}
	}
	if (details.url) {
		const a = document.createElement('a');
		a.href = details.url;
		a.target = '_blank';
		a.style.textDecoration = 'none';
		a.style.float = 'right';
		const img = document.createElement('img');
		img.id = 'ticketmaster';
		img.src = '../static/images/ticketmaster.png';
		a.appendChild(img);
		cardText.appendChild(a);
	}

	const card = document.createElement('div');
	card.style.width = '350px';
	card.style.height = '450px';
	card.className = 'card border-primary';
	const cardImg = document.createElement('img');
	const cardBody = document.createElement('div');
	cardBody.className = 'card-body'

	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardText);
	card.appendChild(cardBody);
	if (details.seatmap && details.seatmap.staticUrl) {
		cardImg.src  = details.seatmap.staticUrl;
		cardImg.alt = '...';
		cardImg.className = 'card-img-top';
		cardImg.style.height = '300px';
		card.appendChild(cardImg);
	}
	else {
		card.style.height = '185px';
	}
	card.id = 'detailCard';
	card.style.marginBottom = '5%';
	const row = document.createElement('div');
	row.className = 'row justify-content-center';
	row.appendChild(card);
	detail.appendChild(row);
	
	document.querySelector('#detailCard').scrollIntoView();
};

export function venueDetails(venueInfo) {
	let search;
	if (venueInfo._embedded.venues[0].address) {
		const div = document.createElement('div');
		div.innerHTML = 'Address: ' + venueInfo._embedded.venues[0].address.line1;
		search = venueInfo._embedded.venues[0].address.line1 + ',';
	}
	const div = document.createElement('div');
	if (venueInfo._embedded.venues[0].city && venueInfo._embedded.venues[0].city.name) {
		div.innerHTML += ' ' + venueInfo._embedded.venues[0].city.name + ',';
		search = venueInfo._embedded.venues[0].city.name + ',';
	}
	if (venueInfo._embedded.venues[0].state && venueInfo._embedded.venues[0].state.stateCode) {
		div.innerHTML += ' ' + venueInfo._embedded.venues[0].state.stateCode;
		search =  venueInfo._embedded.venues[0].state.stateCode + ',';
	}
	if (venueInfo._embedded.venues[0].postalCode) {
		const div = document.createElement('div');
		div.innerHTML = venueInfo._embedded.venues[0].postalCode;
		search =  venueInfo._embedded.venues[0].postalCode + ',';
	}
	return 'https://www.google.com/maps/search/?api=1&query=' + search;
}

// reset everything
export function clear() {
	// clear results
	const result = document.querySelector('#result');
	const detail = document.querySelector('#detail');
	result.style.height = '0%';
	result.style.paddingTop = '0%';
	while (result.hasChildNodes()) {
		result.removeChild(result.lastChild);
	}
	while (detail.hasChildNodes()) {
		detail.removeChild(detail.lastChild);
	}
	
	// reset values
	document.querySelector('#keyword').value = '';
};
