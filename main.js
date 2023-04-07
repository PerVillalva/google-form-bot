import { chromium } from 'playwright';
import { questionnaireOptions } from './consts.js';

// Define the number automatic form submissions you want to generate
const formSubmissions = 15;

// Provide the link to the Google Form you want to generate automatic submissions for
const formLink =
    'https://docs.google.com/forms/d/e/1FAIpQLSc4YA25rJ9tq0dG5uuhIpDLMzGdX5ChXDU1y5y80sIe8V-3WQ/viewform';

void main().then(() => process.exit(0));

async function main() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    for (let i = 0; i < formSubmissions; i++) {
        await page.goto(formLink);
        for (const question of questionnaireOptions) {
            const arr = Object.values(question);
            await page.click(arr[Math.floor(Math.random() * arr.length)]);
            await page.waitForTimeout(0.5);
        }
        await page.click('div.lRwqcd div[role="button"]');
    }
}
