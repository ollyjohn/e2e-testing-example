import { browser, Config } from 'protractor';

export const config: Config = {

	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'https://google.com',
	multiCapabilities: [
		{
			browserName: 'opera',
			directConnect: true
		}
	],
	framework: 'custom',
	frameworkPath: require.resolve( 'protractor-cucumber-framework' ),
	specs: [
		'../../features/*.feature'
	],
	
	onPrepare: () => {
		browser.driver.manage().window().setSize( 1024, 768 );
		browser.driver.manage().window().setPosition( 0, 0 );
		browser.waitForAngularEnabled( false );
	},

	cucumberOpts: {
		compiler: 'ts:ts-node/register',
		strict: true,
		format: [ 'pretty' ],
		require: [
			'../../setup/hooks.ts',
			'../../steps/**/*.step.ts'
		]
	}

};