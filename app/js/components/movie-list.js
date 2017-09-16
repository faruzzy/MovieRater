class Movie extends HTMLElement {
	sortMovieItems() {
		this.movies
			.sort((a, b) => a.getAttribute('rating') < b.getAttribute('rating'))
			.forEach(el => {
				this.appendChild(el)
			});
	}

	connectedCallback() {
		customElements.whenDefined('movie-item').then(() => {
			let shadowRoot = this.attachShadow({mode: 'open'});
			shadowRoot.innerHTML = ` <slot name="movie-item"></slot> `; 

			this.movies = [...this.children];
			let observer = new MutationObserver((mutations) => {
				//this.sortMovieItems();
			});
			this.movies.forEach(item => observer.observe(item, { childList: true }));
			this.sortMovieItems();
		});

	}
}

let MovieList = customElements.define('movie-list', Movie);
export { MovieList as default };
