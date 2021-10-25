// data base [D3]

// class checkout {
//     roomNum: number;
//     name: string;
//     phonNum: number;
//     date: any;
// }

const express = require("express");
const router = express.Router();

const pg = require("pg");
const pool = new pg.Pool({
  user: "gwkbzslh",
  host: "arjuna.db.elephantsql.com",
  database: "gwkbzslh",
  password: "OQMGhyGqQmymJUzq_EFOeQcLBAFfQqSN",
  port: 5432,
});

router.post("/", (request, response) => {
  if (request.session.loggedin) {
    let reposts = {
      text: `insert into checkout(roomnum, name, phonenum, date, admin_check) values ($1, $2, $3, $4, $5);`,
      values: [
        request.body.roomNum,
        request.body.name,
        request.body.phonNum,
        request.body.date,
        false,
      ],
    };
    pool.connect((err, client, done) => {
      if (err) {
        return console.error("connection error", err);
      }
      client.query(reposts, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        response
          .status(200)
          .json({ status: "success", data: "insert success" });
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
      const books = `SELECT * from checkout;`;
      if (err) {
        return console.error("connection error", err);
      }
      client.query(books, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
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

router.delete("/admin/delete/:id", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    pool.connect((err, client, done) => {
      const books = `DELETE FROM checkout WHERE id = '${request.params.id}'`;
      if (err) {
        return console.error("connection error", err);
      }
      client.query(books, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        response
          .status(200)
          .json({ status: "success", data: `delete table id ${paramid}` });
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
      const upcheck = `UPDATE checkout SET admin_check = true WHERE id in (${data_string})`;
      if (err) {
        return console.error("connection error", err);
      }
      client.query(upcheck, function (err, result) {
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

module.exports = router;
