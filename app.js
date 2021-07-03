const express = require('express');

const { projects } = require('./data.json');

const app = express();

app.set('view engine', 'pug');
// app.set("views", "./views");

app.use('/static', express.static('public'));

// routes
app.get('/', (req, res) => {
  res.locals = projects;
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res, next) => {
  const { id } = req.params;
  res.locals = projects[id];
  // res.locals.project_name;
  if (id < projects.length) {
    res.render('project');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const err = new Error("Sorry, there's nothing to see here");
  err.status = 404;
  next(err);
});

// error handlers

/*
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err.message);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}
*/

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status);
  console.log(err.status || 500);
  res.render('error', {
    message: err.message,
    status: `Error:${err.status}`,
    error: err,
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Listening on port 8080');
});
