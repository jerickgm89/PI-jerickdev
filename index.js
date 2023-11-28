const server = require("./server.js");
const { conn } = require('./db.js');

const PORT = process.env.PORT || 5000;

try {
    server.listen(PORT, async() => {
        console.log(`Server listening on port ${PORT}`);
        await conn.sync({ force: false });
        console.log('Database connected');
    });
} catch (error) {
    console.log(error);
}