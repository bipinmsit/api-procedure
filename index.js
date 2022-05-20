var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var getinfo = require("./getInfo");

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

router.route("/getInfo").get((request, response) => {
  getinfo.executeTable().then((data) => {
    response.json(data);
    console.log(data);
  });
});

router.route("/getInfo/:id").get((request, response) => {
  getinfo.executeTableByID(request.params.id).then((data) => {
    response.json(data);
    console.log(data);
  });
});

router.route("/getProcedureInfo").get((request, response) => {
  getinfo
    .getDataFromProcedure("nav.uspGetRouteDataForEditRoute")
    .then((data) => {
      response.json(data);
      console.log(data);
    });
});

router.route("/postDataByProcedure").post((request, response) => {
    let order = {...request.body}

    getinfo
      .addOrderByProcedure(order, "nav.uspGetRouteDataForEditRoute")
      .then((data) => {
        response.status(201).json(data);
        console.log(data);
      });
  });

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Order API is runnning at " + port);
