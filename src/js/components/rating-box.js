class Rating extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<style>
				:host {
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

			${
				[1, 2, 3, 4, 5].map(i => {
					return (i <= this.rating) ?  "<span class='circle filled' r=${i}></span>" : "<span class='circle' r=${i}></span>"
				}).join('')
			}	
		`;
	}

	connectedCallback() {
		[...this.shadowRoot.children].forEach((el, i) => {
			el.addEventListener('click', () => {
				this.rating = i + 1;
			});
		});
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
		[...this.shadowRoot.children].forEach((el, i) => {
			if ((i + 1) <= this.rating)
				el.classList.add('filled');
			else
				el.classList.toggle('filled');
		});
	}

}

const RatingBox = customElements.define('rating-box', Rating);
export { RatingBox as default };
