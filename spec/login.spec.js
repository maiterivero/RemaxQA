var controller = require('../controller');
var utilities = require('../utilities');
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
        });
    });
    using(testData.loginData, function (data, description) 
    {
        it(description, function(done)
        {                         
            controller.findElement('btnMyRemax').then(function(element)
            {
                element.click().then(function()
                {
                    setTimeout(function()
                    {
                    controller.setSteps('Click element btnMyRemax');  
                    controller.sendKey('inputMail',data.mail);
                    controller.sendKey('inputPassword',data.pass);
                    controller.findElement('btnSignIn').then(function(element)
                    {
                        element.click().then(function()
                        {
                            setTimeout(function()
                            {
                            controller.setSteps('Click element btnSignIn');  
                            switch (data.case) {
                            case '1':
                                controller.findElement('messageInputMail').then(function(elementMSG)
                                {
                                    elementMSG.getAttribute('class').then(function(att)
                                    {                    
                                        controller.setSteps('Class '+ att +' contain validation--invalid');         
                                        expect(att).toContain('validation--invalid');                                             
                                        done();  
                                    }); 
                                })
                                break;        
                            case '2':
                                controller.getTitle().then(function(title)
                                {
                                    controller.setSteps('Title page is My RE/MAX equal '+ title +' ?'); 
                                    expect('My RE/MAX').toBe(title);        
                                    done(); 
                                })  
                                break;        
                            case '3':
                                controller.elementIsDisplayed('messageErrorLogin').then(function(isdisplayed)
                                {
                                    controller.setSteps('Element messageErrorLogin is diplayed? '+ isdisplayed);        
                                    expect(true).toBe(isdisplayed);        
                                    done();  
                                })   
                            
                            default:
                                break;
                            }
                            },2000); 
                            
                        })   
                    }); 
                    },3000);                 
                });     
            });
           
        });
    });
    using(testData.linkLoginForm, function(data)
    {
        it('When click '+data.link+' element '+data.element+' is present', function(done)
        {         
            controller.findElement('btnMyRemax').then(function(element)
            {
                element.click().then(function()
                {
                    setTimeout(function()
                    {
                        controller.findElement(data.link).then(function(element)
                        {
                            controller.setSteps('Click in link '+ data.link);
                            element.click();
                            setTimeout(function()
                            {
                                controller.elementIsDisplayed(data.element).then(function(isdisplayed)
                                    {
                                        controller.setSteps('Element '+data.element+' is diplayed? '+ isdisplayed);        
                                        expect(true).toBe(isdisplayed);        
                                        done();  
                                    })   
                            },3000);
                        });
                    },3000);
                });
            });        
        });
    });
    
})