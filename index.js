let fs = require('fs')
let path = require('path')
    
let QRCode = require('qrcode')
let Jimp = require('jimp')

let ticketCount = parseInt(process.argv[2]) || 5
let clear = process.argv[3] === 'clear'

let requiredDirs = ['qr-codes', 'tickets'];
for (let dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

if (clear) {
    for (let dir of requiredDirs) {
        fs.readdirSync(dir).forEach((filename) => {
            if (filename.endsWith('.png') || filename.endsWith('.html')) {
                fs.unlinkSync(path.join(dir, filename))
            }
        })
    }
}

// For some weird reason bothe the cmd arg and the default must be the same
const plainTicketPath = process.argv[4] || 'assets/plain-ticket-b.png'

const foregroundColor = '#FFF'
const backgroundColor = '#0000'

const X = 1385
const Y = 35

const scale = 3

let generateQRCodeThenTicket = (howMany, i) => {
    let data = generateCode()
    let outfile = `qr-codes/qr-code-${data}.png`

    if (i >= howMany) {
        console.log(`Finished generating ${howMany} tickets`)
        return
    }

    QRCode.toFile(outfile, data, {
        color: {
            dark: foregroundColor,
            light: backgroundColor,
        }
    }, (err) => {
        if (err) {
            throw err
        }

        console.log(`QR Code Generated For ${data}`)

        generateTicketUsingQRCode(howMany, i, outfile, data)
    })
}

let generateTicketUsingQRCode = (howMany, i, QRCodePath, data) => {
    let outfile = `tickets/ticket-with-qr-code-${data}.png`

    Jimp.read(plainTicketPath)
        .then((image) => {
            Jimp.read(QRCodePath)
                .then((src) => {
                    src.scale(scale)
                    image.composite(src, X, Y)
                    
                    image.write(outfile)
                    
                    console.log(`QR Code added to Ticket ${data}`)

                    generateQRCodeThenTicket(howMany, ++i)
                })
                .catch((err) => {
                    throw err
                })
        })
        .catch((err) => {
            throw err
        })
}

let generateCode = () => {
    return `Levit82k19-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
}

let generateTickets = (howMany, i) => {
    generateQRCodeThenTicket(howMany, i)
}

let main = () => {
    generateTickets(ticketCount, 0)
}

main()