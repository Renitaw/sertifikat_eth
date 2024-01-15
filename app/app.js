// Initialize Web3
const web3 = new Web3(window.ethereum);
const contractAddress = '0x6d1999a24fDc3A05e6423cBD5C386D94f7d7928a';
const contractAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "penerima",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "nama",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "kursus",
            "type": "string"
          }
        ],
        "name": "SertifikatDiterbitkan",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "admin",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "daftarSertifikat",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "penerima",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "nama",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "kursus",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "jumlahSertifikat",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "penerima",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "nama",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "kursus",
            "type": "string"
          }
        ],
        "name": "terbitkanSertifikat",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

// Replace with your actual contract address
const blockchainPendidikanContract = new web3.eth.Contract(contractAbi, contractAddress);


// Function to get the admin address
async function getAdminAddress() {
    try {
        const adminAddress = await blockchainPendidikanContract.methods.admin().call();
        console.log('Admin Address:', adminAddress);
    } catch (error) {
        console.error('Error getting admin address:', error);
    }
}

// Call this function to get the admin address
getAdminAddress();


async function ajukanPermintaanSertifikat() {
    try {
        // Ensure the user has given permission
        await window.ethereum.enable();

        // Get Ethereum accounts
        const accounts = await web3.eth.getAccounts();

        // Validate Ethereum address
        if (!accounts.length || !web3.utils.isAddress(accounts[0])) {
            throw new Error('Invalid Ethereum address');
        }

        // Get input values
        const nama = document.getElementById('nama').value;
        const kursus = document.getElementById('kursus').value;

        // Validate input values
        if (!nama || !kursus) {
            throw new Error('Nama and Kursus must be provided');
        }

        // Call terbitkanSertifikat function on the smart contract
        const gasEstimate = await blockchainPendidikanContract.methods
            .terbitkanSertifikat(accounts[0], nama, kursus)
            .estimateGas({ from: accounts[0] });

        const result = await blockchainPendidikanContract.methods
            .terbitkanSertifikat(accounts[0], nama, kursus)
            .send({ from: accounts[0], gas: gasEstimate });

        // Display success message or perform other desired actions
        const resultMessage = `Permintaan sertifikat berhasil diajukan untuk ${nama} pada kursus ${kursus}. Transaction hash: ${result.transactionHash}`;
        document.getElementById('resultMessage').innerText = resultMessage;
        document.getElementById('certificateResult').style.display = 'block';

        console.log('Penerima', nama);
        console.log('Kursus', kursus);
    } catch (error) {
        // Log the entire error object for more details
        console.error('Error:', error);
    }
}

