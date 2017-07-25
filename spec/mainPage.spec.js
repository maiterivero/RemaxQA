//var fs = require('fs');
//var assert = require('selenium-webdriver/testing/assert');
var controller = require('../controller');
var utilities = require('../utilities');
var fs = require('fs');
var searches = ['FOR SALE', 'HOME ESTIMATES', 'AGENTS', 'OFFICES'];
var placeholder = ['City and State, Address or Zip Code','Property Address, City or Zip Code','City, State or Zip Code','City, State or Zip Code'];
var pageObject = utilities.readJson('objectRepository.json');
var setUp = utilities.readJson('setUp.json');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 800000;
console.log('---------------------Suite mainPage---------------------');
describe('Test Main page', function() 
{
    // Open the website in the browser before each test is run
    beforeEach(function(done) 
    {  
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.url).then(done); 
    }) 

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        controller.afterSpec(); 
        controller.quit().then(done);       
    });
    
    it('search link', function (done) 
    {
        setTimeout(function()
        { 
        //The following searches are available: FOR SALE, HOME ESTIMATES, AGENTS, OFFICES
            controller.setSteps('The following searches are available: FOR SALE, HOME ESTIMATES, AGENTS, OFFICES');
            controller.findElements('searchType')
            .then(function(elements)
            {
                var i=0;
                elements.forEach(function (element) 
                {
                    element.getText()
                    .then(function(text)
                    {
                        controller.setSteps(text + ' is equal to ' + searches[i] + ' ?');  
                        expect(searches[i]).toEqual(text);         
                        i++;   
                    });
                }); 
                done();          
            });   
        },10000)
    })
    it('check: Default text in FOR SALE search is "City and State, Address or Zip Code"', function (done) {
        setTimeout(function()
        {
            var text=placeholder[0];
            checkPlaceHolder('linkForSale','inputForSale').then(function (placeholder) 
            {
                controller.setSteps('placeholder: '+placeholder+' is equal text: '+ text);
                expect(placeholder).toBe(text);
                done();      
            })     
        },5000)
    })
    it('check: Default text in HOME VALUES search is "Property Address, City or Zip Code"', function (done) {
        setTimeout(function()
        {
            var text=placeholder[1];
            checkPlaceHolder('linkHomeEstimates', 'inputHomeEstimates').then(function (placeholder) 
            {
                controller.setSteps('placeholder: '+placeholder+' is equal text: '+ text);
                expect(placeholder).toBe(text);
                done();      
            })                
        },5000)
    })
    it('check: Default text in AGENTS search is "City, State or Zip Code"', function (done) {
        setTimeout(function()
        {
            var text=placeholder[2];
            checkPlaceHolder('linkAgents', 'inputAgents').then(function (placeholder) 
            {
                controller.setSteps('placeholder: '+placeholder+' is equal text: '+ text);
                expect(placeholder).toBe(text);
                done();      
            })            
        },5000)
    })
    it('check: Default text in OFFICES search is "City, State or Zip Code"', function (done) {
        setTimeout(function()
        {
            var text=placeholder[3];
            checkPlaceHolder('linkOffices', 'inputOffices').then(function (placeholder) 
            {
                controller.setSteps('placeholder: '+placeholder+' is equal text: '+ text);
                expect(placeholder).toBe(text);
                done();      
            })           
        },5000)        
    })
    
    
}, 10000);

function checkPlaceHolder(idlink,idinput) 
{
    return new Promise(
    function (resolve) 
    {
        controller.findElement(idlink)
        .then (function (element) 
        {
            element.click();           
            controller.findElement(idinput)
            
            .then(function (element) 
            {
                controller.setSteps('take placeholder attribute');
                console.log('take placeholder attribute');
                return element.getAttribute('placeholder')
                .then(function (placeholder) 
                { 
                    resolve(placeholder) ;            
                });  
            })
        }) 

    })      
}
