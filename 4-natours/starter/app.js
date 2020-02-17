const express = require('express');
const fs = require('fs');
const port = 3000;
const app = express();
const morgan = require('morgan');

//middleware to use post request
app.use(express.json());
app.use(morgan('dev'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
  );

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
}

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; //string to number

  const tour = tours.find(el => el.id === id);

  res.status(201).json({
    status: 'success',
    data: {
      tour
    }
  });
}

const createTour = (req, res) => {}
const updateTour = (req, res) => {}
const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
}


app
  .route('/api/v1/tours')
  .get(getTour)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getAllTours)
  .patch(updateTour)
  .delete(deleteTour);


app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});