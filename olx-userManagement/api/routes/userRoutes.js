"use strict";
module.exports = function (app) {
  var controllers = require("../controllers/userController");

  // todoList Routes
  app.route("/createUser").post(controllers.createUser);
  app.route("/loginUser").post(controllers.loginUser);
  app.route("/validateToken").post(controllers.validateToken);
  app.route("/editFavorite").post(controllers.editFavorite);
  app.route("/getUsers").get(controllers.getUsers);
  app.route("/expFavorite").post(controllers.expFavorite);
};
