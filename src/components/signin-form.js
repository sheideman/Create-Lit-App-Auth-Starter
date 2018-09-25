import { LitElement, html } from '@polymer/lit-element';
import {store} from '../store';
import {signin} from '../actions/auth';



class SigninForm extends LitElement {

_render() {

return html`
<h3>Sign In</h3>
<form id="signin"  on-submit="${e=>this.handleSubmit(e)}">
  <div class="field">
    <input type="email" name="email" placeholder="Email">
  </div>
  <div class="field">
    <input type="password" name="password" placeholder="Password">
  </div>
  <button class="ui button" type="submit">Sign In</button>
</form>
`;
};
handleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const formData = new FormData(form);
  let json = {};

  for (const [key, value] of formData.entries()) {
    json[key] = value;
  };
  store.dispatch(signin(json));
  form.reset();
}
}
customElements.define('signin-form', SigninForm);