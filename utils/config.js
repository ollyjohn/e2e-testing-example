const browser = process.argv[ 2 ];
const cwd = process.cwd();
const fs = require( 'fs' );
const colours = require( 'colors' );
const path = require( 'path' );

if ( browser === undefined ) { 
	console.log( colours.bold.red( 'Something went wrong: ' ) );
	console.log( colours.red( 'Please enter a browser to configure for.' ) );
	process.exit();
}

console.log( colours.dim( `Copying ${ browser }'s config file into the main file` ) );

// copy the specific config file into the runnable
fs.copyFile( `compiled/config/config.${ browser }.js`, 'compiled/config/config.js', ( error ) => {
	if ( error ) {
		console.log( colours.bold.red( 'Something went wrong:' ) );
		console.log( colours.red( error.message ) );

		process.exit( error.code );
	} else {
		console.log( colours.bold.green( 'Success.' ) );
		process.exit( 0 );
	}
} );