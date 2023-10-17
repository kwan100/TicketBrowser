import {search, clear, table} from '../static/functions.js';

AOS.init();

document.addEventListener('keyup', async (event) => {
	if (event.key === 'Enter') {
		// if nothing is returned, no results were found
		const input = await search();
		if (!input) {
			return;
		}

		const response = await fetch(`events?keyword=${input.keyword}`);
		const events = await response.json();

		// Prompt the apporiate reponse to the search
		table(events);
    }
});

document.querySelector('#clearIcon').addEventListener('click', () => {
	document.querySelector('#clearIcon').style.display = 'none';
	clear();
});

document.querySelector('#keyword').addEventListener('input', () => {
	if (document.querySelector('#keyword').value) {
		document.querySelector('#clearIcon').style.display = 'inline';
	}
	else {
		document.querySelector('#clearIcon').style.display = 'none';
	}
});

document.querySelector('#keyword').addEventListener('click', () => {
	if (document.querySelector('#keyword').value) {
		document.querySelector('#clearIcon').style.display = 'inline';
	}
	else {
		document.querySelector('#clearIcon').style.display = 'none';
	}
});
