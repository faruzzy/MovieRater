const template = document.createElement('template');
template.innerHTML = `
	<style>
		:host {
			background: gray;
		}
	</style>
	<slot name="movie-item"></slot>
`;

class Movie extends HTMLElement {
	sortMovieItems() {
		this.movies
			.sort((a, b) => a.getAttribute('rating') < b.getAttribute('rating'))
			.forEach(el => {
				this.appendChild(el)
			});
	}

	get movies() {
		return Array.from(this.children);
	}

	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(template.content.cloneNode(true));	
	}

	connectedCallback() {
		let observer = new MutationObserver((mutations) => {
			this.sortMovieItems();
		});

		this.movies.forEach(item => observer.observe(item, { attributes: true }));
		this.sortMovieItems();
	}
}

let MovieList = customElements.define('movie-list', Movie);
export { MovieList as default };
