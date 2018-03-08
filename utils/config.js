const browser = process.argv[ 2 ];
const cwd = process.cwd();
const fs = require( 'fs' );
const colours = require( 'colors' );

console.log( colours.dim( `Copying ${ browser }'s config file into the main file` ) );
fs.copyFileSync( `compiled/config/config.${ browser }.js`, 'compiled/config/config.js' );
console.log( colours.bold( colours.green( `Success.` ) ) );