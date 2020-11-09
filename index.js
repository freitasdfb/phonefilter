const csv = require('csv-parser');
const fs = require('fs');
const fastcsv = require('fast-csv');
let counter = 0;
const ws = fs.createWriteStream("out.csv");
const data = [];
// const data = [
//   ];

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        let number = JSON.stringify(row).replace(/\D/g, '');
        // console.log(number.length)
        if (filterNumer(number)) {
            counter++;
        }
    })
    .on('end', () => {
        console.log(counter);
        writeCsv();
    });


function filterNumer(numberRegexed) {
    if (numberRegexed.length === 11) {
        const n = numberRegexed.slice(0, 2) + numberRegexed.slice(3, numberRegexed.length)
        data.push({ n });
        // console.log(data)
        return true;
    } else {
        return false;
    }
}

function writeCsv() {
    fastcsv
        .write(data, { headers: false })
        .pipe(ws);
}

