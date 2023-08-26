const express = require("express");
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views/"); //Important
const EventsCat = require("./models/students");
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
Server.get('/info',function (req,res){
    fileName = VIEWS_PATH + "info.html";
    res.render(fileName);
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
Server.get('/search-category',function (req,res){
    const keyword = req.query.keyword || 'default';
    if (!req.query.keyword || req.query.keyword.trim() === '') {
        res.redirect('/search-category?keyword=' + keyword);
        return;
    }
    const filteredCategories = database.filter(database => database.description.toLowerCase().includes(keyword.toLowerCase()));
    const fileName =  VIEWS_PATH +"search-category.html";
    res.render(fileName, { categories: filteredCategories, keyword });
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

Server.get('/ls/event/sold-out', function(req,res){
    const fileName = "soldOutEvents";
    const availableEvents = event.filter(event => event.ticketsAvailable === 1); // Filter events with capacity < 1
    res.render(fileName, { events: availableEvents });
})

Server.get('/ls/category/:categoryId', function(req, res){
    const categoryId = req.params.categoryId; // Get category ID from URL parameter
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    if (selectedCategory) {
        const eventsInCategory = event.filter(e => e.categoryId === categoryId);
        const fileName = "categoryDetail";
        res.render(fileName, { category: selectedCategory, events: eventsInCategory });
    } else {
        res.status(404).send('Category not found'); // Handle category not found
    }
});

Server.get('/ls/event/remove', (req, res) => {
    const eventId = req.query.id; // Get event ID from query string
    const eventIndex = event.findIndex(e => e.id === eventId); // Find the index of the event
    if (eventIndex !== -1) {
        event.splice(eventIndex, 1); // Remove the event from the array
        res.redirect('/ls/eventOngoing'); // Redirect to the "list all events" page
    } else {
        res.status(404).send('Event not found'); // Handle event not found
    }
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