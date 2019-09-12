/*
 * Server code for SeeMikeReact.com
 */

var express = require( 'express' );
var app = express();
var router = express.Router();

// HTTP Get request. Send HTML for the page.
router.get( '/', (req, res ) => {
    res.sendFile( __dirname + '/html/index.html' );
});

// Handle requests for file assets
app.use( '/', router );
app.use(express.static('.'));

// Start server
app.listen( 80, () => {
    console.log( 'Server running on port 80' );
});

// For future expansion
// setInterval( () => {let x = Math.random()}, 500 );
