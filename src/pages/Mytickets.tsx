import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import WalletConnect from '../components/WalletConnect';
import abi from '../abi/abi.json';
import { ethers } from 'ethers';
import firebase from '../Firebase';
const contractAddress = '0x8018a4080a8F704634f319Ddd03FEb5Ccd1242D8';

const ref = firebase.firestore().collection('ticketswap');

function Mytickets() {


    const [contract, setContract] = useState<any>([]);
    const [accounts, setAccounts] = useState([]);
    const [quantityRegularTicket, setQuantityRegularTicket] = useState(0);
    const [quantityVipTicket, setQuantityVipTicket] = useState(0);

    useEffect(() => {
        fetch();
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

    async function getTickets() {
        if (typeof window.ethereum !== 'undefined') {
          try {
            const transaction = await contract.balanceOf(accounts[0], 1);
            await transaction.wait;
          }
          catch (err) {
            console.log(err)
          }
        }
      }

    //   async function sendRegularTicket() {
    //     if (typeof window.ethereum !== 'undefined') {
    //       const address_to = document.getElementById('address_to').value;
    //       try {
    //         const transaction = await contract.safeTransferFrom( accounts[0] ,address_to, 1, 1, "");
    //         await transaction.wait;
    //       }
    //       catch (err) {
    //         console.log(err)
    //       }
    //     }
    //   }

    //   async function sendVIPTicket() {
    //     if (typeof window.ethereum !== 'undefined') {
    //       const address_to = document.getElementById('address_to').value;
    //       try {
    //         const transaction = await contract.safeTransferFrom( accounts[0] ,address_to, 2, 1, "");
    //         await transaction.wait;
    //       }
    //       catch (err) {
    //         console.log(err)
    //       }
    //     }
    //   }

    return (
        <div>
            <div className='WC'>
                <WalletConnect />
            </div>
            <h1>Your tickets </h1>
            {/* <Button onClick={getBalance}>Get tickets</Button> */}
        </div>
    );
};

export {ref};
export default Mytickets;
