# Deploy Your First Smart Contract on FHEVM

In this tutorial, you'll learn how to take a **basic Solidity smart contract** and progressively **upgrade it to support Fully Homomorphic Encryption** using the FHEVM library by Zama.

By the end, you'll have a fully functional smart contract that supports FHE computation.

---

## 📊 Solidity vs FHEVM Solidity
```typescript
--------------------------------------------------------------------------------------------
| Aspect              | Solidity Counter (`Counter.sol`)| FHEVM Counter (`FHECounter.sol`) |
|---------------------|---------------------------------|----------------------------------|
| Data type           | `uint32` (clear)                | `euint32` (encrypted)            |
| Input               | Plain integers                  | Encrypted input + proof          |
| Arithmetic          | `+`, `-`                        | `FHE.add`, `FHE.sub`             |
| Value visibility    | Public for everyone             | Restricted, requires permission  |
| Privacy             | None (fully transparent)        | Strong privacy (confidential)    |
--------------------------------------------------------------------------------------------
```
---

## 🔹 Counter.sol (Standard Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title A simple counter contract
contract Counter {
  uint32 private _count;

  /// @notice Returns the current count
  function getCount() external view returns (uint32) {
    return _count;
  }

  /// @notice Increments the counter by a specific value
  function increment(uint32 value) external {
    _count += value;
  }

  /// @notice Decrements the counter by a specific value
  function decrement(uint32 value) external {
    require(_count >= value, "Counter: cannot decrement below zero");
    _count -= value;
  }
}
```

👉 Key points:
- `_count` is stored as a **clear `uint32`** (anyone can read it on-chain).  
- Functions take **plaintext integers** as parameters.  
- Both the current value and all changes are visible to everyone.

---

## 🔹 FHECounter.sol (FHEVM Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title A simple FHE counter contract
contract FHECounter is SepoliaConfig {
    euint32 private _count;

    function getCount() external view returns (euint32) {
        return _count;
    }

    function increment(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        euint32 encryptedEuint32 = FHE.fromExternal(inputEuint32, inputProof);
        _count = FHE.add(_count, encryptedEuint32);

        // Allow contract and caller to view the decrypted value
        FHE.allowThis(_count);
        FHE.allow(_count, msg.sender);
    }

    function decrement(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        euint32 encryptedEuint32 = FHE.fromExternal(inputEuint32, inputProof);
        _count = FHE.sub(_count, encryptedEuint32);

        FHE.allowThis(_count);
        FHE.allow(_count, msg.sender);
    }
}
```
---
👉 Key differences:
- Instead of declaring `contract Counter {...}`, now you should declare it like this: `contract FHECounter is SepoliaConfig {...}`
- `_count` is stored as **`euint32` (encrypted)**.  
- Functions accept **encrypted inputs** (`externalEuint32`) + a **zero-knowledge proof** (`inputProof`).  
- Instead of `+` / `-`, you must use `FHE.add` / `FHE.sub`.  
- Conversion from external input: `FHE.fromExternal`.  
- Explicit permissions via `FHE.allowThis` and `FHE.allow` are required to decrypt results.

---
## From your project's root directory:
- Open `hardhat.config.ts` and fill your: `MNEMONIC`, `INFURA_API_KEY` ([Infura](https://developer.metamask.io/)), `ETHERSCAN_API_KEY` ([Etherscan](https://etherscan.io/apidashboard)).

- The `FHECounter.sol` template has already been saved in the `contracts directory` (you can check it there).
```bash
npx hardhat compile
```
- Great! Your smart contract is now compiled and ready to use FHEVM features.

## Test functions
- The `FHECounter.ts` and `FHECounterSepolia.ts` template has already been saved in the `test directory`.
```bash
npx hardhat test
```
- Expected Output:
```typescript
FHECounter
✔ encrypted count should be uninitialized after deployment
✔ increment the counter by 1 (44ms)
✔ decrement the counter by 1

FHECounterSepolia
This hardhat test suite can only run on Sepolia Testnet
    - increment the counter by 1

3 passing (104ms)
1 pending
```
- Great! Your contract is working perfectly and ready to be deployed.

## Deploy contract on Sepolia
- The `deploy.ts` template has already been saved in the `deploy directory`.
```bash
npx hardhat compile --network sepolia
npx hardhat deploy --network sepolia
```
- Expected Output:
```typescript
Nothing to compile
No need to generate any newer typings.
deploying "FHECounter" (tx: 0x5bf43a930f4d6f94f621673e26185f4cd9342b9714d55d83580bb5eda3f917a0)...: deployed at 0x50d012443C4EBFbde1046f59069E6aF6076024D1 with 546287 gas
FHECounter contract:  0x50d012443C4EBFbde1046f59069E6aF6076024D1
```
- Verify Contract:
```bash
npx hardhat verify --network sepolia 0x50d012443C4EBFbde1046f59069E6aF6076024D1
```
- Test Contract:
```bash
npx hardhat test --network sepolia
```
- Expected Output:
```typescript
  FHECounter
This hardhat test suite cannot run on Sepolia Testnet
    - encrypted count should be uninitialized after deployment
This hardhat test suite cannot run on Sepolia Testnet
    - increment the counter by 1
This hardhat test suite cannot run on Sepolia Testnet
    - decrement the counter by 1

  FHECounterSepolia
1/10 Encrypting '0'...
2/10 Call increment(0) FHECounter=0x50d012443C4EBFbde1046f59069E6aF6076024D1 handle=0x71df6909dead328b6798ee3b0712e8ded2657b7335000000000000aa36a70400 signer=0xDFa7F4840B278c717fd4f0037de81D3d3311f2AB...
3/10 Call FHECounter.getCount()...
4/10 Decrypting FHECounter.getCount()=0x2d372ff5f93d983062cc7abb96e283c8b2a04a6225ff0000000000aa36a70400...
5/10 Clear FHECounter.getCount()=0
6/10 Encrypting '1'...
7/10 Call increment(1) FHECounter=0x50d012443C4EBFbde1046f59069E6aF6076024D1 handle=0x63af1ff0c163092b455b973ea4e1c8d6630f99471b000000000000aa36a70400 signer=0xDFa7F4840B278c717fd4f0037de81D3d3311f2AB...
8/10 Call FHECounter.getCount()...
9/10 Decrypting FHECounter.getCount()=0x622d81ab586ce73c68e87d2a21c6c66af05694f80cff0000000000aa36a70400...
10/10 Clear FHECounter.getCount()=1
    ✔ increment the counter by 1 (99860ms)


  1 passing (2m)
  3 pending
```

---

**🎉 Congrats – you've successfully deployed your first smart contract using FHEVM Solidity**

---
## ✅ Conclusion

- **Counter.sol**: Simple but fully transparent. All values and changes are visible to anyone.  
- **FHECounter.sol**: Leverages **FHEVM** to keep values confidential. Only authorized entities can decrypt the results.  
- This demonstrates the **power of confidential smart contracts** with Zama's FHEVM.  
