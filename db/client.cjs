const {Client} = require ('pg');
const client = new Client('postgres://postgres:4444@localhost:5432/to_do_list_v2')
client.connect()
module.exports = client;