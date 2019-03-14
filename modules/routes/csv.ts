import { Request, Response } from "express";
const csv = require('fast-csv');
import { UploadCsv } from "../streams/csv";
import * as fs from 'fs'

export class CSV {
    public routes(app): void {
        app.route('/csv')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })
            .post(async (req: Request, res: Response) => {
                let files: any = req.files
                console.log(req.files)
                if (files.length < 1) {
                    res.status(200).send({
                        message: 'post request failed , no file!!!!'
                    })
                    return;
                }
                    
                let readStream = csv.fromPath(files[0].path);
                readStream.on("end", () => {
                    fs.unlink((files[0].path), () => console.log("done"));
                })
                
                readStream.pipe(new UploadCsv());

                res.status(200).send({
                    message: 'post request successfulll!!!!'
                })
            })
            .put((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'put request successfulll!!!!'
                })
            })
            .delete((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'delete request successfulll!!!!'
                })
            })
            .all((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'other request successfulll!!!!'
                })
            })

    }
}