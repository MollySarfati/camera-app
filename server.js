var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

var options = {
  server: {
    socketOptions: {
      connectTimeoutMS: 5000
    }
  }
};

//TODO: replace with your mongodb DB
mongoose.connect('mongodb://localhost:27017/myapp', options, function(err) {
  console.log(err);
});

var userSchema = mongoose.Schema({last_name: String, first_name: String, mail: String, password: String});

var UserModel = mongoose.model('user', userSchema);

var photoSchema = mongoose.Schema({userID: String, name: String, id: String, position: Number});

var PhotoModel = mongoose.model('photos', photoSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/signin', function(req, res, next) {
  UserModel.find({
    mail: req.query.mail,
    password: req.query.password
  }, function(err, users) {
    if (users.length > 0) {
      res.json({UserExist: true, firstName: users.first_name, lastName: users.last_name});
    } else {
      res.json({UserExist: false, firstName: null, lastName: null});
    }
  })
});

router.post('/signup', function(req, res, next) {

  var newUser = new UserModel({last_name: req.body.last_name, first_name: req.body.first_name, mail: req.body.mail, password: req.body.password});
  newUser.save(function(error, user) {
    console.log('USER = ' + user);
    console.log('userID = ' + user._id);
  });
  res.json(req.body);
});

router.post('/upload', function(req, res) {

  if (!req.files) {
    console.log(' req.files n existe pas ');
    return res.status(400).send('aucun fichier n a ete telechargé');
  } else {
    console.log('file existe');

    UserModel.findOne({}, function(err, user) {
      console.log('USERS ID ? = ' + user._id);

      var newPhoto = new PhotoModel({userID: user._id, id: req.files.photo.md5, latitude: req.body.latitude, longitude: req.body.longitude});

      newPhoto.save(function(error, photo) {
        console.log('PHOTO save = ' + photo);

        req.files.photo.mv('public/images/' + photo._id + '.jpg', function(err) {
          console.log('ID photo  = ' + req.files.photo.md5);

          if (err) {
            return res.status(500).send(err);
          } else {
            res.send('File uploaded!');
          }
        });

      });
    });

  };

});

router.get('/picture', function(req, res, next) {
  console.log(req.query);
  pictureModel.find({
    userID: req.query.userID
  }, function(err, pictures) {
    res.json(pictures)
  })
})

module.exports = router;
