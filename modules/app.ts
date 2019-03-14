import * as express from "express";
import * as bodyParser from "body-parser";
import { CSV  } from "./routes/csv";
import * as multer from 'multer'
import * as cors from 'cors'

const UPLOAD_PATH = 'uploads';


class App {

    public app: express.Application;
    public csv: CSV = new CSV();

    constructor() {
        this.app = express();
        this.config();        
        this.csv.routes(this.app); 
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
        this.app.use(upload.array('csv',12))
    }

}

export default new App().app;