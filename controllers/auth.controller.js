const config = require("config");
const User = require('../models/User');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


// exports.signup = (req, res, next) => {
//   bcrypt.hash(req.body.password, 6).then(
//     (hash) => {
//       const user = new User({
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//         phone: req.body.phone,
//         country: req.body.country,
//         password: hash,
//         dateOfBirth: req.body.dateOfBirth,

//       });
//       user.save().then(
//         () => {
//           res.status(201).json({
//             message: 'User added successfully!'
//           });
//         }
//       ).catch(
//         (error) => {
//           res.status(500).json({
//             error: error
//           });
//         }
//       );
//     }
//   );
// };

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: 'User not found!'
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: 'Incorrect password!'
            });
          }
          const token = jwt.sign(
            {
              userId: user._id
            },
            config.get('privateAuthKey'), { expiresIn: '24h' });

          res.status(200).json(token);
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
}
