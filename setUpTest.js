var fs = require('fs');
var utilities = require('./utilities');
var assert = require('selenium-webdriver/testing/assert');


var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var setUp = utilities.readJson('setUp.json');



module.exports = 
{    
    getDriver: function () 
    {
        var driver;
        switch (setUp.browser) {
            case 'firefox':
                  driver = new webdriver.Builder()
                    .forBrowser(setUp.browser)
                   .usingServer('http://10.10.25.42:4444/wd/hub')
                    .build();
                break;
            case 'chrome':
                 var driver = new webdriver.Builder().withCapabilities(
            {
            browserName : 'chrome',
                'chromeOptions': { args: ['test-type','ignore-certificate-errors','disable-extensions'] }
                    }).build();
                break;        
            default:
                break;
        }
       
        
        // maximize the window
        driver.manage().window().maximize();
        // delete all cookies
        driver.manage().deleteAllCookies();
        return driver;
    }  
    
}

