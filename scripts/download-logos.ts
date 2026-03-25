import fs from 'fs';
import path from 'path';
import https from 'https';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const partnersData = [
  { name: 'Hostinger', url: 'https://cdn.hostadvice.com/2023/11/Hostinger-Logo-300x63.png.webp' },
  { name: 'IONOS', url: 'https://cdn.hostadvice.com/2024/06/ionos-logo-300x88.png.webp' },
  { name: 'HostArmada', url: 'https://cdn.hostadvice.com/2023/12/logo-2-colors-300x55.png.webp' },
  { name: 'Kamatera', url: 'https://cdn.hostadvice.com/2023/07/Kamateras-logo.png.webp' },
  { name: 'ScalaHosting', url: 'https://cdn.hostadvice.com/2017/08/scalahosting-250x34.png.webp' },
  { name: 'ChemiCloud', url: 'https://cdn.hostadvice.com/2020/03/color-chemicloud-logo-250x57.png.webp' },
  { name: 'Verpex Hosting', url: 'https://cdn.hostadvice.com/2019/08/Clip2net_190807125036-1-250x71.jpg.webp' },
  { name: 'Neoxea', url: 'https://cdn.hostadvice.com/2024/02/neoxea-logo-blue.png.webp' },
  { name: 'ZYNOO', url: 'https://cdn.hostadvice.com/2025/08/Zynoo-logo.png.webp' },
  { name: 'Ultahost', url: 'https://cdn.hostadvice.com/2024/11/logo-light-en-300x62.webp' },
  { name: 'VPSServer.com', url: 'https://cdn.hostadvice.com/2025/05/images-300x68.png.webp' },
  { name: 'MVPS', url: 'https://cdn.hostadvice.com/2018/05/mvps-logo.png.webp' },
  { name: 'Sharktech', url: 'https://cdn.hostadvice.com/2025/07/ScreenShot-2025-07-21-at-16.22.29-300x63.png.webp' },
  { name: 'Godlike host', url: 'https://cdn.hostadvice.com/2025/02/godlike-logo-1-300x93-1.png.webp' },
  { name: 'Namecheap', url: 'https://cdn.hostadvice.com/2025/09/namecheap-logo.png.webp' },
  { name: 'InterServer', url: 'https://cdn.hostadvice.com/2014/04/interserver_320x80-250x63.png.webp' },
  { name: 'Z.com', url: 'https://cdn.hostadvice.com/2018/07/Z.com_-e1594989769272-250x41.png.webp' },
  { name: 'Network Solutions', url: 'https://cdn.hostadvice.com/2025/11/Network-Solutions-logo-new-300x99.png.webp' },
  { name: 'FastComet', url: 'https://cdn.hostadvice.com/2019/08/fastcomet-logo-blue_600x150_v2-250x63.png.webp' },
  { name: 'Contabo', url: 'https://cdn.hostadvice.com/2021/01/logo-contabo-250x50-hostadvice.png.webp' }
];

function downloadFile(url: string, dest: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://hostadvice.com/'
            }
        }, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); // Delete the file async
            reject(err);
        });
    });
}

async function main() {
    const targetDir = path.join(process.cwd(), 'public', 'partners');
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log('Starting logo downloads...');
    for (const p of partnersData) {
        const ext = path.extname(p.url) || '.png';
        const filename = `${p.name.toLowerCase().replace(/\s+/g, '-')}${ext}`;
        const targetPath = path.join(targetDir, filename);

        console.log(`Downloading ${p.name}...`);
        try {
            await downloadFile(p.url, targetPath);
            
            // Update DB
            const dbPath = `/partners/${filename}`;
            await prisma.partner.updateMany({
                where: { name: p.name },
                data: { logo_url: dbPath }
            });
            console.log(`Successfully updated ${p.name}`);
        } catch (err: any) {
            console.error(`Error for ${p.name}: ${err.message}`);
        }
    }
    console.log('Finished.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
