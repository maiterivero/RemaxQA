var utilities = require('../utilities');
var controller = require('../controller');
var setUp = utilities.readJson('setUp.json');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
console.log('---------------------Suite search---------------------');
describe('Test property search', function() 
{

    // Open the website in the browser before each test is run
    beforeEach(function(done) {
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.url).then(done); 
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) 
    {       
        controller.afterSpec(); 
        controller.quit().then(done);    
    });

   
    using(testData.citiesProvider, function (cities) 
    {
        it('search for sale in ' + cities, function(done) 
        {            
            controller.findElement('inputForSale')
            .then(function (element)
            {
                element.click()
                .then(
                    controller.setSteps('Clear input search and insert '+ cities),
                    element.clear(),
                    element.sendKeys(cities)
                    .then(
                        controller.waitForElementToClick('autocompleteItem',4000), 
                        controller.setSteps('Select the first result that show autocomplete element'),
                        setTimeout(function()
                        {  
                            controller.getCurrentUrl().then(function (url) 
                            {                               
                            var content = utilities.textContentText(url,cities);
                            controller.setSteps('Current url " '+ url +' " content " '+ cities+' "'); 
                            expect(content).toBe(true); 
                            done();    
                            })  
                        }, 10000)                                
                    )       
                )            
            })          
        });
    })
    it('empty search show a message', function (done) 
    {        
        controller.findElement('btnLetsGo')
        .then(function (element)
        {
            controller.setSteps('Press btn "lets go" with input search empty'),
            element.click()
            .then(
                setTimeout(function() 
                {
                    controller.getELementText('messageInvalidSearch').then(function (text) 
                    {
                    var content = utilities.textContentText(text,'Oops - please try that again');
                    controller.setSteps('Remax show a message with text "Oops - please try that again"'),
                    expect(content).toBe(true);
                    done();                             
                    })    
                }, 6000)                        
            )            
        })        
    })
});