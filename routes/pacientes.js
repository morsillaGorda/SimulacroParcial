const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/pacientes", async function (req, res) {
  // consulta de articulos con filtros y paginacion

  let where = {};
  if (req.query.ApeNomPaciente != undefined && req.query.ApeNomPaciente !== "") {
    where.ApeNomPaciente = {
      [Op.like]: "%" + req.query.ApeNomPaciente + "%",
    };
  }

  let items = await db.pacientes.findAndCountAll({
    attributes: [
      "IdPaciente",
      "ApeNomPaciente",
      "NroHCPaciente",
      "DomicilioPaciente",
    ],
    order: [["ApeNomPaciente", "ASC"]],
    where,
  });

  res.json(items.rows);
});

module.exports = router;
