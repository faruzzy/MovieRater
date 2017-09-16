class Item extends HTMLElement {
	static get observedAttributes() {
		return ['rating'];
	}

	get rating() {
		return this.getAttribute('rating');
	}

	set rating(val) {
		this.getAttribute('rating', val);
	}

	get title() {
		return this.getAttribute('title');
	}

	connectedCallback() {
		this.innerHTML = `
			<span class="${this.title}">${this.title}</span>
			<rating-box rating="${this.rating}"></rating-box>
		`;
		let observer = new MutationObserver(() => {
			
		});

		observer.observe(this, { childList: true, attributes: true });
	}

	attributeChangedCallback(name, old, curr) {
		console.log('value:', curr);
	}
}

const MovieItem = customElements.define('movie-item', Item);
export { MovieItem as default };
