const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const multerConfig = require("./config/multer-config");
const multer = require("multer");
const upload = multer(multerConfig.config).single(multerConfig.keyUpload);

const pg = require("pg");
const pool = new pg.Pool({
  user: "gwkbzslh",
  host: "arjuna.db.elephantsql.com",
  database: "gwkbzslh",
  password: "OQMGhyGqQmymJUzq_EFOeQcLBAFfQqSN",
  port: 5432,
});

router.post("/", upload, (request, response) => {
  //request.session.admin&&request.session.loggedin
  const lodes = request.body;
  console.log(lodes);
  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("error: " + JSON.stringify(err));
    } else if (err) {
      console.log("error: " + JSON.stringify(err));
    }
  });
  var fileName = request.file.filename;
  if (request.session.loggedin) {
    //request.session.loggedin
    //response.send(`post product : ${request.params.id},${fileName}`);
    let payinsert = {
      text: `insert into pay(roomnum, name, phonenum, time, amount, bank, image, admin_check) values ($1, $2, $3, $4, $5, $6, $7, $8);`,
      values: [
        lodes.roomNum,
        lodes.name,
        lodes.phonNum,
        lodes.time,
        lodes.amount,
        lodes.bank,
        fileName,
        false,
      ],
    };
    pool.connect((err, client, done) => {
      if (err) {
        return console.error("connexion error", err);
      }
      client.query(payinsert, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        response.status(200);
        response.json({ status: "success", data: "insert success" });
        response.end();
        return done();
      });
    });
    //response.status(201);
  } else {
    response.status(200).json({ status: "failed", data: "please login" });
    //response.redirect('/api/login/');
    response.end();
  }
});

router.get("/admin", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    pool.connect((err, client, done) => {
      const pays = `SELECT * from pay;`;
      if (err) {
        return console.error("connection error", err);
      }
      client.query(pays, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        //result.rows.map(element => { element['image'] = `http://localhost:8004/images/${element.image}`});
        response.status(200).json(result.rows);
        response.end();
      });
      return done(); // call `done()` to release the client back to the pool
    });
  } else if (request.session.loggedin) {
    response.status(200).json({ status: "failed", data: "you not admin" });
    response.end();
  } else {
    response.status(200).json({ status: "failed", data: "please login" });
    response.end();
  }
});

// router.post("/config/:id", upload, (request, response) => {
//   upload(request, response, function (err) {
//     if (err instanceof multer.MulterError) {
//       console.log("error: " + JSON.stringify(err));
//     } else if (err) {
//       console.log("error: " + JSON.stringify(err));
//     }
//     const fileName = request.file ? request.file.fieldname : undefined;
//     response.send(`post product : ${request.params.id},${fileName}`);
//   });
// });

router.get("/admin/:id", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    pool.connect((err, client, done) => {
      const payid = `SELECT * from pay WHERE id = '${request.params.id}';`;
      if (err) {
        return console.error("connection error", err);
      }
      client.query(payid, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        //result.rows.map(element => { element['image'] = `http://localhost:8004/images/${element.image}`});
        response.status(200).json(result.rows);
        response.end();
      });
      return done(); // call `done()` to release the client back to the pool
    });
  } else if (request.session.loggedin) {
    response.status(200).json({ status: "failed", data: "you not admin" });
    response.end();
  } else {
    response.status(200).json({ status: "failed", data: "please login" });
    response.end();
  }
});

router.put("/admin/check", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    var idarray = request.body.id;
    var data_string = idarray.toString();
    pool.connect((err, client, done) => {
      const upcheckpay = `UPDATE pay SET admin_check = true WHERE id in (${data_string})`;
      if (err) {
        return console.error("connection error", err);
      }
      client.query(upcheckpay, function (err, result) {
        response.status(200).json({ status: "success", data: result.rowCount });
        response.end();
        if (err) {
          return console.error("error running query", err);
        }
      });
      return done(); // call `done()` to release the client back to the pool
    });
  } else if (request.session.loggedin) {
    response.status(200).json({ status: "failed", data: "you not admin" });
    response.end();
  } else {
    response.status(200).json({ status: "failed", data: "please login" });
    response.end();
  }
});

router.get("/admin/name/image", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    pool.connect((err, client, done) => {
      const payid = `SELECT * from pay WHERE image = '${request.body.image}';`;
      if (err) {
        return console.error("connection error", err);
      }
      client.query(payid, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        //result.rows.map(element => { element['image'] = `http://localhost:8004/images/${element.image}`});
        response
          .status(200)
          .json(`http://localhost:8004/images/${result.rows[0].image}`);
        response.end();
      });
      return done(); // call `done()` to release the client back to the pool
    });
  } else if (request.session.loggedin) {
    response.status(200).json({ status: "failed", data: "you not admin" });
    response.end();
  } else {
    response.status(200).json({ status: "failed", data: "please login" });
    response.end();
  }
});

module.exports = router;
