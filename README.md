# App Health

This is a dashboard that displays the health of apps monitored by Sqreen.

## Getting started

Visit [https://mauricesvay.github.io/app-health/](https://mauricesvay.github.io/app-health/) and login with your `x-user` token.

To run the app locally:

* Clone the repository.
* Install dependencies: `npm install`.
* Start the app: `npm start`
* The app is now available at [http://localhost:300/](http://localhost:300/)

## Technical details

* The app was bootstrapped with `create-react-app`
* State is managed with `setState`. It wasn't complex enough to require something like `redux`.
* It was mostly tested with the demo app provided by Sqreen.

## Things that could be improved

* Persist authentication (with cookies for example)
* Display more data provided by the API
* Improve browser compatibility
* Implement "click outside" for application list
* And many more thing…