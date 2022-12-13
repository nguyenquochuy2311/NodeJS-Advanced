const express = require("express")
const app = express()
const compression = require("compression")

app.use(compression({ // mot middleware de nen lai data tra ve
    level: 6, // do level compress khi su dung CPU ton tai nguyen cho compress
    threshold: 100 * 1000, // khi vuot qua 1kB moi su dung compression
    filter: (request, resposne) => { // xac dinh cac router khong su dung compress
        if(request.header['x-no-compress']) return false
        return compression.filter(request, resposne)
    }
}))

app.get("/", (req, res) => {
    const strCompression = "Hello World"
    res.send(strCompression.repeat(1000)) // tang len qua 1kB de su dung compress
})

app.listen(3000, () => {
    console.log("The server is running port 3000")
})