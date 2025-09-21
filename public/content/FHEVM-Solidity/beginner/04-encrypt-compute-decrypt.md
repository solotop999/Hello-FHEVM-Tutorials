# 🔐 Encrypt → Compute → Decrypt Flow in FHEVM (with FHECounter.sol)

This document explains the **Encrypt → Compute → Decrypt** flow in
practice using the `FHECounter.sol` contract.

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

## 1. Encrypt (Client Side)

-   On the **client side**, you have a clear value (e.g., you want to
    increment by **5**).
-   Instead of sending `5` directly, you encrypt it with the **public
    key of the FHEVM**.
-   This produces an `externalEuint32` ciphertext, together with an
    **input proof**.
-   You send both the ciphertext and proof to the smart contract via
    `increment()` or `decrement()`.

👉 The blockchain never sees the raw value `5`, only the encrypted data.

```typescript
  // 1. Create FHEVM instance
  const instance = await FhevmInstance.create("sepolia");

  // 2.  encrypted input
  const buffer = instance.createEncryptedInput(contractAddress, await signer.getAddress());

  // 3.  increment by 5
  buffer.add32(BigInt(5));

  // 4. Encrypt to generate ciphertext(s) and proof
  const ciphertexts = await buffer.encrypt();

  // 5. ciphertexts return Array: [ { data: Uint8Array, proof: string, ... } ]
  const { handle, proof } = ciphertexts[0]; // handle ~ externalEuint32

  // 6. Call contract.increment with ciphertext + proof
  const contract = new ethers.Contract(contractAddress, FHECounterAbi, signer);
  const tx = await contract.increment(handle, proof);
```
---

## 2. Compute (On-chain inside FHEVM)

-   Inside the contract:
    -   `FHE.fromExternal(inputEuint32, inputProof)` converts the
        external ciphertext into an internal ciphertext usable by the
        contract.
    -   Operations are performed directly on encrypted values:
        -   `FHE.add(_count, encryptedEuint32)` → for increment
        -   `FHE.sub(_count, encryptedEuint32)` → for decrement
-   `_count` itself is an encrypted integer (`euint32`).
-   This means all math is done **without decrypting**.

👉 This is the essence of **Fully Homomorphic Encryption**: compute
directly on ciphertexts.

---

## 3. Decrypt (Client Side)

-   After updating `_count`, the contract grants permissions:
    -   `FHE.allowThis(_count)` → allows the contract itself to access
        `_count` when required.
    -   `FHE.allow(_count, msg.sender)` → grants the caller (user) the
        right to decrypt.
-   When you call `getCount()`, the contract returns `_count` **still
    encrypted**.
-   On the client side, you use your **private key** to decrypt the
    ciphertext and reveal the actual value (e.g., `5`).

👉 The blockchain never learns `_count = 5`. Only the client with the
private key can see it.

```typescript

  // 1. Create FHEVM instance
  const instance = await FhevmInstance.create("sepolia");

  // 2. Fetch encrypted count handle
  const encryptedHandle: string = await contract.getCount();

  // 3. Generate ephemeral keypair
  const keypair: Keypair = instance.generateKeypair();

  // 4. Prepare input for userDecrypt
  const handleContractPairs = [
    { handle: encryptedHandle, contractAddress: CONTRACT_ADDRESS }
  ];
  const startTimeStamp = Math.floor(Date.now() / 1000).toString();
  const durationDays = "10";
  const contractAddresses = [CONTRACT_ADDRESS];

  // 5. Create EIP-712 typed message
  const eip712 = instance.createEIP712(
    keypair.publicKey,
    contractAddresses,
    startTimeStamp,
    durationDays
  );

  // 6. Sign the EIP-712 message
  const signature = await signer.signTypedData(
    eip712.domain,
    {
      UserDecryptRequestVerification:
        eip712.types.UserDecryptRequestVerification,
    },
    eip712.message
  );

  // 7. Call userDecrypt
  const result = await instance.userDecrypt(
    handleContractPairs,
    keypair.privateKey,
    keypair.publicKey,
    signature.replace("0x", ""),
    contractAddresses,
    signer.address,
    startTimeStamp,
    durationDays
  );

  // 8. Get decrypted value
  const decryptedValue = result[encryptedHandle];
  console.log("✅ Decrypted value:", decryptedValue.toString());

```

---

## 🌐 Practical Flow Summary

1.  **Encrypt:** Client encrypts value → sends ciphertext to the contract.
2.  **Compute:** Contract performs math directly on ciphertexts.
3.  **Decrypt:** Contract returns ciphertext → Client decrypts with private key to get the clear number.

---

## 🪨 Simple Analogy

-   You send a **sealed box** (ciphertext) to the blockchain.\
-   The blockchain can **stack or remove boxes** (homomorphic
    operations) without opening them.\
-   Only you, with the **key**, can open the box and see the actual
    number inside.

---
