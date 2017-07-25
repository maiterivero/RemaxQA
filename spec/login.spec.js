var controller = require('../controller');
var utilities = require('../utilities');
var fs = require('fs');
var pageObject = utilities.readJson('objectRepository.json');
var setUp = utilities.readJson('setUp.json');
var using = require('jasmine-data-provider');
var testData = require('./TestData.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 800000;
console.log('---------------------Suite Login---------------------');
describe('Test  My RE/MAX Log in', function() 
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
    
    using(testData.elementPageLogin, function (elementId) 
    { 
        it('Check ' +elementId+ ' is displayed in Log in page', function (done) 
        {
            setTimeout(function()
            {             
                controller.findElement('btnMyRemax')            
                .then(function(element)
                {                    
                    element.click().then(function()
                    {
                        controller.setSteps('Click element btnMyRemax');  
                        controller.elementIsDisplayed(elementId).then(function(isdisplayed)
                        {
                            controller.setSteps('Element ' + elementId + ' is diplayed? '+ isdisplayed);        
                            expect(isdisplayed).toBe(true);        
                            done();  
                        });                  
                    });     
                });
            },10000);
        });
    });
    it('Check btn Sign-in with empty data', function(done)
    {
        setTimeout(function()
        {             
            controller.findElement('btnMyRemax').then(function(element)
            {
                element.click().then(function()
                {
                    controller.setSteps('Click element btnMyRemax');  
                    controller.findElement('btnSignIn').then(function(element)
                    {
                        element.click().then(function()
                        {
                            controller.setSteps('Click element btnSignIn');  
                            controller.findElement('messageInputMail').then(function(elementMSG)
                            {
                                elementMSG.getAttribute('class').then(function(att)
                                {                    
                                    controller.setSteps('Class '+ att +' contain validation--invalid');         
                                    expect(att).toContain('validation--invalid');                                             
                                    done();  
                                }); 
                            })
                        })   
                    });                  
                });     
            });
        },10000);    
    });
    
})