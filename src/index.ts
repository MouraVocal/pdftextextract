import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
import { writeFile } from 'fs';

async function getContent(src: string) {
  const doc = await getDocument(src).promise;
  const page = await doc.getPage(1);
  return await page.getTextContent();
}

async function getItems(src: string) {
  const content = await getContent(src);
  const items = content.items.map((item) => {
    writeFile(`test.txt`, item.str, {
      encoding: 'utf-8',
      flag: 'a'
    }, (err) => {
      console.log(err);
    });
  });
  return items;
}
