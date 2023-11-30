const { Router } = require("express");
const getCountriesController = require("../controllers/getCountriesController");
const getIdCountriesController = require("../controllers/getIdCountriesController");
const getNameCountriesController = require("../controllers/getNameCountriesController");
const postActivitiesController = require("../controllers/postActivitiesController");
const getActivitiesController = require("../controllers/getActivitiesController");

const router = Router();

router.get("/countries", getCountriesController);
router.get("/countries/:idCountries", getIdCountriesController);
router.get("/countries/name?=", getNameCountriesController);
router.post("/activities", postActivitiesController);
router.get("/activities", getActivitiesController);

module.exports = router;
