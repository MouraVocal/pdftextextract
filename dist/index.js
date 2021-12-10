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
function getContent(src) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = yield (0, pdf_1.getDocument)(src).promise;
        const page = yield doc.getPage(1);
        return yield page.getTextContent();
    });
}
function getItems(src) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield getContent(src);
        const items = content.items.map((item) => {
            (0, fs_1.writeFile)('teste.txt', item.str, {
                encoding: 'utf-8',
                flag: 'a'
            }, (err) => {
                console.log(err);
            });
        });
        return items;
    });
}
getItems("./pdf/1.pdf");
