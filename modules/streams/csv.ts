const { Writable } = require('stream');
const { prisma } = require('../../generated/prisma-client')
var crypto = require('crypto');
var crypto = require('crypto');

export class UploadCsv extends Writable {
    async write(chunk, _encoding, _callback) {
        try {
            let text = chunk.toString().split(",")[0];

            await prisma
                .createdata({
                    text,
                    hash: crypto.createHash('sha256').update(text).digest('base64'),
                })
        } catch (er) {
        }
    }
}