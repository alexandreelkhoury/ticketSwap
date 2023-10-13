import React from 'react';
import '../style/home.css';
import WalletConnect from '../components/WalletConnect';
import Cards from '../components/CardsEvents';

function Home() {
    return (
        <div >
            <h1 className='title'>Upcoming events </h1>

            <div className='WC'>
                <WalletConnect />
            </div>
            <div className='card-container'>
            {(() => {
                const cards = [];
                for (let i = 1; i <= 9; i++) {
                    cards.push(<Cards />);
                }
                return cards;
            })()}
            </div>

            <h1 className='title'>Past events </h1>

            <div className='card-container'>
            {(() => {
                const cards = [];
                for (let i = 1; i <= 21; i++) {
                    cards.push(<Cards />);
                }
                return cards;
            })()}
            </div>
        </div>
    );
};

export default Home;
