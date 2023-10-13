import CardsTickets from '../components/CardsTickets';
import abi from '../abi/abi.json';
import { ethers } from 'ethers';
import React, { useState, useEffect } from "react";
import {ref} from '../App';

const contractAddress = '0x8018a4080a8F704634f319Ddd03FEb5Ccd1242D8';

function Buy() {

    const [contract, setContract] = useState<any>([]);

    useEffect(() => {
        connectWallet();
      }, []);

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await (window.ethereum as any).request({ method: 'eth_requestAccounts' });
          console.log(accounts);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
          setContract(contract);
        }
    }

    async function buyTicketRegular() {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const transaction = await contract.mintSilverTicket({ value: ethers.utils.parseEther("0.01") });
            await transaction.wait;
          }
          catch (err) {
            console.log(err)
          }
        }
      }

      async function buyTicketVIP() {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const transaction = await contract.mintSGoldTicket({ value: ethers.utils.parseEther("0.02") });
            await transaction.wait;
          }
          catch (err) {
            console.log(err)
          }
        }
      }

    return (
        <div>
            <h1>Summer festival</h1>

            <div className='card-container'>
                <CardsTickets price="0.01 eth" ticket="REGULAR" mint={buyTicketRegular}/>
                <CardsTickets price="0.02 eth" ticket="VIP" mint={buyTicketVIP}/>
            </div>
        </div>
    );
};

export default Buy;
