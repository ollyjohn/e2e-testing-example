
export class CommonPOM {

	/**
	 * sleep(): Pause the process for a given duration
	 * @param duration: the amount of time in milliseconds to sleep
	 */
	static sleep = async ( duration: number ) => {
		return new Promise( (resolve: Function) => setTimeout( resolve, duration ) );
	}

	static urls = {
		google: 'https://google.co.uk'
	}

}