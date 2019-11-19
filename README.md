# Finder!

A simple application to search for a place and get directions to it from your current location.

## Running the app

```
yarn install
yarn start
```

## Third party library choices

- bootstrap:
    - Simplifies styling and helps build a decent looking application easily.
    - Only the parts of bootstrap used are imported to prevent loading unecessary styles.
- lodadebounce-promise:
    - Simplifies debouncing actions like typing in the Typeahead component.
- react-google-button:
    - Consistency of google branding across websites is important and this provides a quick and easy solution to styling.
- react-select:
    - Very powerful and simple to use typeahead that makes async searching a breeze.
- firebase:
    - Required to use firebase authentication.

## Improvements

If I were to continue with this project the changes I would make first would be:
- Add responsive styling for mobile screen sizes.
- Add component unit testing.
- Improve error handling as googles failure status responses are not particuarly human readable.
- I would move error UI to [react-toastify](https://github.com/fkhadra/react-toastify) including:
    - Locator error state under the typeahead.
    - Firebase authentication.
    - User current position failures and retry.
- Include lodash using its utilities like _.get to simplify code.
- Expand commenting by showing usage examples.