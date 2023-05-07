//syncs server static files with client build 
const fs = require('fs');

fs.cpSync(
    './build/',
    '../server/static/',
    {recursive: true}
);

