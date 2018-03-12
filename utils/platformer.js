/**
 * Dynamically populate the browsers.json file for Selenoid as they seem incapable of doing it themselves...
 */
const os = require( 'os' );
const colours = require( 'colors/safe' );
const fs = require( 'fs' );

console.log( colours.dim( 'Launching script...' ) );

console.log( colours.dim( 'Finding home directory...' ) );
let homeDir = os.homedir();
const targetDir = `${ homeDir }/.aerokube/selenoid/`;
const windows = os.platform() === 'win32';
const mac = os.platform() === 'darwin';
console.log( colours.bold( `Home directory is ${ homeDir }` ) );

let drivers = {
    'internet explorer': {},
    'MicrosoftEdge': {},
    'chrome': {},
    'firefox': {},
    'opera': {},
    'safari': {}
}

// if we're on Windows, add IE and Edge browsers
if ( windows ) {

	homeDir = homeDir.replace( /\\/g, '\/' );

	drivers[ 'internet explorer' ] = {
        'default': 'latest',
        'versions': {
            'latest': {
                'image': [
                    `${ homeDir }\/.aerokube\/selenoid\/IEDriverServer${ windows ? '.exe' : '' }`
                ],
                'port': '',
                'path': '\/'
            }
        }
	};
	drivers[ 'MicrosoftEdge' ] = {
        'default': 'latest',
        'versions': {
            'latest': {
                'image': [
                    `${ homeDir }\/.aerokube\/selenoid\/MicrosoftWebDriver${ windows ? '.exe' : '' }`,
                    '--host=127.0.0.1',
                    '--verbose'
                ],
                'port': '',
                'path': '\/'
            }
        }
    };
}

// if we're on MacOS, add Safari drivers
if ( mac ) {
    drivers[ 'safari' ] = {
        'default': 'latest',
        'versions': {
            'latest': {
                'image': [
                    '/usr/bin/safaridriver'
                ],
                'port': '',
                'path': '/'
            }
        }
    }
}

// add cross-platform browser drivers
drivers[ 'chrome' ] = {
    'default': 'latest',
    'versions': {
        'latest': {
            'image': [
                `${ homeDir }\/.aerokube\/selenoid\/chromedriver${ windows ? '.exe' : '' }`,
                '--whitelisted-ips=\"\"',
                '--verbose'
            ],
            'port': '',
            'path': '\/'
        }
    }
};
drivers[ 'firefox' ] = {
    'default': 'latest',
    'versions': {
        'latest': {
            'image': [
                `${ homeDir }\/.aerokube\/selenoid\/geckodriver${ windows ? '.exe' : '' }`,
                '--host',
                '::',
                '--log',
                'debug'
            ],
            'port': '',
            'path': '\/'
        }
    }
};
drivers[ 'opera' ] = {
    'default': 'latest',
    'versions': {
        'latest': {
            'image': [
                `${ homeDir }\/.aerokube\/selenoid\/operadriver_win64\/operadriver${ windows ? '.exe' : '' }`,
                '--whitelisted-ips=""',
                '--verbose'
            ],
            'port': '',
            'path': '\/'
        }
    }
};

if ( windows ) { 
    delete drivers.safari;
}
if ( mac ) {
    delete drivers[ 'internet explorer' ];
    delete drivers.edge;
}

// write to the file
console.log( colours.dim( 'Creating ' ) );
fs.writeFileSync( `${ targetDir }/browsers.json`, JSON.stringify( drivers ), null, 4 );
console.log( colours.green( 'Success. File created.' ) );

console.log( colours.dim( 'Exiting...' ) );

process.exit();