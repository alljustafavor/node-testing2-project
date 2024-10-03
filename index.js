require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const server = require("./api/server");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});

process.on("unhandledRejection", (err) => {
  console.log('Unhandled Rejection', err);
});
