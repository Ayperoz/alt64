//simple express server to run frontend production build;
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build"), { maxAge: '1h' }));
app.get("/*", function (req, res) {
	res.setHeader('Cache-Control', 'no-store');
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(3000);

