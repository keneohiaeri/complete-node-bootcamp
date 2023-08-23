const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

//Server
const tempOverview = fs.readFileSync('./templates/overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/cards.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/product.html', 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log(url.parse(req.url, true));
    // const pathName = req.url;
    const {query, pathname} = url.parse(req.url, true);
    console.log(query);

    //Homepage
    if (pathname === '/' || pathname === '/home') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
        //console.log(cardsHTML);

        res.end(output);
    }

    //Logout
    else if (pathname === '/go') {
        res.end('You are logged out!');
    }

    //API
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }

    //Products
    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }

    //404
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Opps! Nothing here!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});


// fs.readFile('./final/txt/startTT.txt', 'utf-8', (err, data) => {
//     if (err) return console.log("ERROR!");
//     console.log(data);
// });
// console.log("Will read file!");