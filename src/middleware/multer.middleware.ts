import multer from "multer";
import { v6 as uuid } from "uuid";
import path from "node:path";
import fs from "node:fs";


const temp = path.join(__dirname, "./public/temp")
if (!fs.existsSync(temp)) fs.mkdirSync(temp, { recursive: true });

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, "./public/temp");
    },
    filename(_req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
        cb(null, `${name}-${uuid()}${ext}`);
    },
});

export const uploadFile = multer({ storage: storage });