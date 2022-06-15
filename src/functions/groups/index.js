import db from '../../db/index.js'

export const getGroups = (req, res, next) => {
  try {
    const { userId } = req.params;

    db.query("SELECT * FROM city_group WHERE user_id = ?", [userId], (err, result) => {
      if(err) return res.send(err);
      return res.send(result);
    });
  } catch (error) {
    next(error);
  }
};

export const createGroup = (req, res, next) => {
  try{
    const { groupName, cities, userId } = req.body;

    db.query("INSERT INTO city_group (user_id, name, cities) VALUES (?, ?, ?)", [userId, groupName, JSON.stringify(cities)], (err, result) => {
      if(err){
        return res.send(err);  
      }
      return res.send(result);
    });
  } catch (error) {
    next(error);
  }
};

export const searchGroup = (req, res, next) => {
  try {
    const { groupId } = req.body;

    db.query("SELECT * FROM city_group WHERE id = ?", [groupId], (err, result) => {
      if(err){
        return res.send(err);  
      }
      return res.send(result);
    })

  } catch (error) {
    next(error);
  }
};

export const deleteGroup = (req, res, next) => {
  try {
    const { groupId } = req.params;

    db.query(`DELETE FROM city_group WHERE id = ?`, [groupId], (err, result) => {
      if(err){
        return res.send({err});  
      }
      return res.send({result});
    });
  } catch (error) {
    next(error);
  }
};