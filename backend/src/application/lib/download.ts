import * as Jimp from "jimp";
import * as uuid from "uuid";
import * as fs from "fs";

export class DownloadImage {
    download(url: string, w: number,id?:string) {
        return new Promise<string>(async (resolve, reject) => {
            try {
                if (!url) {
                    resolve("");

                    return;
                }

                const timerId = setTimeout(() => {
                    resolve(url);

                    clearTimeout(timerId);
                }, 20000);

                const image = await Jimp.read(url);
                const ext = image._originalMime.split("/")[1];
                const imageName = `${uuid.v4()}_${Date.now()}.${ext}`;

                image.resize(w, Jimp.AUTO);
                /*console.log('idorg',id)
                
                if (id) {
                  if (fs.existsSync(`${process.cwd()}/public/static/shop/${id}`)) {
                    console.log('Папка уже есть');
                  }
                  fs.mkdir(`${process.cwd()}/public/static/shop/${id}`, async err => {
                    if (err) throw err; // не удалось создать папку
                    await image.writeAsync(`${process.cwd()}/public/static/shop/${id}/${imageName}`)
                    console.log('Папка успешно создана');
                  });
                } else {
                  await image.writeAsync(`${process.cwd()}/public/static/shop/${imageName}`);
                }
                */
                await image.writeAsync(`${process.cwd()}/public/static/shop/${imageName}`);
                
                

                resolve(`/static/shop/${imageName}`);
            } catch (e) {
                resolve(url);
            }
        });
    }
}
