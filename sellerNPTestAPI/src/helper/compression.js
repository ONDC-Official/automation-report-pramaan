const archiver = require("archiver");
const unzipper = require("unzipper");
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');

function generateRandomId(length = 8) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

async function createZip(filePaths, zipPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Maximum compression
        });

        // Convert filePaths to an array if it's a string
        if (typeof filePaths === 'string') {
            filePaths = [filePaths];
        }

        console.log(`Creating ZIP: ${zipPath} from files: ${filePaths.join(', ')}`);

        output.on('close', resolve);
        archive.on('error', reject);

        archive.pipe(output);

        filePaths.forEach(filePath => {
            archive.file(filePath, { name: path.basename(filePath) }); // Add each file to the archive
        });

        archive.finalize();
    });
}


async function extractZip(zipPath, extractToPath) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(zipPath)
            .pipe(unzipper.Extract({ path: extractToPath }))
            .on('close', async () => {
                try {
                    const files = await fs.promises.readdir(extractToPath);
                    for (const file of files) {
                        if (file.endsWith('.zip')) {
                            await fs.promises.unlink(path.join(extractToPath, file));
                        }
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', reject);
    });
}

module.exports = { createZip, extractZip, generateRandomId }