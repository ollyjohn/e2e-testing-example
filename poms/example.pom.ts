import { $, $$, browser } from 'protractor';


export class ExamplePOM {

	static search = {
		bar: $( 'input#lst-ib' ),
		button: $( 'input[name="btnK"]' )
	}

}