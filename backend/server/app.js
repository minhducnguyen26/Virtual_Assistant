//! This file is in charge of handling all API end points

const express = require("express");
const app = express();
app.use(express.json({}));

const cors = require("cors");
app.use(cors());

//! Handle Virtual Assistant router
// Get virtual assistant's infos
// Create a new virtual assistant
// Delete one virtual assistant by id
const virtual_assistant_router = require("./routers/virtual_assistant");
app.use("/virtual_assistant", virtual_assistant_router);

//! Handle User router
const user_router = require("./routers/user");
app.use("/virtual_assistant/user", user_router);

//! Handle Notes router
const notes_router = require("./routers/notes");
app.use("/virtual_assistant/notes", notes_router);

//! Handle Actions router
const actions_router = require("./routers/actions");
app.use("/virtual_assistant/actions", actions_router);

module.exports = app;
