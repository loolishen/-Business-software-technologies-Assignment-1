const express = require("express");
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views/"); //Important
const EventsCat = require("./models/students");
const Events = require("./models/students2");
const ejs = require("ejs");
const PORT_NUMBER = 8080;
let database = []

let event = []
let Server = express();
Server.use(express.urlencoded({ extended: true }));
Server.use(express.static("node_modules/bootstrap/dist/css"));
Server.engine("html", ejs.renderFile);
Server.set("view engine", "html");
Server.set('view engine', 'ejs');
Server.set('views', path.join(__dirname, 'views'));

Server.listen(PORT_NUMBER, function (){
    console.log(`Successfully initiated on port ${PORT_NUMBER}`)
});
Server.post('/input',function (req,res){
    let anEvent = new EventsCat(req.body.eventName, req.body.description)
    console.log(anEvent)
    database.push(anEvent)
    res.redirect("/output")
});
Server.get('/output',function (req,res){
    fileName = VIEWS_PATH + "output.html";
    res.render(fileName,{records :database});
});
Server.get('/',function (req,res){
    fileName = VIEWS_PATH + "index.html";
    res.render(fileName);
});
Server.get('/input',function (req,res){
    fileName = VIEWS_PATH + "input.html";
    res.render(fileName);
});
Server.get('/output',function (req,res){
    fileName = VIEWS_PATH + "output.html";
    res.render(fileName);
});
// LiShen's CODE
Server.get('/ls/event/add', function (req, res) {
    const fileName = VIEWS_PATH + "add.html"
    res.sendFile(fileName)
});

Server.post('/ls/event/add', function(req, res) {
    const { eventName, startDateTime, duration, categoryId, eventDescription, eventImage, capacity, ticketsAvailable, isActive } = req.body;
    const id = IDGenerator(); // Call the IDGenerator function to get a new ID
    const newEvent = { id, eventName, startDateTime, duration, categoryId, eventDescription, eventImage, capacity, ticketsAvailable, isActive };
    event.push(newEvent);
    res.redirect('/'); // Redirect to the eventOngoing page after adding the event
});

Server.get('/ls/eventOngoing', function(req, res){
    const fileName = "allEvents";
    res.render(fileName, { events: event });
})

Server.get('/ls/sold-out', function(req,res){

})

Server.get('/ls/category/:categoryId', function(req,res){

})

Server.get('/:studentName/event/remove', (req, res) => {

});

function IDGenerator(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'E';

    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    result += '-';

    for (let i = 0; i < 4; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit;
    }

    return result;
}