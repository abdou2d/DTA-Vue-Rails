# devise_token_auth + Vue + Rails API

## Contributors wanted
I am learning Vue and I like using Rails API mode and devise_token_auth. This is an attempt to show how you can pair them together. If you see something that can be improved, please submit a PR or open an issue.

## Getting started

```
Bundle install
Rails db:create db:migrate db:seed
Rails start
```

Cd into client directory

```
Npm install
Npm run start
```

After seeding there are 5 user available for you to login with. Each user has the email format `firstuser@example.com` `seconduser@example.com` and so on. The password for all users is `password`.

## Overview
I have tried to keep all the output as close to what came out of the generators (Rails generators and [Vue-webpack CLI](https://github.com/vuejs-templates/webpack)) with a few exceptions.

* Rails 
  * PG is the development database, I experienced too many errors with Sqlite
  * routes are namespaced under :api
  * rack-cors is set wide open
  * faker supplies the seed data
* Devise_token_auth 
  * configured without omniauthable or confirmable
  * current password is required for password changes
  * Tokens do NOT change on each request
* Vue
  * axios handles requests
  * [Bulma](https://github.com/jgthms/bulma) adds some basic styling

## Token Strategy
Tokens are saved to localStorage via axios interceptors in `main.js` one each successful request.

## State Management
A simple store is used to hold user data which is returned on login and token check. To populate the user data `validate_token` is called `beforeMount` to check if user headers are good and if so the user data is saved in the store.

## Still to do
* add confirmable
  * Show custom overrides to devise_token_auth controllers to remove redirects and change mailers to match
* add reset password
  * show custom overrides to devise_token_auth controllers to remove redirects and change mailers to match
* Deal with `401` on initial load if user headers are incorrect (doesn’t really affect function, just annoying to have a console error)
