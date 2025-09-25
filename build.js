const { Marp } = require('@marp-team/marp-core');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Create output directory
if (!fs.existsSync('out')) {
  fs.mkdirSync('out', { recursive: true });
}

// Load and compile template
const templateSource = fs.readFileSync('template.hbs', 'utf8');
const template = handlebars.compile(templateSource);

const publicationPaths = fs.readdirSync('publications');

const marp = new Marp();
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
    const markdown = fs.readFileSync(filePath, 'utf8');
    const { html, css } = marp.render(markdown);

    const fileName = path.basename(file, '.md') + '.html';
    const outputPath = path.join(outputDir, fileName);

    const fullHtml = template({
      title: path.basename(file, '.md'),
      html,
      css
    });

    fs.writeFileSync(outputPath, fullHtml);
    console.log(`Built: ${outputPath}`);
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
