# web-daemon
Microservice for LBRY



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
