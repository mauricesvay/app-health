# App Health

This is a dashboard that displays the health of apps monitored by Sqreen.

## Getting started

Visit [https://mauricesvay.github.io/app-health/](https://mauricesvay.github.io/app-health/) and login with your `x-user` token.

To run the app locally:

-   Clone the repository.
-   Install dependencies: `npm install`.
-   Start the app: `npm start`
-   The app is now available at [http://localhost:3000/](http://localhost:3000/)

## Technical details

-   The app was bootstrapped with `create-react-app`
-   State is managed with `setState`. It wasn't complex enough to require something like `redux`.
-   The app uses some library such as:
    -   React for UI
    -   Axios for HTTP requests
    -   DayJs for date formatting
    -   Recharts for charts
    -   human-format for formatting numbers
    -   country-data for displaying country flags
-   It was mostly tested with the demo app provided by Sqreen.
-   Styles are vanilla CSS, following a BEM-ish convention

## Things that could be improved

-   Persist authentication (with cookies for example)
-   Display more data provided by the API
-   Improve browser compatibility
-   Implement "click outside" for application list
-   Accessibility
-   And many more thing…

## For devs

-   See [Getting started](#getting-started)
-   To deploy, `npm run deploy`
