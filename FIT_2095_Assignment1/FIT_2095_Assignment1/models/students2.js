class Events {
    constructor(name,startDateTime, Duration, CatID){
        this.name = name;
        this.startDateTime = startDateTime;
        this.Duration = Duration;
        this.CatID = CatID;
        this.id = IDGenerator;
        this.capacity = 1000;
        this.ticketAvailability = this.capacity
    }
}
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
module.exports = Events


