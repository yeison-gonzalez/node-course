import fs from 'fs'
import path from "path";

const OUT_DIR = 'outputs'

export const handleMultiplication = (base: number) => {
  let outputMessage = '';
  const headerMessage = `
  ===========================
        Tabla del ${base}
  ===========================
  `

  for (let i = 1; i <= 10; i++) {
    const result = `${base} x ${i} = ${base * i} \n`;
    outputMessage += result;
  }

  outputMessage = headerMessage + outputMessage;

  fs.mkdirSync(OUT_DIR, { recursive: true })
  const outFilePath = path.join(OUT_DIR, `tabla-${base}.txt`);

  fs.writeFileSync(outFilePath, outputMessage)

  return console.log(outputMessage);
}