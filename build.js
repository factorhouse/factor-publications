const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create output directory
if (!fs.existsSync('out')) {
  fs.mkdirSync('out', { recursive: true });
}

const publicationPaths = fs.readdirSync('publications');
console.log(`Found ${publicationPaths.length} projects`);

for (const pPath of publicationPaths) {
  const publicationPath = path.join('publications', pPath);
  const files = fs.readdirSync(publicationPath).filter(item => item.endsWith('md'));
  const projectName = path.basename(pPath);
  const outputDir = path.join('out', projectName);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  files.forEach((file) => {
    const filePath = path.join(publicationPath, file);
    const fileName = path.basename(file, '.md') + '.html';
    const outputPath = path.join(outputDir, fileName);

    try {
      execSync(`npx @marp-team/marp-cli "${filePath}" -o "${outputPath}"`, { stdio: 'inherit' });
      console.log(`Built: ${outputPath}`);
    } catch (error) {
      console.error(`Failed to build ${filePath}:`, error.message);
    }
  });

  // Copy images directory if it exists
  const imagesDir = path.join(publicationPath, 'images');
  if (fs.existsSync(imagesDir)) {
    const outputImagesDir = path.join(outputDir, 'images');
    fs.cpSync(imagesDir, outputImagesDir, { recursive: true });
    console.log(`Copied images: ${outputImagesDir}`);
  }
}

console.log('All done! 🌛');
