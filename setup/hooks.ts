// require()ments
const Cucumber = require( 'cucumber' );

// named module imports
import { browser } from 'protractor';
import { config } from './config';
import { defineSupportCode } from 'cucumber';
import { mkdirp } from 'mkdirp';

// gross imports
import * as fs from 'fs';
import * as reporter from 'cucumber-html-reporter';

defineSupportCode( ( { registerHandler, registerListener, After, setDefaultTimeout } )  => {

	/**
	 * Initial configurations
	 */
	
	// set the timeouts
	setDefaultTimeout( 60000 );
	
	// set the report directories
	const reports = {
		json: {
			dir: `${ process.cwd() }/reports/json`,
			tgt: `${ process.cwd() }/reports/json/report.json`
		},
		html: {
			dir: `${ process.cwd() }/reports/html`,
			tgt: `${ process.cwd() }/reports/html/report.html`
		}
	};

	// mochawesome reporter configuration
	const reportOptions =  {
		theme: 'foundation',
		jsonFile: reports.json.tgt,
		output: reports.html.tgt,
		reportSuiteScenarios: true,
		launchReport: true,
		brandTitle: 'E2E Tests'
	};

	const log = ( message: String ) => {
		if ( !fs.existsSync( reports.json.dir ) ) {
			mkdirp.sync( reports.json.dir );
		}
		try {
			fs.writeFileSync( reports.json.dir, message );
			reporter.generate( reportOptions );
		} catch ( error ) {
			if ( error ) {
				console.log( 'Failed to save results to JSON file & create HTML report' );
				console.log( error );
			}
		}
	} 

	const JSONFormatter = new Cucumber.JsonFormatter( { 
		log: log 
	} );

	/**
	 * Handlers
	 */
	registerHandler( 'BeforeFeature', async () => {
		await browser.get( config.baseUrl );
	} );
	After( async function ( result ) {
		// take screenshot & attach it to the global scope
		this.attach( await browser.takeScreenshot(), 'image/png' );
	} );

	/**
	 * Listeners
	 */
	// JSON formatter & logger
	registerListener( JSONFormatter )

} );