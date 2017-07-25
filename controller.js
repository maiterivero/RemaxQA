var fs = require('fs');
var setUp = require('./setUpTest');
var utilities = require('./utilities');
var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
    var driver;
var specImg=0;
var pageObject = utilities.readJson('objectRepository.json');
/******************/
var log4js = require('log4js');
var log;
var logger = log4js.getLogger('STEPS<br/>');

var steps='';
var clearSteps=false;
module.exports = {
  
    /**call function getDriver to setUp driver and go url passed in parameter */
    getUrl: function (url) 
    {   
        var title;     
        driver= setUp.getDriver();   
        clearSteps=true;
        module.exports.setSteps('go to url - ' + url); 
        clearSteps=false;
        return driver.get(url);
    },
    /**take screenshot and save log */
    afterSpec: function ()
    {
        module.exports.screenShot().then(function(image, err) 
        {
            fs.writeFile('report/screenShot/img'+  module.exports.getSpecImg() +'.png', image, 'base64', function(err) 
            {
                console.log(err);
            })
        });
        log4js.configure({
        appenders: { specStep: { type: 'file', filename: 'report/step/specStep'+module.exports.getSpecImg()+'.txt' }},
        categories: { default: { appenders: ['specStep'], level: 'info' } }
        });
        module.exports.log(module.exports.getSteps());    
    },   
    log: function (text) 
    {        
        logger.info(text);    
    }, 
    /**open new url */
    setUrl: function (url) 
    {        
       // logger.fatal('go to url' + url);
        return driver.get(url);    
    } ,
    /**add new steps in spec log, if begin a new spec clear old log*/
    setSteps: function (text) {
        if(clearSteps)
        steps='';
        steps+='-'+text+'<br />';
        console.log('STEPS: '+steps);
    },
    /**return steps(steps log for each spec) */
    getSteps: function () {
        return steps;
    },
    /**take screenshot */
    screenShot:function () 
    {
       specImg++;
       return  driver.takeScreenshot(); 
    },

    getSpecImg: function () {
        return specImg;        
    },
    /**compare two values passed in parameters */
    assert: function (value1, value2) 
    {
        var message = 'Error '+ value1 + ' is different ' + value2;
        try {
            return assert.equal(value1,value2,message);
        }
        catch(err) {
            console.log('--------------------****' + message + '****--------------------');
        }        
    },
    /**return current url */
    getCurrentUrl:function () 
    {        
        return driver.getCurrentUrl();
    },
    /**quit driver */
    quit:function () 
    {        
        return driver.quit();        
    },
    /**return page title */
    getTitle:function () 
    {       
        return driver.getTitle();
    },
    /**return a webelement with selector type and selector = parameters value */
    findElement: function (id) 
    {
        var element;
        var selectorType=pageObject[id].selectorType;       
        var selector=pageObject[id].selector;
        
        switch (selectorType) 
        {
            case 'className':
                element = driver.findElement(By.className(selector))
                break;
            case 'id':
                element = driver.findElement(By.id(selector))
                break;
            case 'css':
                element = driver.findElement(By.css(selector))
                break;
            case 'name':
                element = driver.findElement(By.name(selector))
                break;
            case 'js':
                element = driver.findElement(By.js(selector))
                break;
            case 'linkText':
                element = driver.findElement(By.linkText(selector))
                break;
            case 'xpath':
                element = driver.findElement(By.xpath(selector))
                break;
            default:
                break;
        }   
        return element; 
    },
    /**return a webelement list with selector type and selector = parameters value */
    findElements: function (id) 
    {
        var elements;
        var selectorType=pageObject[id].selectorType;       
        var selector=pageObject[id].selector;
        switch (selectorType) {
            case 'className':
                elements = driver.findElements(By.className(selector))
                break;        
            case 'css':
                elements = driver.findElements(By.css(selector))
                break;        
            case 'js':
                elements = driver.findElements(By.js(selector))
                break;        
            case 'xpath':
                elements = driver.findElements(By.xpath(selector))
                break;
            default:
                break;
        }        
        return elements; 
    },
    /**wait a time before search an element, click element */
    waitForElementToClick: function (id, time) 
    {         
        setTimeout(function()
        { 
            console.log('wait for element with selector: ' + id);
            module.exports.findElement(id)
            .then(function (element) 
            {
               element.click();
            })               
        }, time)              
    },
    /**wait a time before search an element */
    waitForElement: function (id, time) 
    {         
        setTimeout(function()
        { 
            console.log('wait for element with selector: ' + id);
            module.exports.findElement(id);
                        
        }, time)              
    },
    /**search a webelement list, compare element's text with text in list */
    compareStringArray: function (id, list) 
    {   
        console.log(id+' '+list);
        module.exports.findElements(id)
        .then(function (elements)
        {
            var i=0;
            elements.forEach(function (element) 
            {
                element.getText()
                .then(function(text)
                {
                console.log(text + ' is equal to ' + list[i]); 
                module.exports.setSteps(text + ' is equal ' + list[i]);   
                module.exports.assert(list[i],text);                
                i++;   
                });
            });
        }); 
    },
     /**search a webelement list, select random element, click in random element and return element's href */
    goToLink: function(id) 
    {
        return new Promise(
            function (resolve) 
            {
            module.exports.setSteps('Search element ' + id);
            module.exports.findElements(id)        
            .then(function (elements)
            {   
                console.log('Total elements ' + elements.length);
                var pos = utilities.getRandom(0,elements.length);   
                console.log('Select element in pos ' + pos);  
                module.exports.setSteps('Select random element and take href attribute');    
                elements[pos].getAttribute('href').then(function (href) 
                {
                    console.log('href is :' + href);
                    module.exports.setSteps('Click element and return href');
                    elements[pos].click();                   
                    resolve(href) ; 
                })  
            })
            }
        ) 
    },
    /**search a webelement list, select random element, click in random element and return element's text */
    getTextLink: function(id) 
    {
        return new Promise(
            function (resolve) 
            {
            module.exports.findElements(id)        
            .then(function (elements)
            {   
                console.log('Total elements ' + elements.length);
                var pos = utilities.getRandom(0,elements.length);   
                console.log('Select element in pos ' + pos);   
                module.exports.setSteps('Select a random element');   
                elements[pos].getText().then(function (text) 
                {
                    var n = text.lastIndexOf(" ");
                    text=text.slice(n,text.length)
                    console.log('text link is :' + text);
                    elements[pos].click();     
                    module.exports.setSteps('Take text "'+ text +'" and click in element');               
                resolve(text) ; 
                })  
            })
            }
        ) 
    },
    /**scroll page until element is visible */
    scrollToElement: function (element)
    {
        driver.executeScript("arguments[0].scrollIntoView(true);",element);
    },   
    getStringIntoString: function(text,word) 
    {            
        var pos = text.search(word);        
        var res = text.slice(0, pos-1);
        return res;
    },
    /**return webelement's text */
    getELementText: function (id) 
    {
        return new Promise(
            function (resolve) 
            {
                module.exports.findElement(id)
                .then(function (element) 
                {  
                    module.exports.setSteps('Take element text');                  
                    resolve(element.getText()) ;
                })     
            }
        ) 
    },
    /**Take city inside href */
    getCityInHref: function (href) 
    {
        module.exports.setSteps('Take city inside href');
        var posIni = href.lastIndexOf('/');
        var posEnd = href.lastIndexOf('-');
        var city = href.slice(posIni+1, posEnd);
        city = city.replace('-', ', ');
        console.log('City in href is ' + city);        
        return city;
    },
    /**
     * Search a web element with attribute canonical, if yes: return element's href, if no: return an error message
     */
    getCanonical: function () 
    {
        return new Promise(function (resolve,reject) 
        {
            var element;           
            driver.findElements( By.css('link[rel=canonical]')).then(function ( links ) 
            {
                console.log('length '+ links.length);
                if(links.length>0)
                {
                    var url='';
                    for (var i = 0; i < links.length; i ++) {
                        element=links[i];
                        element.getAttribute('rel').then(function (rel) {
                            if (rel === 'canonical') {
                                module.exports.setSteps('Find an element with attribute rel= canonical and return element href'),
                                element.getAttribute('href').then(function (hrefl) {
                                    console.log('canonical href: ' + hrefl);
                                    url=hrefl;
                                    resolve(url);   
                                })               
                            }                             
                        })            
                    } 
                }
                else
                {                        
                var reason = new Error('this page dont have canonical url');
                reject(reason); // reject    
                }                      
            })    
        })
    },
    /**switch windows */
    changePage: function () 
    {
        var windows = driver.getAllWindowHandles().then(function (handles) 
        {
           
            var aux=handles[1]
            driver.switchTo().window(aux);//.then(function ()                
           // {
                // driver.manage().timeouts().pageLoadTimeout(7000)}).then(function () 
                // {
                    // driver.getTitle().then(function (title) 
                    // {
                    //     console.log('Title now: ' + title);  
                    // })
           // })
        }) 
    },
   
    elementIsDisplayed: function (id) 
    {
        return new Promise(function (resolve,reject) 
        {
            setTimeout(function()
            {
                module.exports.findElement(id).then(function (element) 
                {                        
                    element.isDisplayed().then(function (displayed) 
                    {
                        console.log(displayed);
                        resolve(displayed);
                    })    
                }) 
            },8000)   
        })
    },
}