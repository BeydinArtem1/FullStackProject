const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const Schema = mongoose.Schema;


const costSchema = new Schema({
  text: String,
  summ: Number,
  date: String
});

const url = 'mongodb+srv://ArtemBeydin:Restart987@cluster0.cm9vp.mongodb.net/Project?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Cost = mongoose.model('costs', costSchema);

app.use(cors());

app.use(express.json());

app.get('/getAll', (req, res) => {
  Cost.find().then(result => {
    res.send({ data: result });
  });
});

app.post('/create', (req, res) => {
  if (req.body.hasOwnProperty("text") && req.body.hasOwnProperty("summ") && req.body.hasOwnProperty("date")) {
    const cost = new Cost(req.body);
    cost.save().then(result => {
      res.send({ data: result });
    });
  } else {
    res.status(422).send('invalid property name');
  }
});


app.delete('/delete', (req, res) => {
  if (req.query._id) {
    Cost.deleteOne({ _id: req.query._id }).then((result) => {
      Cost.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(404).send('id not found');
  }  
});

app.patch('/update', (req, res) => {
  if (req.body._id) {
    if (req.body.hasOwnProperty("text") || req.body.hasOwnProperty("summ") || req.body.hasOwnProperty("date")) {
      Cost.updateOne({ _id: req.body._id }, req.body).then((result) => {
        Cost.find().then((result) => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(422).send('invalid property name');
    }
  } else {
    res.status(404).send('id not found');
  };
});

app.listen(8000, () => {
  console.log('app listening on port 8000!')
});

