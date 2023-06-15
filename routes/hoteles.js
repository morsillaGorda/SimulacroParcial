const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/hoteles", async function (req, res) {
  // consulta de articulos con filtros y paginacion

  let where = {};
  if (req.query.NombreFantasia != undefined && req.query.NombreFantasia !== "") {
    where.NombreFantasia = {
      [Op.like]: "%" + req.query.NombreFantasia + "%",
    };
  }

  let items = await db.hoteles.findAndCountAll({
    attributes: [
      "IdHotel",
      "NombreFantasia",
      "Habitaciones",
    ],
    order: [["NombreFantasia", "ASC"]],
    where,
  });

  res.json(items.rows);
});

module.exports = router;
