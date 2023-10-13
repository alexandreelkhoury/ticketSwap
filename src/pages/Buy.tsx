import CardsTickets from '../components/CardsTickets';
import abi from '../abi/abi.json';
import { ethers } from 'ethers';
import React, { useState, useEffect } from "react";
import {ref} from '../App';
import {v4 as uuidv4} from 'uuid';

const contractAddress = '0x8018a4080a8F704634f319Ddd03FEb5Ccd1242D8';

function Buy() {

    const [contract, setContract] = useState<any>([]);
    const [accounts, setAccounts] = useState(['']);

    useEffect(() => {
        connectWallet();
      }, []);

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await (window.ethereum as any).request({ method: 'eth_requestAccounts' });
          setAccounts(accounts);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
          setContract(contract);
        }
    }

    async function addToDB(ticket: string) {
        try {
          // Check if the user already has a ticket ==> don't add his address to a new row, just update the quantity
          ref.where("address", "==", accounts[0]).get().then((querySnapshot) => {
              if (querySnapshot.empty) {
                  ref.doc(uuidv4()).set({address : accounts[0], quantity: 1, ticket : ticket} );
              } else {
                  querySnapshot.forEach((doc) => {
                      const quant = doc.data().quantity;
                      doc.ref.update({quantity: quant+1});
                  })}})}
        catch (err) {
          console.log(err)
        }
    }

    async function buyTicketRegular() {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const transaction = await contract.mintSilverTicket({ value: ethers.utils.parseEther("0.01") });
            await transaction.wait;
            addToDB("regular");
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
            // Check if the user already has a ticket ==> don't add his address to a new row, just update the quantity
            addToDB("vip");}
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
