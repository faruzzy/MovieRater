class Rating extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					box-sizing: border-box;
					display: inline-block;
					width: 200px;
				}

				.circle {
					border: 1px solid black;
					border-radius: 50px;
					width: 20px;
					height: 20px;
					display: inline-block;
					margin: 7px 4px;
				}

				.filled {
					background: yellow;
				}
			</style>
			${this.view}
		`;
	}

	connectedCallback() {
		this.children.forEach((el) => {
			el.addEventListener('click', () => {
				this.rating = el.getAttribute('r');
			});
		});
	}

	get children() {
		return this.shadowRoot.querySelectorAll('span');
	}

	get view() {
		return [1, 2, 3, 4, 5].map(i => {
			if (i <= this.rating)
				return `<span r=${i} class='circle'></span>`;
			else
				return `<span r=${i} class='circle'></span>`;
		}).join('');
	}

	static get observedAttributes() {
		return ['rating'];
	}

	get rating() {
		return this.getAttribute('rating');
	}

	set rating(val) {
		this.setAttribute('rating', val);
	}

	attributeChangedCallback(name, prev, curr) {
		this.children.forEach((el, i) => {
			if (el.matches('span') && el.getAttribute('r') <= this.rating)
				el.classList.add('filled');
			else
				el.classList.remove('filled');
		});
	}

}

const RatingBox = customElements.define('rating-box', Rating);
export { RatingBox as default };
