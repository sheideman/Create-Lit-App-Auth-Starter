# Create-Lit-App Auth Example
An auth starter example for the awesome [create-lit-app](https://github.com/thepassle/create-lit-app)  by @thepassle. It uses javascript web tokens(JWT) to manage auth state (https://jwt.io/) by employing a passport strategy 

NOTE: This is super down and dirty -- most definitely can and should be refactored. Any upgrades/improvements welcome!



### Prerequisites

Make sure you have node, NPM & mongodb in some way shape or form.
I'm a fan of MongoDB Atlas a cloud-hosted MongoDB service 
engineered and run by the same team that builds the database. 
[Check them out!](https://mbsy.co/pq7N6) 
(full disclosure: I am an ambassador so they give me amazon gift cards for referrals -- but it is pretty easy to use and more affordable than things like mLab etc.)

### Installing

You can download this repository by using the green Clone or Download button on the top right hand side of this page. This will present you with the option to either clone the repository using Git, or to download it as a zip file.

If you want to download it using git, copy paste the link that is presented to you, then run the following at your terminal:
```
git clone git@github.com:sheideman/Create-Lit-App-Auth-Starter.git
cd Create-Lit-App-Auth-Starter
npm install
```
Copy or rename config.default.js  to config.js and add your own mongoDB Url, secret key and any other config vars you want to set up. You could also use environment variables if that is your jam.
Once your mongoDB instance is listening, then run:
```
npm start

```
App uses Vaadin Router authenticaton protocols to manage protected routes and auth state.
* Click "Sign Up" and enter email and password
* Click "Sign In" and enter your UN and PW from previous step 
* Should redirect you to "/users/me" to show your info and JWT


### Protecting Routes
```
//Example of a down and dirty i.e. NOT PRODUCTION READY function to protect routes for more, check out [Vaadin Router Docs](https://vaadin.com/router).
const requireAuth  = ()=>{
  const token =  window.localStorage.getItem('jwtToken');
  if(!token){
    return window.dispatchEvent(
      new CustomEvent('vaadin-router-go', {detail: {pathname: '/'}}));
	}
}

Then in setRoutes funciton in lit-app.js
{path: '/users/me',action: requireAuth, component: 'user-profile'},
```

## Contributing

We'd love to have your helping hand on create-lit-app! Feel free to create a pull request if you want to help out.

## Credits/helpful links
*  We wouldn't be here without it! --> [create-lit-app](https://github.com/thepassle/create-lit-app)
* The incredibly helpful web-padawan and his [polymer3-webpack-starter](https://github.com/web-padawan/polymer3-webpack-starter)
* These excellent [LitHTML examples](https://github.com/LarsDenBakker/lit-html-examples) by Lars den Bakker
* [litHTML](https://github.com/Polymer/lit-html)
* [Vaadin Router](https://github.com/vaadin/vaadin-router)
* [polymer PWA starter kit](https://github.com/Polymer/pwa-starter-kit)
* [create-react-app](https://github.com/facebook/create-react-app)

## Further reading
* [Redux](https://redux.js.org/introduction)
* [Making a fullstack app with lit](https://medium.com/@pascalschilp/making-a-fullstack-crud-app-with-lithtml-redux-express-and-webpack-fe7e5cf8b3ef)
