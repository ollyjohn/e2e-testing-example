import { browser, Config } from 'protractor';

export const config: Config = {

	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'e2e.faberodt.com',
	multiCapabilities: [
		{
			browserName: 'chrome',
			directConnect: true
		}
	],
	framework: 'custom',
	frameworkPath: require.resolve( 'protractor-cucumber-framework' ),
	specs: [
		'../../features/*.feature'
	],
	
	onPrepare: () => {
		browser.driver.manage().window().setSize( 1920, 1080 );
		browser.driver.manage().window().setPosition( 0, 0 );
	},

	cucumberOpts: {
		compiler: 'ts:ts-node/register',
		strict: true,
		format: [ 'foundation' ],
		require: [
			'../../setup/hooks.ts',
			'../../steps/**/*.step.ts'
		]
	}

};