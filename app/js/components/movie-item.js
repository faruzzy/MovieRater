class Item extends HTMLElement {
	get rating() {
		return this.getAttribute('rating');
	}

	set rating(val) {
		this.setAttribute('rating', val);
	}

	get title() {
		return this.getAttribute('title');
	}

	get ratingBox() {
		return this.querySelector('rating-box');
	}

	connectedCallback() {
		this.innerHTML = `
			<span class="title">${this.title}</span>
			<rating-box rating="${this.rating}"></rating-box>
		`;

		let observer = new MutationObserver((mutations) => {
			this.rating = this.ratingBox.getAttribute('rating');
		});

		observer.observe(this.ratingBox, { attributes: true });
	}
}

const MovieItem = customElements.define('movie-item', Item);
export { MovieItem as default };
