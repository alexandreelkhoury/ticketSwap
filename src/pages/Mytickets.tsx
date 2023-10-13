import { useEffect, useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import abi from '../abi/abi.json';
import { ethers } from 'ethers';
import {ref} from '../App';
import {v4 as uuidv4} from 'uuid';
import CardsSend from '../components/CardsSend';
const contractAddress = '0x8018a4080a8F704634f319Ddd03FEb5Ccd1242D8';

function Mytickets() {

    const [contract, setContract] = useState<any>([]);
    const [accounts, setAccounts] = useState([]);
    const [quantityRegularTicket, setQuantityRegularTicket] = useState(0);
    const [quantityVipTicket, setQuantityVipTicket] = useState(0);

    useEffect(() => {
        fetch();
        getTickets();
      }, []);

    async function fetch() {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await (window.ethereum as any).request({ method: 'eth_requestAccounts' });
          setAccounts(accounts);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
          setContract(contract);
          try {
            const transaction = await contract.balanceOf(accounts[0], 1);
            await transaction.wait;
            setQuantityRegularTicket(transaction);
            console.log("first", quantityRegularTicket);
          }
          catch (err) {
            console.log(err)
          }
          try {
            const transaction = await contract.balanceOf(accounts[0], 2);
            await transaction.wait;
            setQuantityVipTicket(transaction);
            console.log("second", quantityVipTicket);
          }
          catch (err) {
            console.log(err)
          }
        }
    }

    async function updateDB(address_to: string, ticket: string) {
        const senderDoc = await ref.where("address", "==", accounts[0]).get();
        const receiverDoc = await ref.where("address", "==", address_to).get();
        if (senderDoc.empty) {
            console.log("Sender not found in database");
        } else {
            senderDoc.forEach((doc) => {
                const quant = doc.data().quantity;
                doc.ref.update({quantity: quant - 1});
            });
        }
        if (receiverDoc.empty) {
            console.log("Receiver not found in database");
            ref.doc(uuidv4()).set({address: address_to, quantity: 1, ticket: ticket});
        } else {
            receiverDoc.forEach((doc) => {
                const quant = doc.data().quantity;
                doc.ref.update({quantity: quant + 1});
            });
        }
    }

    async function getTickets() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const snapshot = await ref.where("address", "==", accounts[0]).get();
                let regularTickets = 0;
                let vipTickets = 0;
                snapshot.forEach((doc) => {
                    const ticket = doc.data().ticket;
                    const quantity = doc.data().quantity;
                    if (ticket === "regular") {
                        regularTickets += quantity;
                    } else if (ticket === "VIP") {
                        vipTickets += quantity;
                    }
                });
                setQuantityRegularTicket(regularTickets);
                setQuantityVipTicket(vipTickets);
                console.log("Regular tickets:", regularTickets);
                console.log("VIP tickets:", vipTickets);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function sendRegularTicket() {
        if (typeof window.ethereum !== 'undefined') {
            const address_to = (document.getElementById('address_to') as HTMLInputElement).value;
            console.log(address_to);
            console.log(accounts[0]);
            try {
                const transaction = await contract.safeTransferFrom(accounts[0], address_to, 1, 1, 0x00);
                await transaction.wait;
                updateDB(address_to, "regular");
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function sendVIPTicket() {
        if (typeof window.ethereum !== 'undefined') {
            const address_to = (document.getElementById('address_to') as HTMLInputElement).value;
            console.log(address_to);
            try {
              const transaction = await contract.safeTransferFrom( accounts[0] ,address_to, 2, 1, 0x00);
              await transaction.wait;
              updateDB(address_to, "VIP");
            }
            catch (err) {
              console.log(err)
            }
        }
    }

    return (
        <div>
            <div className='WC'>
                <WalletConnect />
            </div>
            <h1 className='title'>My tickets </h1>

            <h1 className='title'> Regular tickets : {quantityRegularTicket.toString()}</h1>

            <div className='card-container'>
            {(() => {
                const cards = [];
                for (let i = 1; i <= quantityRegularTicket; i++) {
                    cards.push(<CardsSend send={sendRegularTicket}/>);
                }
                return cards;
            })()}
            </div>

            <h1 className='title'> VIP tickets : {quantityVipTicket.toString()}</h1>

            <div className='card-container'>
            {(() => {
                const cards = [];
                for (let i = 1; i <= quantityVipTicket; i++) {
                    cards.push(<CardsSend send={sendVIPTicket}/>);
                }
                return cards;
            })()}
            </div>
        </div>
    );
};

export default Mytickets;
