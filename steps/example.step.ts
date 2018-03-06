import { browser, $, $$ } from 'protractor';
import { CommonPOM } from '../poms/common.pom';
import { defineSupportCode } from 'cucumber';
import { urls } from '../util/sites.util';

const chai = require( 'chai' )
chai.use( require( 'chai-as-promised' ) );
const expect = chai.expect;


defineSupportCode( ( { Given, When, Then } ) => {

	Given ( 'I am on { site }', async ( site ) => {
		site = site.toString();

		await browser.get( urls[ site ] );
		expect( await browser.getCurrentUrl() ).to.contain( site );
	} );

} );