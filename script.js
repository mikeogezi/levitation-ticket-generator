const childProcess = require('child_process');
const files = [
  'assets/plain-ticket.png',
  'assets/plain-ticket-b.png',
  'assets/plain-ticket-c.png',
  'assets/plain-ticket-d.png'
]

for (let i = 0; i < files.length; ++i) {
  childProcess.execSync(`node index.js 50 clear ${files[i]}; node generateHTML.js; cp tickets/* ${i + 1}/;`);
  childProcess.execSync(`node index.js 50 clear ${files[i]}; node generateHTML.js; cp tickets/* ${i + 1}/;`);
}