# ⚙️ Set up Local Development Environment for FHEVM
```
+-----------------------------+
|   ⚙️ Install Node.js        |
|   ⚙️ Clone Repo Template    |
|   ⚙️ Install Dependencies   |
|   ⚙️ Hardhat configuration  |
+-----------------------------+
                |
                v
+-----------------------------+
|   🎉 Ready to dev           |
+-----------------------------+
```
## 📦 Hardhat Setup

### 1. Install Node.js (LTS)
* Download and install: [official website](https://nodejs.org/en).
* Use an **even-numbered** version (e.g., *v18.x*, *v20.x*)
* To verify your installation:
```bash
node -v
npm -v
```

### 2. Clone offical FHEVM Hardhat template.
```bash
cd <your-location>
git clone https://github.com/zama-ai/fhevm-hardhat-template
cd fhevm-hardhat-template
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set up the Hardhat configuration variables
If you do plan to deploy to the Sepolia Ethereum Testnet, you'll need to set up the following [Hardhat Configuration variables](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables).

**MNEMONIC**:
A mnemonic is a 12-word seed phrase used to generate your Ethereum wallet keys.
```bash
npx hardhat vars set MNEMONIC
```


**INFURA_API_KEY**:
Allows you to connect to Ethereum testnets like Sepolia: [Developer Metamask ](https://developer.metamask.io/)
```bash
npx hardhat vars set INFURA_API_KEY
```

---
**🎉 Congratulations! You're all set to start building your confidential dApp.**
