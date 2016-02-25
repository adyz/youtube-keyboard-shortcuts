# Youtube desktop app with multimedia keyboard shortcuts

Wanna be able to listen to your Youtube playlists or other playlists without switching your browser tab?
Do you want to skip a Youtube song with your keyboard shortcuts?

I do, and I’ve created an electron wrapper to help me with this problem.

![Dock Screenshot](https://raw.githubusercontent.com/adyz/youtube-keyboard-shortcuts/master/Screen.Shot.2016-02-25.at.5.08.54.PM.png)


Built with a great deal of help from https://github.com/jiahaog/nativefier


## Installation

With [Node.js](https://nodejs.org/) installed,

```bash
$ npm install nativefier -g
$ git clone https://github.com/adyz/youtube-keyboard-shortcuts 
$ nativefier http://youtube.com --inject ./index.js ~/Desktop --overwrite
```
where `index.js` is the file you you will find on this repo.
