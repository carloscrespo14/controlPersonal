import dotenv from 'dotenv';
import * as ip from 'ip';
import * as shell from 'shelljs';

dotenv.config();

const port = Number(process.env.SERVER_PORT);

const firstIp = ip.address() || 'localhost';

// Replace localhost in swagger
shell.sed(
  '-i',
  'ref": "/',
  'ref": "http://' + firstIp + ':' + port + '/',
  'dist/swagger.json'
);
shell.sed(
  '-i',
  '"host": "/"',
  '"host": "' + firstIp + ':' + port + '"',
  'dist/swagger.json'
);
