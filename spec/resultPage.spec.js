var utilities = require('../utilities');
var controller = require('../controller');
var setUpTest = require('../setUpTest');
var pageObject = utilities.readJson('objectRepository.json');
var setUp = utilities.readJson('setUp.json');
var fs = require('fs');
var href;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
console.log('---------------------Suite linksSEO---------------------');
describe('Test result page', function() 
{
    // Open the website in the browser before each test is run
    beforeEach(function(done) {  
        console.log('---------------------Test---------------------');           
        controller.getUrl(setUp.url).then(done);  
        setTimeout(function() {
            
            controller.findElement('btnMoreCities')
            .then(function (element) 
            {
                controller.scrollToElement(element);
                element.click();
                controller.goToLink('linkMoreCities')
                .then(function (value) 
                {
                    href = value;  
                    //done();                  
                })  
            })   
        }, 10000);      
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        controller.afterSpec(); 
        controller.quit().then(done); 
    });
    
    it('checks Bread Crumb content city', function(done) 
    {        
        setTimeout(function() 
        {
            var city = controller.getCityInHref(href)  
            controller.getELementText('resultsBreadcrumb')
            .then(function (text) 
            {                 
                var content = utilities.textContentText(text,city);  
                expect(content).toBe(true);
                controller.setSteps('Bread crumb "'+ text +'" content "' + city +'"');
                done();
            })             
        }, 10000);          
    },30000)

    it('checks search title', function (done) 
    { 
        setTimeout(function() 
        {
            var city = controller.getCityInHref(href)  
            controller.getELementText('titleInSearch')
            .then(function (text) 
            {   
                var content = utilities.textContentText(text,city);
                expect(content).toBe(true);
                controller.setSteps('Title "'+ text +'" content "' + city +'"');
                done();
            })             
        }, 15000);          
    },30000)

    it('checks properties and pages',function (done) 
    {
        var itemsPerPage;
        var totalProperties;
        var pages;
        var itemInLastPage;
        setTimeout(function () 
        {   
            //search element total properties
            controller.findElement('totalProperties')
            .then(function (element) 
            {
                //take test from element
                element.getText().then(function (text) 
                {   
                    //take only the number of properties             
                    totalProperties=controller.getStringIntoString(text,'properties');
                    totalProperties=totalProperties.replace(',','');
                    totalProperties=parseInt(totalProperties);
                    console.log('totalProperties ' + totalProperties);
                    controller.setSteps('Total properties is ' + totalProperties);
                    setTimeout(function() 
                    {  
                        //search btns page                  
                        controller.findElements('btnpages')
                        .then(function (elements) 
                        {                           
                            //select the last one
                            var element=elements[elements.length-1];
                            //take total of pages
                            element.getText()
                            .then(function (text) 
                            {
                                //pages -1 because the last page can has less properties
                                pages=(parseInt(text))-1;
                                
                            })                       
                            controller.scrollToElement(element);   
                            //go the last page of properties                     
                            element.click()
                            .then(function () 
                            {
                                setTimeout(function() 
                                {
                                    //take the properties showing in last page
                                    controller.findElements('itemInLastPage')  
                                    .then(function (elements) 
                                    {
                                        itemInLastPage=parseInt(elements.length);
                                        controller.getELementText('itemPerPages')
                                        .then(function (text) 
                                        {
                                            itemsPerPage=parseInt(text);                                        
                                            controller.setSteps('itemsPerPage '+ itemsPerPage);
                                            controller.setSteps('page '+ pages);
                                            controller.setSteps('itemInLastPage ' + itemInLastPage);
                                            controller.setSteps(totalProperties+ ' = ' + itemsPerPage + ' * ' + pages + '+' + itemInLastPage);
                                            controller.setSteps(totalProperties+'= '+ (itemsPerPage *  pages +  itemInLastPage));
                                            //check total properties is equal item per page * pages + properties in last page
                                            expect(totalProperties).toEqual(itemsPerPage *  pages +  itemInLastPage);
                                            done();
                                        })                                    
                                    }) 
                                }, 5000);
                            })
                        })                       
                    }, 7000);                
                });
            })  
        },10000)      
        
    },60000)
})