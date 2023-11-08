import fs from 'fs'
import path from "path";
import { yarg } from './config/plugins/args.plugin';

const { b: base, l: limit, s: showTable } = yarg;
const OUT_DIR = 'outputs'

let outputMessage = '';
const headerMessage = `
===========================
      Tabla del ${base}
===========================\n
`

for (let i = 1; i <= limit; i++) {
  const result = `${base} x ${i} = ${base * i} \n`;
  outputMessage += result;
}

outputMessage = headerMessage + outputMessage;

fs.mkdirSync(OUT_DIR, { recursive: true })
const outFilePath = path.join(OUT_DIR, `tabla-${base}.txt`);

fs.writeFileSync(outFilePath, outputMessage)


showTable ? console.log(outputMessage) : console.log('File created!');
