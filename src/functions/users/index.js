import db from '../../db/index.js';
import bcrypt from "bcrypt";
const saltRounds = 10;

export const registerUser = (req, res, next) => {
  try {
    const { name, password }= req.body;

    db.query("SELECT * FROM users WHERE name = ?", [name], (err, result) => {
      if (err) {
        return res.send(err);
      }
      if (result.length == 0) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          db.query(
            "INSERT INTO users (name, password) VALUE (?,?)",
            [name, hash],
            (error, response) => {
              if (err) {
                return res.send(err);
              }

              return res.send({ msg: "Usuário cadastrado com sucesso" });
            }
          );
        });
      } else {
        return res.send({ msg: "Usuário já cadastrado" });
      }
    });
  } catch (error) {
    return next(error);
  }
};

export const login = (req, res, next) => {
  try {
    const { name, password }= req.body;

    db.query("SELECT * FROM users WHERE name = ?", [name], (err, result) => {
      if (err) {
        return res.send(err);
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (error) {
            return res.send(error);
          }
          if (response) {
            return res.send({ msg: "Usuário logado", username: name, userId: result[0].id });
          } else {
            return res.send({ msg: "Senha incorreta" });
          }
        });
      } else {
        return res.send({ msg: "Usuário não registrado!" });
      }
    });
  } catch (error) {
    next(error);
  }
};
