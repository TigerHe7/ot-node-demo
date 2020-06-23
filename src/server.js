'use strict';

import FoodFinder from './FoodFinder.js'
const express = require('express');
const app = express();

const finder = new FoodFinder()

const opentelemetry = require('@opentelemetry/api');
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const provider = new BasicTracerProvider();

// Configure span processor to send spans to the exporter
const exporter = new JaegerExporter({ serviceName: 'basic-service' });
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();
const tracer = opentelemetry.trace.getTracer('main-tracer');


app.get('/', (req, res) => {
  res.send('Food Service GCP Starter Project - Node.JS\n');
});

app.get('/recipe', (req, res) => {
  const span = tracer.startSpan('main');

  const time_start = (new Date()).getTime();
  
  const { ingredient } = req.query;
  if (!ingredient || ingredient.length < 2) {
    res.send([]);
    return 0;
  }
  const ingredient_parsed = ingredient.substring(1, ingredient.length - 1)
  const inventory = finder.getInventory(ingredient_parsed, span);

  const time_end = (new Date()).getTime();

  span.setAttribute('time', time_end - time_start);
  span.addEvent('example test for time');
  span.end();

  res.send(inventory);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// // simulate some random work.
// for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
//   // empty
// }

// exporter.shutdown();