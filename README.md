<h1 align="center">web-daemon</h1>

<div align="center">Microservice for LBRY</div>

<div align="center">
  <img src="https://spee.ch/f/webdaemon-2019-january.undefined" title="Screenshot of web-daemon"/>
</div>

<div align="center">
  <a href="https://snyk.io/test/github/lbryio/web-daemon">
    <img src="https://snyk.io/test/github/lbryio/web-daemon/badge.svg?style=flat-square"/>
  </a>
</div>



## Notes
The `web-daemon` runs on port 5200 in development and production. If you want to change this, edit the `inspect`, `start`, and `watch` scripts in `package.json`.

## Prerequisites
You will need either the [LBRY app](https://github.com/lbryio/lbry-desktop) or the [`lbrynet-daemon`](https://github.com/lbryio/lbry/releases) running while using this.

## Installation
`npm i`

## Development
`npm run watch`

## Testing
`npm test` (dependencies and code quality)

## Deployment
`npm run deploy` (uses [Vagrant](https://www.vagrantup.com) but you can use whatever you want)

## Production
`npm start`
