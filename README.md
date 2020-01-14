# Levitation Ticket Generator

## About
This repository houses the CLI utilities which I used to generate tickets for the [Levitation 2018 Music Concert](https://levitationconcert.xyz). Each generated ticket has a unique QR code to uniquely identify each attendee.

## Requirements
* [Nodejs](https://nodejs.org/en/download/)
* Run `npm install` to download and install the required dependencies; Jimp and QRCode

## Usage
1. `index.js` - This script generates the tickets by generating a QR code image then compositing it on the base ticket image.
    - Running this command will generate tickets and put them in the `tickets` directory
    - The `ticketCount` argument tells the program the number of tickets to generate. The default value is **5**
    - The `clear` argument tells the program to delete any tickets that had previously been generated that are still in the `tickets` directory
    - Usage: `node index.js [ticketCount=5] [clear|no-clear] `
    
        ```
        $ node index.js
        QR Code Generated For Levit82k19-4BDUOBOPM9
        QR Code added to Ticket Levit82k19-4BDUOBOPM9
        QR Code Generated For Levit82k19-XTD86T82RA
        QR Code added to Ticket Levit82k19-XTD86T82RA
        QR Code Generated For Levit82k19-JDU16W3QEQ
        QR Code added to Ticket Levit82k19-JDU16W3QEQ
        QR Code Generated For Levit82k19-XYR79DH8ZH
        QR Code added to Ticket Levit82k19-XYR79DH8ZH
        QR Code Generated For Levit82k19-Z651NAJUJL
        QR Code added to Ticket Levit82k19-Z651NAJUJL
        Finished generating 5 tickets
        ```
    

2. `generateHTML.js` - This script builds a HTML which has all the tickets. After this HTML file is generated, open it up in Google Chrome or Safari then save it as a PDF.
    - Running this command will generate a HTML file and put it in the `tickets` directory
    - The `pages` argument tells the program the number of pages of tickets to generate. The default value is **1**
    - The `clear` argument tells the program to delete any tickets that had previously been generated that are still in the `tickets` directory
    - The `plainTicketPath` argument tells the program the path to the base ticket image. If you're supplying this argument, then you must use `clear` or `no-clear` for the previous argument
    - Usage: `node generateHTML.js [pages=1] [clear|no-clear] [plainTicketPath=assets/plain-ticket-b.png]`
    
        ```
        $ node generateHTML.js
        Generating 1 page
        Generated HTML file (tickets/tickets-SJHMU.html) with 5 tickets
        ```

## Ticket formats
![](./assets/plain-ticket-b.png)
---
![](./assets/plain-ticket.png)
---
![](./assets/plain-ticket-c.png)
---
![](./assets/plain-ticket-d.png)
