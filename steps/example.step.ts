import { browser, $, $$ } from 'protractor';
import { CommonPOM } from '../poms/common.pom';
import { defineSupportCode } from 'cucumber';
import { ExamplePOM } from '../poms/example.pom';

const chai = require( 'chai' )
chai.use( require( 'chai-as-promised' ) );
const expect = chai.expect;


defineSupportCode( ( { Given, When, Then } ) => {

	Given ( 'I am on { site }', async ( site ) => {
		site = site.toString();

		await browser.get( CommonPOM.urls[ site ] );
		expect( await browser.getCurrentUrl() ).to.contain( site );
	} );

	When( 'I search for { sum }', async ( sum ) => {
		sum = sum.toString();

		await ExamplePOM.search.bar.sendKeys( sum );
		await ExamplePOM.search.button.click();
	} );

	Then( 'I should see { answer } as the result', async ( answer: any ) => {
		await CommonPOM.sleep( 2500 );

		answer = parseInt( answer.toString() );
		
		const result = parseInt( await $( '#cwos' ).getWebElement().getText() );
		expect( answer ).to.equal( result );
	} );

} );