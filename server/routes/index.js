var express = require('express');
var router = express.Router();

console.log('hello')

router.get('/', function(req, res, next) {
  res.send('<form method="post" action="/submit"><input placeholder="List Students" name="names" type="text" required><p></p><input placeholder="Number of Groups" name="groups" type="text" required><p></p><input type="submit"></form>');
});

router.post('/submit', function(req, res, next) {
  var nameArray = req.body.names;
  var newArr = nameArray.replace(/,/g, "").split(" ");
  var groupNumber = parseInt(req.body.groups);
  var shuff = shuffle(newArr);
  var result = chunk(shuff, groupNumber);
  res.render('index', {title: "Shuffle Chunk Groups", result: result});
  console.log(result);
});

var shuffled = [];
function shuffle(array) {
  var arr = array.slice(0);
  for (var i = 0; i < array.length; i++) {
    var random = Math.floor(Math.random() * arr.length);
    shuffled.push(arr[random]);
    arr.splice(random, 1);
  }
  return shuffled;
}

var answer = [];
function chunk(shuffledArray, integer) {
  var num = integer;
  var arr = shuffledArray.slice(0);
  var arrayInteger = 0;
  var index = 0;

  for (var i = 0; i < num; i++) {
    answer.push([]);
  };

  while (arr.length > 0) {
    answer[index].push(arr[0]);
    arr.splice(0, 1);
    index ++
    if (index >= num) {
      index = 0;
    };
  };
  return answer;
};



module.exports = router;

