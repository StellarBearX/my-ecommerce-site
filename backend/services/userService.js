const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/user.json');

function readUsers() {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function findUser(email) {
    const users = readUsers();
    return users.find(user => user.email === email);
}

function createUser(user) {
    const users = readUsers();
    users.push(user);
    writeUsers(users);
}

module.exports = {
    findUser,
    createUser
};
