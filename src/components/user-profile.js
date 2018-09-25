import { LitElement, html } from '@polymer/lit-element';
import {fetchUserRequest, signout} from '../actions/auth';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
class UserProfile extends connect(store)(LitElement) {
	_firstRendered(){
		store.dispatch(fetchUserRequest());
	}
_render({user, authenticated}) {

return html`
<div>
<button on-click="${()=>store.dispatch(signout)}">Sign Out</button>
<h3>User Profile</h3>
<p>Email:${user.email}</p>
<p>Token:${authenticated}</p>
</div>
`;
};
 static get properties() { return {
  // This is the data from the store.
authenticated:String,
errorMessage:String,
user:Object
 }
}
  // This is called every time something is updated in the store.
 _stateChanged(state) {
this.authenticated = state.auth.authenticated;
this.errorMessage = state.auth.errorMessage;
this.user = state.auth.user;
}
}
window.customElements.define('user-profile', UserProfile);