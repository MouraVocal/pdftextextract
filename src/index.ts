import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
import { writeFile } from 'fs';

async function getContent(src: string, pageNum: number) {
  const doc = await getDocument(src).promise;  
  const page = await doc.getPage(pageNum);
  return await page.getTextContent();
}

async function getText(src: string) {
  const doc = await getDocument(src).promise;
  const numPages = doc.numPages;
  let textContent = '';

  for(let i=1; i <= numPages; i++) {
    const content = await getContent(src, i);

    writeFile(`test.txt`, `PÁGINA ${i}`, {
      encoding: 'utf-8',
      flag: 'a'
    }, (err) => {
      if(err){
        console.log(err);
      }
    });

    const items = content.items.map((item) => {
      textContent += item.str;     
      writeFile(`test.txt`, `${item.str}\n`, {
        encoding: 'utf-8',
        flag: 'a'
      }, (err) => {
        if(err !== null) {
          console.log(err);
        }
      });
    });
  }
  console.log(textContent);
  return textContent;
}

getText('./pdf/1.pdf');
