'use strict';
module.exports = {
    citiesProvider: function() {
        return [
            'Charlotte,NC',
            'Miami,FL',            
            'wexford,PA',
            'Chicago,IL',
            'lexington,KY',
            'Pittsburgh,PA'            
        ];
    },
    classesLink: function() {
        return [
            'icon-facebook',
            'icon-twitter',
            'icon-googleplus',
            'icon-youtube',
            'icon-linkedin',
            'icon-pinterest',
            'icon-instagram' 
        ];
    },
    titleList: function () {
        return [
            'REMAX - Home | Facebook',
            'RE/MAX (@remax) | Twitter',
            'RE/MAX, LLC - Google+',
            'RE/MAX, LLC - YouTube',
            'RE/MAX | LinkedIn',
            'RE/MAX Real Estate (remax) on Pinterest',
            'RE/MAX Real Estate (@remax) • Instagram photos and videos'
        ];
    },
    elementPageLogin: function(){
        return [
            "btnCreateAccount", "btnForgotPassword", "btnSignIn", "btnPrivacy" 
        ];
    }, 
    linkCrawlPaths: function(){
        return [
            {title:'Homes for sale by City', link: 'linkByCities', list:['Homes For Sale in Philadelphia', 'Homes For Sale in Atlanta', 'Homes For Sale in Chicago', 'Homes For Sale in Los Angeles', 'Homes For Sale in Jacksonville']},
            {title:'Homes for sale by State', link: 'linkByState' , list:['Homes For Sale in AL', 'Homes For Sale in AK', 'Homes For Sale in AZ', 'Homes For Sale in AR', 'Homes For Sale in CA']},
            {title:'Homes for sale by Zip Code', link: 'linkByZipCode' , list:['Homes For Sale in 28906', 'Homes For Sale in 34145', 'Homes For Sale in 29582', 'Homes For Sale in 40475', 'Homes For Sale in 32137']},
            {title:'Homes for sale by County', link: 'linkByCounty' , list:['Homes For Sale in Los Angeles', 'Homes For Sale in Jefferson', 'Homes For Sale in Orange', 'Homes For Sale in Montgomery', 'Homes For Sale in Washington']}
        ];
    },
    

        
}