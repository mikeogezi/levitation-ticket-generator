let fs = require('fs')
let path = require('path')
const rowsPerPage = 3
const ticketsPerPage = 3

let clear = process.argv[3]

const pages = process.argv[2] || 1
const ticketCount = ticketsPerPage * pages

console.log(`Generating ${pages} ${pages > 1 ? 'pages' : 'page'}`)

if (clear) {
    fs.readdirSync('tickets').forEach(filename => {
        if (filename.endsWith('.html')) {
            fs.unlinkSync(path.join('tickets', filename))
        }
    })
}

let getHtmlFile = (ticketRows, id) => {
    return `<!DOCTYPE html>

        <html lang="en">
        <head>
            <title>Levitation Tickets Batch #${id}</title>
            <meta http-equiv="content-type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.css">
            <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap-grid.css">
            <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap-reboot.css">

            <link rel="stylesheet" type="text/css" href="../style.css">

            <script src="../bootstrap/js/bootstrap.js"></script>
            <script src="../bootstrap/js/bootstrap-bundle.js"></script>

            <style type="text/css" media="all">
                html {
                    margin:0;
                    zoom: 1; 
                }

                .col-sm {
                    padding: 10px;
                    margin: 5px;
                    border-width: 2px;
                    align-content: center;
                    border-style: dashed;
                }

                .col-sm span {
                    font-size: 150%;
                    font-weight: bolder;
                }
                
                .col-sm b {
                    font-weight: 400;
                }
            </style>
        </head>

        <body>
            <div class="container">
                ${ticketRows}
            </div>
        </div>
        </body>
        </html>`
}

let getAllTicketRowsHtml = (tickets, perPage) => {
    // console.log(tickets)
    let str = ''
    for (let i = 0, row = 0; i < tickets.length; i += 1, ++row) {
        let p1 = tickets[i]
        str += getTicketRowHtml(p1)
        if (row == perPage - 1) {
            str += '<div class="pagebreak">'
            row = -1
        }
    }
    return str
}

let getTicketRowHtml = (p1) => {
    return `<div class="row">
        ${getTicketHtml(p1)}
        </div>`
}

let getTicketHtml = (ticket) => {
    return `<div class="col-sm">
        <!--<b>UJ CBT App Unlock Ticket:</b><br/>-->
        <span>${generateImgHTML(ticket)}</span><br/>
        <!--<small><i>Valid for 2 months from activation</i></small>-->
        </div>`
}

let generateImgHTML = (path) => {
    return `<img src="${path}" width="100%" />`
}

let tickets = fs.readdirSync('./tickets')
let ticketsGotten = tickets.length
// let ticketsGotten = 0
// for (let i in tickets) {
//     let jsonDoc = jsonData[i]

//     ++ticketsGotten

//     if (i == tickets.length - 1) {
//         console.log(`Tickets exhuasted; generate more tickets`)
//     }
// }

let id = Math.random().toString(36).substring(2, 7).toUpperCase()
let ticketFilename = `tickets/tickets-${id}.html`
fs.writeFileSync(ticketFilename, getHtmlFile(getAllTicketRowsHtml(tickets, rowsPerPage), id))
console.log(`Generated HTML file (${ticketFilename}) with ${ticketsGotten} tickets`)