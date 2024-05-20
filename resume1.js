const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function printPDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const resumePath = path.join('file://', __dirname, 'resume.html');
    await page.goto(resumePath, {waitUntil: 'networkidle0'});

    const pdf = await page.pdf({scale: 0.7, format: 'A3', printBackground: true});


    await browser.close();
    return pdf;
}

printPDF().then(pdf => {
    fs.writeFileSync('resume.pdf', pdf);
}).catch(error => {
    console.error('An error occurred:', error);
});