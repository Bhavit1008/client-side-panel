const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/client-side-forms'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/client-side-forms/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

//angular-cli-ghpages -d dist/client-side-forms/ --no-silent
//https://Bhavit1008.github.io/client-side-panel/

//ng build --prod --output-path docs --base-href /https://Bhavit1008.github.io/client-side-panel/