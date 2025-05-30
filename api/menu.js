import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const dbFile = path.join(process.cwd(), 'public', 'db.json');

    try {
        const data = await fs.promises.readFile(dbFile, 'utf8');
        const json = JSON.parse(data);
        res.status(200).json(json.menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Error reading db.json' });
    }
}
