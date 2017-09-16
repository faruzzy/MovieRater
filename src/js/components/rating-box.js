class Rating extends HTMLElement {
	static get observedAttributes() {
		return ['rating'];
	}

	get rating() {
		return this.getAttribute('rating');
	}

	set rating(val) {
		this.setAttribute('rating', val);
	}

	connectedCallback() {
		this.innerHTML = `
			${
				[1, 2, 3, 4, 5].map(i => {
					return (i <= this.rating) ?  "<span class='circle filled' r=${i}></span>" : "<span class='circle' r=${i}></span>"
				}).join('')
			}	
		`;

		[...this.children].forEach((el, i) => {
			el.addEventListener('click', () => {
				this.rating = i + 1;
			});
		});
	}

	attributeChangedCallback(name, prev, curr) {
		[...this.children].forEach((el, i) => {
			if ((i + 1) <= this.rating)
				el.classList.add('filled');
			else
				el.classList.toggle('filled');
		});
	}

}

const RatingBox = customElements.define('rating-box', Rating);
export { RatingBox as default };
