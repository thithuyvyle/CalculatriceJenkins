const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
// Arguments pour Docker
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--headless'); 


(async function testCalculatrice() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
         // L’app est dans le même conteneur → port 8080 exposé vers 8081 par Jenkins
        await driver.get("http://localhost:8080/index.html");

        const number1 = await driver.findElement(By.id('number1'));
        const number2 = await driver.findElement(By.id('number2'));
        const operation = await driver.findElement(By.id('operation'));
        const resultat = await driver.findElement(By.id('calculate'));

        // --- Test 1 : Addition ---
        await number1.sendKeys('5');
        await number2.sendKeys('3');
        await operation.sendKeys('Addition');
        await resultat.click();

        // Afficher les résultats
        let resultat1 = await driver.findElement(By.css('#result span')).getText();
        console.log('Résultat addition :', resultat1 === '8' ? "Réussi" : "Echoué (obtenu: ${resultat1}");

        // --- Test 2 : Division par zéro --
        await number2.clear();
        await number2.sendKeys('0');
        await operation.sendKeys('Division');
        await resultat.click();

        // Afficher les résultats
        let resultat2 = await driver.findElement(By.css('#result span')).getText();
        console.log('Résultat division par zéro :', resultat2 === 'Division par zéro impossible.' ? "Réussi" : "Echoué (obtenu: ${resultat2}");

        // --- Test 3 : Entrée Non Valide ---
        await number1.clear();
        await operation.sendKeys('Multiplication');
        await resultat.click();
        // Afficher les résultats
        let resultat3 = await driver.findElement(By.css('#result span')).getText();
        console.log('Résultat entrée non valide:', resultat3 === 'Veuillez entrer des nombres valides.' ? "Réussi" : "Echoué (obtenu: ${resultat3}");

        // --- Test 4 : Vérifier la Soustraction ---
   
        await number2.clear();
        await number1.sendKeys('10');
        await number2.sendKeys('5');
        await operation.sendKeys('Soustraction');
        await resultat.click();

        // Afficher les résultats
        let resultat4 = await driver.findElement(By.css('#result span')).getText();
        console.log('Résultat soustraction:', resultat4 === '5'? "Réussi" : "Echoué (obtenu: ${resultat4}");

    } finally {
        await driver.quit();
    }
})();

