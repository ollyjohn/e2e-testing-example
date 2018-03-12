const opn = require( 'opn' );
const fs = require( 'fs' );
const path = require( 'path' );
const colours = require( 'colors' );

const cwd = process.cwd();

// console.log( colours.dim( 'Opening HTML report file...' ) );
// opn( 'reports/html/report.html' )
// 	.then( () => {
// 		console.log( colours.bold.green( 'Done.' ) );
// 		process.exit();
// 	} )
// 	.catch( () => {
// 		console.log( colours.bold.red( 'Something went wrong:' ) );
// 		console.log( colours.red( 
// 			fs.existsSync( 'reports/html/report.html' ) ? 'Unknown error' : 'File doesn\'t exist' 
// 		) );
// 	} );

console.log( colours.bold.cyan( '(Reporter needs fixing)' ) );