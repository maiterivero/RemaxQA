var utilities = require('../utilities');
var controller = require('../controller');
var setUp = utilities.readJson('setUp.json');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
console.log('---------------------Suite---------------------');
describe('Test Portal Blocks', function() 
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

    it('The Portal Blocks section will allow the user to access three different sites, RE/MAX Global, RE/MAX Commercial, and The RE/MAX Collection.', function(done) 
    { 
        controller.findElements('portalBlocksTitles').then(function(elements)
        {
            var i=0;   
            elements.forEach(function (element) 
            {         
            controller.scrollToElement(element);   
            element.getText().then(function(text)
            {
                controller.setSteps('Element text '+ text +' is equal '+testData.portalBlocksTitles()[i]+ ' ?.')
                expect(text).toBe(testData.portalBlocksTitles()[i]);                 
                i++;
                if(i===elements.length)
                done();
            })   
            });            
        })             
    });
   
    using(testData.portalBlocksRedirect, function (data) 
    {
        it('Url content '+ data.url, function(done) 
        { 
            controller.findElement(data.btn).then(function(element)
            {
                controller.scrollToElement(element);                                       
                element.getText().then(function(text)
                {
                    controller.setSteps('click element '+ text)
                })              
                element.click().then(function()
                {
                    controller.changePage();
                    setTimeout(function()
                    {
                        controller.getCurrentUrl().then(function(url)
                        {
                            controller.setSteps(url + ' content : ' + data.url +' ?');
                            var result=utilities.textContentText(url,data.url);
                            expect(result).toBe(true);                           
                            done(); 
                        });                            
                    },4000)
                    
                })
            })             
        });
    });
});