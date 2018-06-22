`crews` is a React application that serves as a frontend for the `crews-be` application also available at my Github profile. It displays the song currently being listened to in Spotify and searches for the credits with the help of `crews-be`.

It's deployed at [Netlify][1]

Application keys are needed for [Spotify][2] to run the application. Also, a Spotify account is needed.

# Configuration

Configuration variables need to be set in a `.env.local` file. Since this project is bootstraped with [create-react-app][3], all vars start with `REACT_APP_`. They are all mandatory.

|Name|Description|
|----|-----------|
|REACT_APP_BE_DOMAIN|Domain where the backend is. If you're running locally `crews-be` with the default port, is likely `localhost:3001` (this app runs on 3000). If you want to hit the one deployed at Heroku, it's `https://crews-be.herokuapp.com`
|REACT_APP_SPOTIFY_CLIENT_ID|Given by Spotify when creating a [new application][2]|
|REACT_APP_SPOTIFY_SCOPES|Scopes to authenticate the app for. As of May 2018, `user-read-playback-state user-read-currently-playing` should suffice|
|REACT_APP_SPOTIFY_AUTHORIZE_URL|Url where the app redirects to authenticate. As of May 2018 it should be `https://accounts.spotify.com/authorize`. If it were to change, you'd probably find it at the [Spotify docs][2]

# Usage
1. Clone and run `yarn`
2. Run `yarn run start`

You'll be redirected to authenticate with Spotify first. After that, app should display the song you're listening to and the results or progress of the search.

# Component Stories

Components have stories using [storybok][4]. Run `yarn run storybook` and an instance of Storybook will run on `localhost:9001`.


[1]:https://crews.netlify.com/
[2]:https://beta.developer.spotify.com/documentation/web-api/
[3]:https://github.com/facebook/create-react-app
[4]:https://github.com/storybooks/storybook
