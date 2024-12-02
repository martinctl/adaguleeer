const fs = require('fs')
const path = require('path')
const csvParser = require('csv-parser')


const edgesFile = path.resolve(__dirname, '../data/edges.csv')
const nodesFile = path.resolve(__dirname, '../data/nodes.csv')

const output = path.resolve(__dirname, '../data/network.ts')

const parseCsv = (filePath) =>
    new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });


(async () => {
    try {
        // Parse edges and nodes
        const edges = await parseCsv(edgesFile);
        const nodes = await parseCsv(nodesFile);

        // Create mappings
        const nodeIdMap = {};
        const formattedNodes = nodes.map((node, index) => {
            const id = (index + 1).toString(); // Create incremental IDs
            nodeIdMap[node.video_game] = id;
            return {
                id,
                name: node.video_game,
                group: parseInt(node.group),
                popularity: parseInt(node.count, 10) / 1000, // Convert count to rating for demonstration
            };
        });

        const formattedLinks = edges.map((edge) => ({
            source: nodeIdMap[edge.video_game],
            target: nodeIdMap[edge.video_game_right],
            weight: parseInt(edge.weight, 10) / 1000, // Normalize weight
        }));

        // Generate JavaScript file content
        const outputContent = `import { GameNode, GameLink } from '../types/network';

      export const nodes: GameNode[] = ${JSON.stringify(formattedNodes, null, 2)};
      
      export const links: GameLink[] = ${JSON.stringify(formattedLinks, null, 2)};
      `;

        // Write to the output file
        fs.writeFileSync(output, outputContent, 'utf-8');
        console.log('Data successfully converted and saved to network.js');
    } catch (error) {
        console.error('Error converting data:', error);
    }
})();

