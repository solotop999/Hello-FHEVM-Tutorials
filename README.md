# ⚡ FHEVM Course UI – Hello FHEVM Tutorial

A full **end-to-end tutorial and interactive UI** that introduces Web3 developers to the world of **Fully Homomorphic Encryption on the Ethereum Virtual Machine (FHEVM)**.  

---

## 🎯 Target Audience

This tutorial is designed for Web3 developers who:
- ✅ Know the basics of Solidity (comfortable with simple smart contracts).  
- ✅ Are new to FHEVM and want to learn encrypted inputs/outputs in dApps.  
- ✅ Already use standard Ethereum tools (Hardhat, Foundry, Metamask, React).  
- ✅ Have **no prior knowledge of FHE or cryptography** – we assume zero background in advanced math.  

If you can write and deploy a basic smart contract, you can follow this tutorial.

---

## 📚 Learning Objectives

By the end of this tutorial, you will:  

1. 🔑 **Understand FHEVM basics** and why encryption on-chain matters.  
2. ⚙️ **Set up your local dev environment** with Node.js, Hardhat, and FHEVM tools.  
3. 🚀 **Deploy and interact with a simple FHEVM dApp end-to-end.**  
4. 🔒 **Experience the full workflow**:  
   - Encrypt user input in the frontend  
   - Compute privately in the smart contract  
   - Decrypt the result locally  
5. 🎮 Be confident to start experimenting with **fun and advanced use cases** (e.g., private voting, encrypted DeFi, anonymous auctions).  

---

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS  
- **Animations & UI**: framer-motion + lucide-react  
- **Smart Contracts**: Solidity + Hardhat (with FHEVM template)  
- **Wallet**: rainbowkit / Metamask / Sepolia Testnet  
- **Tech**: [Zama Confidential Blockchain Protocol](https://docs.zama.ai/protocol)  

---

## 🔄 Data Flow in FHEVM

```
User (👤)  
   |  
   |  (1) Encrypted Input  
   v  
+-------------------------+  
|   🔒 Smart Contract     |  
|   (FHEVM Execution)     |  
+-------------------------+  
   |  
   |  (2) Encrypted Result  
   v  
User (👤)  
   |  
   |  (3) Decrypt locally  
   v  
Plaintext Output (Visible only to User)  
```
---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/your-repo/fhevm-course-ui
cd fhevm-course-ui
npm install
```

### 2. Set up Hardhat Project and deploy FHECounter.sol to Sepolia

```bash
cd fhevm-hardhat-template
npm install
```

- Open `hardhat.config.ts` and fill your: `MNEMONIC`, `INFURA_API_KEY` ([Infura](https://developer.metamask.io/)), `ETHERSCAN_API_KEY` ([Etherscan](https://etherscan.io/apidashboard)).

```bash
npx hardhat compile --network sepolia
# Deploy to Sepolia
npx hardhat deploy --network sepolia
```

- Verify Contract:
```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

- Test Contract:
```bash
npx hardhat test --network sepolia
```

### 3. Run Dev Server
```bash
cd ..
```
- Rename `env_example` to `.env`
- Fill `VITE_CONTRACT_ADDRESS` and `VITE_WALLETCONNECT_PROJECT_ID` in `.env`
- `VITE_CONTRACT_ADDRESS`: Your FHECounter contract address
- `VITE_WALLETCONNECT_PROJECT_ID`: [ Register Free ](https://dashboard.reown.com/)
- Start development server:
```bash
npm run dev
```
Now, open <http://localhost:5173/> in your browser. 🚀

- You will find **complete documentation and guidance** on FHEVM Solidity
right within the app.
- This tutorial equips you with everything needed to build a dApp
**end-to-end**
- from writing and deploying the smart contract to creating a polished frontend.

✨ As a bonus, the project includes a **live demo page** where you can
interact directly with your FHEVM-powered dApp.

---

## 🏆 Why This Tutorial?

- 📖 **Beginner-friendly**: Assumes no prior FHE knowledge.  
- 🔄 **Complete flow**: Setup → Deploy → Encrypt → Compute → Decrypt.  
- ⚡ **Hands-on**: You get a real working dApp, not just code snippets.  
- 🎨 **Engaging UI**: Dark mode course-style interface for better learning experience.  
---

# 🎉 **Happy coding!**
