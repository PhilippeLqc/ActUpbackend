const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    role: String,
});

const Role = mongoose.model('roles', roleSchema);

module.exports = Role;