
let mongoose = require('mongoose');

let config = require('../config');

// 查询
let querySchema = new mongoose.Schema({
    ip: String,
    path: String,
    query: mongoose.Schema.Types.Mixed,

    body: mongoose.Schema.Types.Mixed,

    success: Number,
    error_message: String,
    error_stack: String,

	created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Query", querySchema);