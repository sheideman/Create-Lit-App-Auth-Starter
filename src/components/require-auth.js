import { LitElement, html } from '@polymer/lit-element';
const requireAuth  = ()=>{
  const token =  window.localStorage.getItem('jwtToken');
  if(!token){
    return window.dispatchEvent(
      new CustomEvent('vaadin-router-go', {detail: {pathname: '/'}}));
  }
if(token){
  return html`
<slot></slot>
  `;
}
 }
class RequreAuth extends LitElement {
_render() {
return html`${requireAuth()}
`;
};
}
customElements.define('require-auth', RequreAuth);