const browser = process.argv[ 2 ];
const cwd = process.cwd();
const fs = require( 'fs' );

fs.copyFileSync( `${ cwd }/compiled/config/config.${ browser }.js`, `${ cwd }/compiled/config/config.js` );