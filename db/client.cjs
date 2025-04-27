const {Client} = require ('pg');
const client = new Client('postgres://localhost:5432/to_do_list_v2')
module.exports = client;