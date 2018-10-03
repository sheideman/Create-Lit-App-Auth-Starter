import { LitElement, html } from '@polymer/lit-element/';
import { store } from '../store';
import { signup } from '../actions/auth';

class SignupForm extends LitElement {
	render() {
		return html`
			<h3>Sign Up</h3>
      <form id="signin"  @submit="${e=>this.handleSubmit(e)}">
        <div class="field">
         <input type="email" name="email" placeholder="Email">
        </div>
        <div class="field">
         <input type="password" name="password" placeholder="Password">
        </div>
        <button class="ui button" type="submit">Sign Up</button>
      </form>
		`;
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
  
    const formData = new FormData(form);
    let json = {};
  
    for (const [key, value] of formData.entries()) {
      json[key] = value;
    };
    store.dispatch(signup(json));
    form.reset();
  }
}

customElements.define('signup-form', SignupForm);
