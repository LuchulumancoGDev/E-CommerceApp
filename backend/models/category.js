const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    color: String,
    icon: String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
