var express = require( 'express' );
var app = express();
var router = express.Router();

router.get( '/', (req, res ) => {
    res.sendFile( __dirname + '/html/index.html' );
});

app.use( '/', router );
app.use(express.static('.'));

app.listen( 80, () => {
    console.log( 'Server running on port 80' );
});

setInterval( () => {let x = Math.random()}, 500 );
/* while( true ) {
	let x = Math.random();
} */