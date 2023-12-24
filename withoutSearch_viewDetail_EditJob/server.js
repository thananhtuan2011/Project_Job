// Require express
var express = require('express');
var app = express();


// const fileUpload = require('express-fileupload');
// app.use(
//     fileUpload({
//     limits: {
//     fileSize: 10000000,
//     },
//     abortOnLimit: true,
//     })
//     );
// Add this line to serve our index.html page
// app.use(express.static('public'));
// app.get('/', (req, res) => {
// res.sendFile('index.html');
// });
// app.post('/upload', (req, res) => {
// // Get the file that was set to our field named "image"
// const { image } = req.files;
// // If no image submitted, exit
// if (!image) return res.sendStatus(400);
// // Move the uploaded image to our upload folder
// image.mv(__dirname + '/upload/' + image.name);
// // All good
// res.sendStatus(200);
// });




// Require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Require mongoose
var connectionString = 'mongodb://127.0.0.1:27017/Job-portal'; // for local
// if (process.env.MLAB_USERNAME) { // check if running remotely
//     var username = process.env.MLAB_USERNAME; // get from environment
//     var password = process.env.MLAB_PASSWORD;


var mongoose = require('mongoose');
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // remove the following options:
    // useFindAndModify: false,
    // useCreateIndex: true
  });
  
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected with mongoose');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Add services with better organization
var services = [
    require('./services/user.service.server'),
    require('./services/skill.service.server'),
    require('./services/award.service.server'),
    require('./services/certificate.service.server'),
    require('./services/education.service.server'),
    require('./services/extra-curricular.service.server'),
    require('./services/experience.service.server'),
    require('./services/job-application.service.server'),
    require('./services/job-posting.service.server'),
    require('./services/project.service.server'),
    require('./services/recruiter-detail.service.server'),
];

services.forEach(service => service(app));

// Listen on the specified port
var port = process.env.PORT || 5500;
app.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
