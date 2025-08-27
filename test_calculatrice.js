const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
// Arguments pour Docker
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--headless'); 

options.addArguments('--disable-gpu');
options.addArguments('--remote-debugging-port=9222'); 
options.addArguments('--user-data-dir=/tmp/unique-profile'); 


(async function testCalculatrice() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        await driver.get('http://localhost:8081/index.html') 

        const number1 = await driver.findElement(By.id('number1'));
        const number2 = await driver.findElement(By.id('number2'));
        const operation = await driver.findElement(By.id('operation'));
        const resultat = await driver.findElement(By.id('calculate'));

        // --- Test 1 : Addition ---
        await driver.findElement(By.id('number1')).sendKeys('5');
        await driver.findElement(By.id('number2')).sendKeys('3');
        await driver.findElement(By.id('operation')).sendKeys('Addition');
        await driver.findElement(By.id('calculate')).click();

        // Afficher les résultats
        let resultat1 = await driver.findElement(By.css('#result span')).getText();
        console.log('Résultat addition :', resultat1);

        // --- Test 2 : Division par zéro ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number1')).sendKeys('10');
        await driver.findElement(By.id('number2')).sendKeys('0');
        await driver.findElement(By.id('operation')).sendKeys('Division');
        await driver.findElement(By.id('calculate')).click();

        // Afficher les résultats
        let resultat2 = await driver.findElement(By.css('#result span')).getText();
        console.log('Résultat division par zéro :', resultat2);

        // --- Test 3 : Entrée Non Valide ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number1')).sendKeys('10');
        await driver.findElement(By.id('operation')).sendKeys('Multiplication');
        await driver.findElement(By.id('calculate')).click();
        // Afficher les résultats
        let resultat3 = await driver.findElement(By.css('#result span')).getText();
        console.log('Résultat entrée non valide:', resultat3);

        // --- Test 4 : Vérifier la Soustraction ---
        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number1')).sendKeys('10');
        await driver.findElement(By.id('number2')).sendKeys('5');
        await driver.findElement(By.id('operation')).sendKeys('Soustraction');
        await driver.findElement(By.id('calculate')).click();

        // Afficher les résultats
        let resultat4 = await driver.findElement(By.css('#result span')).getText();
        console.log('Résultat soustraction:', resultat4);

    } finally {
        await driver.quit();
    }
})();

