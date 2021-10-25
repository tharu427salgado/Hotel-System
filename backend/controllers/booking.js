// data base [ฺBooking]

// class Booking {
//     name: string;
//     phonNum: number;
//     idcard: number;
//     email: string;
//     date : string;
// }

// const { request } = require("express");
const { request, response } = require("express");
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
    const userid = request.session.userid;
    pool.connect((err, client, done) => {
      const datauser = `SELECT * from booking WHERE loginid = '${userid}';`; //request.session.userid WHERE loginid = '${userid}'
      if (err) {
        return console.error("connection error", err);
      }
      client.query(datauser, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        if (result.rows[0] != undefined) {
          const updates = `UPDATE booking SET name ='${request.body.name}', 
                                    phoneNum ='${request.body.phoneNum}',
                                    idcard = '${request.body.idcard}', 
                                    email = '${request.body.email}', 
                                    date = '${request.body.date}' 
                                    WHERE loginid = ${request.session.userid};`;
          client.query(updates, function (err, result) {
            if (err) {
              return console.error("error running query", err);
            }
          });
          response.status(200).json({ status: "success", data: "update" });
          response.end();
          return done();
        } else {
          let insert = {
            text: `insert into booking (name, phoneNum, idcard, email, date, loginid, admin_check) values ($1, $2, $3, $4, $5, $6, $7);`,
            values: [
              request.body.name,
              request.body.phoneNum,
              request.body.idcard,
              request.body.email,
              request.body.date,
              request.session.userid,
              false,
            ],
          };
          client.query(insert, function (err, result) {
            if (err) {
              return console.error("error running query", err);
            }
          });
          response.status(200).json({ status: "success", data: "insert" });
          response.end();
          return done();
        }
      });
    });
  } else {
    response.status(200).json({ status: "failed", data: "please login" });
    //response.redirect('/api/login/');
    response.end();
  }
});

router.get("/admin", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    pool.connect((err, client, done) => {
      const books = `SELECT * from booking;`;
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

router.put("/admin/check", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    var idarray = request.body.id;
    var data_string = idarray.toString();
    pool.connect((err, client, done) => {
      const upcheck = `UPDATE booking SET admin_check = true WHERE id in (${data_string})`;
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

router.delete("/admin/delete/:id", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    pool.connect((err, client, done) => {
      const books = `DELETE FROM booking WHERE id = '${request.params.id}'`;
      if (err) {
        return console.error("connection error", err);
      }
      client.query(books, function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        response.status(200).json({
          status: "success",
          data: `delete table id ${request.params.id}`,
        });
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

router.get("/admin/rowscount", (request, response) => {
  if (request.session.admin && request.session.loggedin) {
    pool.connect((err, client, done) => {
      const books = `SELECT
    (SELECT COUNT(*) FROM booking) AS booking, 
    (SELECT COUNT(*) FROM report) AS report,
    (SELECT COUNT(*) FROM checkout) AS checkout,
    (SELECT COUNT(*) FROM register) AS register;`;
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

// Export
module.exports = router;
