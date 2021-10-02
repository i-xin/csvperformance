const parse = require("csv-parse");
const fastCsv = require("fast-csv");
const csvParser = require("csv-parser");
const papa = require("papaparse");
const fs = require("fs");

const csvFile = "test.csv";

function testCsv(cb) {
  const rs = fs.createReadStream(csvFile);
  const stream = parse();
  const result = [];
  rs.pipe(stream)
    .on("data", (d) => {
      const data = d[0];
      result.push(data);
    })
    .on("end", () => {
      console.log(result[1]);
      cb();
    });
}

function testFastCsv(cb) {
  const rs = fs.createReadStream(csvFile);
  const stream = fastCsv.parse();
  const result = [];
  rs.pipe(stream)
    .on("data", (d) => {
      result.push(d[0]);
    })
    .on("end", () => {
      console.log(result[1]);
      cb();
    });
}

function testCsvParser(cb) {
  const rs = fs.createReadStream(csvFile);
  const stream = csvParser();
  const result = [];
  rs.pipe(stream)
    .on("data", (d) => {
      result.push(d);
    })
    .on("end", () => {
      console.log(result[0]);
      cb();
    });
}

function testPapaParse(cb) {
  const rs = fs.createReadStream(csvFile);
  const stream = papa.parse(papa.NODE_STREAM_INPUT);
  const result = [];
  rs.pipe(stream)
    .on("data", (d) => {
      result.push(d[0]);
    })
    .on("end", () => {
      console.log(result[1]);
      cb();
    });
}

console.time("csv-parse");
testCsv(() => {
  console.timeEnd("csv-parse");
  console.time("fast-csv");
  testFastCsv(() => {
    console.timeEnd("fast-csv");
    console.time("csv-parser");
    testCsvParser(() => {
      console.timeEnd("csv-parser");
      console.time("papa-parse");
      testPapaParse(() => {
        console.timeEnd("papa-parse");
      });
    });
  });
});
