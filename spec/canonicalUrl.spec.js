var utilities = require('../utilities');
var controller = require('../controller');
var setUpTest = require('../setUpTest');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');
var pageObject = utilities.readJson('objectRepository.json');
var setUp = utilities.readJson('setUp.json');
var fs = require('fs');


var href;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
var citiesCanonicalUrl = ['Memphis','Charlotte','Lexington'];

describe('Checks canonical urls', function() 
{
    // Open the website in the browser before each test is run
    beforeEach(function(done) 
    {  
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.url).then(done);  
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        controller.afterSpec(); 
        controller.quit().then(done);        
    });
    
    using(testData.citiesProvider, function (cities) 
    {
        it('for ' + cities, function (done) 
        {
            setTimeout(function() {         
            
            controller.findElement('inputForSale')
                .then(function (element)
                {
                    element.click()
                    .then(  
                        console.log('city is -----------' + cities),
                        
                        element.clear(),
                        element.sendKeys(cities)
                        .then(
                            controller.setSteps('Clear input search and insert '+ cities),
                            controller.waitForElementToClick('autocompleteItem',5000), 
                            controller.setSteps('Select the first result that show autocomplete element'),
                            setTimeout(function()
                            { 
                                controller.getCurrentUrl().then(function (url) 
                                {
                                    currentUrl=url; 
                                    controller.setSteps('Current url is ' + currentUrl),
                                    console.log('currentUrl is ' + currentUrl);
                                   
                                    controller.getCanonical().then(function (href) 
                                    {                                                                           
                                        console.log('href is ' + href);
                                        expect(utilities.textContentText(href,cities)).toBe(true);
                                        controller.setSteps('Check href in canonical "'+ href +'" content "'+ cities +'"'),
                                        done();                
                                    })
                                    .catch(function (error) {                                            
                                        console.log(error.message);     
                                        fail(error.message);                                                                                                                
                                        done();                                      
                                    });     
                                                         
                                })  
                            }, 10000)                 
                        )                            
                    )            
                })
        }, 8000);
        })
    })
})