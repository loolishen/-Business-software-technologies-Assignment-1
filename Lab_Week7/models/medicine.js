const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dose: {
        type: Number,
        validate: {
            validator: function (value) {
                return value > 0 && value <= 100;
            },
            message: "Dose must be between 0 and 100",
        },
    },
});

module.exports = mongoose.model("Medicine", medicineSchema);