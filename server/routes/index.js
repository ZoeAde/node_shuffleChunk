var express = require('express');
var router = express.Router();


console.log('hello');

router.get('/', function(req, res, next) {
  res.send('<form method="post" action="/submit"><input placeholder="List Students" name="names" type="text" required><p></p><input placeholder="Number of Groups" name="groups" type="text" required><p></p><input type="submit"></form>');
});

router.post('/submit', function(req, res, next) {
  var nameArray = req.body.names;
  var people = nameArray.replace(/,/g, "").split(" ");
  var groupNumber = parseInt(req.body.groups);
  var result = chunk(people, groupNumber);
  res.render('index', {title: "Shuffle Chunk Groups", result: result});
});


function shuffle(array) {
  var shuffled = [];
  var arr = array.slice(0);
  for (var i = 0; i < array.length; i++) {
    var random = Math.floor(Math.random() * arr.length);
    shuffled.push(arr[random]);
    arr.splice(random, 1);
  }
  return shuffled;
}


function chunk(array, integer) {
  var shuffledArray = shuffle(array);
  var answer = [];
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
  console.log(answer);
  return answer;
};



module.exports = router;

