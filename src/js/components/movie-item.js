class Item extends HTMLElement {
	constructor() {
		super();

		const template = document.createElement('template');
		template.innerHTML = `
			<style>
				:host {
					box-sizing: border-box;
					display: block;
					border: 1px solid black;
					width: 350px;
				}

				.title {
					display: inline-block;
					width: 140px;
					padding: 2px;
				}
			</style>
			<span class="title">${this.title}</span>
			<rating-box rating="${this.rating}"></rating-box>
		`;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		const observer = new MutationObserver((mutations) => {
			this.rating = this.ratingBox.getAttribute('rating');
		});
		observer.observe(this.ratingBox, { attributes: true });
	}

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
		return this.shadowRoot.querySelector('rating-box');
	}
}

const MovieItem = customElements.define('movie-item', Item);
export { MovieItem as default };
