# A social media for sheet music.

A community for music makers to find and share original compositions and transcriptions of their favorite songs. 

Want to know how to play Britney Spears' "Toxic" on the bassoon? Chances are some helpful violinist has already transcribed it. Just save the sheet music (called a "scription") to your folder, hit "transpose," and voila -- now you've got the sheet music for "Toxic" in bass clef. While you're at it, give that helpful violinist a "like" to say thank you for their work.

Upload your own scription using the Scription Creator, a sandbox where you can type in note names and see and hear an instantly updated preview of your composition. Save your in-progress scriptions to a "drafts" folder, and your favorite scriptions by others in a "favorites" folder. 

## To run:

Scription is not yet in deployment. To play around in version 1.0, please fork and clone this repo to your local machine. In your terminal, navigate to the Scription folder. Run `npm install` then `npm run prod`, then navigate to localhost:3000 in your browser. 

Until Scription is deployed, you'll need to make your own Postgres instance to enable the database features. Supply the connection string for your database at line 3 of server/controllers/feedController.js. You can execute the file dump.sql to supply it with dummy data. To do so, run this command in your terminal: `psql YOUR-CONNECTION-STRING-HERE -f dump.sql`. 

## v. 1.1.0
*Home page*
![scription home page screenshot](public/assets/v.1.1main.png "Scription home page")

*Sign up*
![scription sign-up page screenshot](public/assets/v.1.1signup.png "Scription sign-up page")

*Scription Creator*
![scription creator screenshot](public/assets/v.1.1scriptioncreator.png "Scription Creator")

*Feed, likes, and comments*
![scription feed screenshot](public/assets/v.1.1feed.png "Feed, likes, and comments")


## Tech Stack

Built using React, Express, and PostgreSQL. Sheet music renderings and audio playback powered by [abcjs](https://github.com/paulrosen/abcjs).

*Scription's relational database schema:*

![scription relational database schema](public/assets/postgresql-schema.jpg "Scription's Postgres schema")

---

### Completed Features

- create and share scriptions using the Scription Creator
- see constantly-updating visual preview of sheet music as you type your scription
- buffer and play constantly-updating audio preview of your scription
- add titles, composers, and other annotations to your sheet music
- display scriptions in a feed
- add comments and likes to a scription
- display comments and likes on each scription
- play synthesized audio for each scription
- user authentication: read and write users to db, API, bcrypt, and cookies 

### In Progress

- bug fix: duplicate scriptions being created
- UX/UI for audio playback widgets

### Upcoming Features

- user folders: drafts and favorites
- user may provide suggested edits to a scription within a comment
- filter the feed using provided categories
- easy transposition between keys and between clefs
- audio playback will obey bpm if specified in the scription
- more authentication features: log out, forgot/reset password
