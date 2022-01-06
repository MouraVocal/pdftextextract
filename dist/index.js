"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_1 = require("pdfjs-dist/legacy/build/pdf");
const fs_1 = require("fs");
function getContent(src, pageNum) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = yield (0, pdf_1.getDocument)(src).promise;
        const page = yield doc.getPage(pageNum);
        return yield page.getTextContent();
    });
}
function getText(src) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = yield (0, pdf_1.getDocument)(src).promise;
        const numPages = doc.numPages;
        let textContent = '';
        for (let i = 1; i <= numPages; i++) {
            const content = yield getContent(src, i);
            (0, fs_1.writeFile)(`test.txt`, `PÁGINA ${i}`, {
                encoding: 'utf-8',
                flag: 'a'
            }, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            const items = content.items.map((item) => {
                textContent += item.str;
                (0, fs_1.writeFile)(`test.txt`, `${item.str}\n`, {
                    encoding: 'utf-8',
                    flag: 'a'
                }, (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        }
        console.log(textContent);
        return textContent;
    });
}
getText('./pdf/1.pdf');
