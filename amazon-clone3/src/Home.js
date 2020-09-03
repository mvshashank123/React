import React from 'react';
import "./Home.css";
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt=""/>


        <div className="home__row">
            <Product id="1" 
            title="Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)" 
            price={60900} 
            rating={4} 
            image="https://images-na.ssl-images-amazon.com/images/I/81oFAZ9N6bL._SL1500_.jpg"/>
            <Product id="2" 
            title="God of War (PS4)" 
            price={2999} 
            rating={5} 
            image="https://images-na.ssl-images-amazon.com/images/I/811czebxtnL._SL1500_.jpg"/>
        </div>

        <div className="home__row">
            
            <Product id="4" 
            title="The Theory of Everything" 
            price={359} 
            rating={4} 
            image="https://images-na.ssl-images-amazon.com/images/I/51oHUvYzbsL.jpg"/>
            <Product id="6" 
            title="Seagate Backup Plus Slim 1 TB External Hard Drive Portable HDD" 
            price={2499} 
            rating={4} 
            image="https://images-na.ssl-images-amazon.com/images/I/91rz4ujvcNL._SL1500_.jpg"/>
            <Product id="5" 
            title="Samsung Galaxy Watch (Bluetooth, 46 mm) - Silver" 
            price={29990} 
            rating={5} 
            image="https://images-na.ssl-images-amazon.com/images/I/71LHpHDcnEL._SL1500_.jpg"/>
        </div>

        <div className="home__row">
        <Product id="3" 
            title="Sony WH-1000XM3 Industry Leading Wireless Noise Cancelling Headphones" 
            price={24990} 
            rating={5} 
            image="https://images-na.ssl-images-amazon.com/images/I/61D4Z3yKPAL._SL1500_.jpg"/>
            
        </div>

        </div>

        
    )
}

export default Home
