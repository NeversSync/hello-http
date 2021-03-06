const parsedUrl = require('url').parse;
const fs = require('fs');
const path = require('path');
const cowsay = require('cowsay');

const routes = {
  '/': index,
  '/index.html': index,
  '/fact': fact,
  '/greeting': greeting
};

function app(req, res) {
  console.log(req.method, req.url);

  const url = parsedUrl(req.url, true);
  req.query = url.query; 

  res.setHeader('Content-Type', 'text/html');
  const route = routes[url.pathname] || notFound;
  route(req, res);
}

function index(req, res) {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, page) => {
    if(err) notFound;
    res.end(page);
  });
}

function notFound(req, res) {
  res.statusCode = 404;
  res.statusMessage = `CANNOT ${req.method} ${req.url}`;
  res.end(res.statusMessage);
}

function greeting(req, res) { 
  if(req.query.salutation) {
    greeting = '<pre>' + cowsay.say({
    text : `salutations ${req.query.salutation}`,
    e : "oO",
    T : "U " }) + '</pre>';
    res.end(greeting);
  } else {
    let greeting = '<pre>' + cowsay.say({
      text : `hello ${req.query.name || 'stranger'}`,
      e : "oO",
      T : "U " }) + '</pre>';
      res.end(greeting)
  }
}

function fact(req, res) {
  const filePath = path.join(__dirname, 'fact.html');
  fs.readFile(filePath, (err, page) => {
    if(err) notFound;
    res.end(page);
  });
}

module.exports = app;