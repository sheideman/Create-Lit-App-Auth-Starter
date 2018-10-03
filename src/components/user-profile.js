import { LitElement, html } from '@polymer/lit-element';
import { fetchUserRequest, signout } from '../actions/auth';
import { connect } from 'pwa-helpers/connect-mixin.js';
import {  store } from '../store.js';

class UserProfile extends connect(store)(LitElement) {
  firstUpdated() {
    store.dispatch(fetchUserRequest());
  }

  render() {
    return html`
    <button @click="${()=>store.dispatch(signout)}">Sign Out</button>
    <h3>User Profile</h3>
    <p>Email:${this.user.email}</p>
    <p>Token:${this.authenticated}</p>
    `;
  }

  static get properties() {
    return {
      authenticated: String,
      errorMessage: String,
      user: Object
    }
  }
  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this.authenticated = state.auth.authenticated;
    this.errorMessage = state.auth.errorMessage;
    this.user = state.auth.user;
  }
}
customElements.define('user-profile', UserProfile);