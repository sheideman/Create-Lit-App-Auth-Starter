import { LitElement, html } from '@polymer/lit-element/';

class SignoutPage extends LitElement {
	render() {
		return html`
			<h1>Goodbye!</h1>
			<p>
				Y'all come back now hear?
			</p>
		`;
	}
}

customElements.define('signout-page', SignoutPage);
