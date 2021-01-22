# A social media for sheet music.

A community for music makers to find and share original compositions and transcriptions of their favorite songs. 

Want to know how to play Britney Spears' "Toxic" on the bassoon? Chances are some helpful violinist has already transcribed it. Just save the sheet music to your music folder, hit "transpose," and voila -- now you've got the sheet music for "Toxic" in bass clef. While you're at it, give that helpful violinist a "like" to say thank you for their work.

Want to find Irish tunes to play at your local session? Before you pack up for the pub, use the navbar to filter your feed by genre, era, or artist. Add the scriptions you're interested in to a list and hit "share" to email them to your fiddling friends, or save the list for easy retrieval on your mobile device later.

Problem in the third measure? You can comment on a user's transcription to let them know or provide an edited version of their transcription. But be nice -- Scription runs on social currency. Each piece of sheet music you save to your music folder costs a little reputation. Your reputation will grow when others like your transcriptions or comments, so pitch in!

Upload your own "scription" using the Scription Creator, a sandbox where you can type in note names and see and hear an instantly updated preview of your composition. Save your in-progress scriptions to a "drafts" folder, and your favorite scriptions by others in a "favorites" folder. 

## Tech Stack

Built using React, Express, and PostgreSQL.

Sheet music renderings and audio playback powered by [abcjs](https://github.com/paulrosen/abcjs).

The database schema:
![scription relational database schema](/public/assets/postgresql-schema.jpg)

## Completed Features

- create and share scriptions using the Scription Creator
- see constantly-updating visual preview of sheet music as you type your scription
- buffer and play constantly-updating audio preview of your scription
- add titles, composers, and other annotations to your sheet music
- display scriptions in a feed
- add comments and likes to a scription
- display comments and likes on each scription
- play synthesized audio for each scription

## In Progress

- user authentication: login and signup (UX and preliminary UI complete; database queries complete; server routes tk; cookies & sessions tk)
- bug fix: duplicate scriptions being created
- UX/UI for audio playback widgets

## Upcoming Features

- user folders: drafts and favorites
- while commenting on a scription, user may fetch that scription, modify it, and share their updated version with changes highlighted
- easy transposition between keys and between clefs for scriptions saved in user's folders
- audio playback will obey bpm if specified in the scription
- create and save lists of scriptions
