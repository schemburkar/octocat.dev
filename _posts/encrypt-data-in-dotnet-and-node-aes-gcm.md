---
title: "Encrypting Data in .NET and Node with AES GCM"
excerpt: "This post delves into how to encrypt and decrypt data in .NET and Node using AES GCM algorithm. With front end frameworks supporting server side rendering, it should be possible to decrypt data sent from your API server in encrypted format"
coverImage: "https://worldwidecode.files.wordpress.com/2023/01/towfiqu-barbhuiya-fna5pazqhmm-unsplash.jpg"
date: "2023-01-30T07:00:00.000Z"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: "https://worldwidecode.files.wordpress.com/2023/01/towfiqu-barbhuiya-fna5pazqhmm-unsplash.jpg"
coverImageAspectRatio: 1.5
---

In this post I would like to showcase how to encrypt and decrypt data in .NET and Node. 

With front end frameworks supporting server side rendering, it should be possible to decrypt data sent from your API server in encrypted format. This requires support from both .NET and frontend server codebases like Node. 

We can encrypt or decrypt data with multiple algorithms. For this post I am using AES GCM that is more secure than other algorithms.

## Encryption in .NET

For Encryption, data is in form of `ReadOnlySpan<byte>`. If you have plain text or serialized JSON data, convert it to bytes using UTF8 encoding.

```csharp
var data = System.Text.Encoding.UTF8.GetBytes(json);
```

The `encryptionKey` is 32 bytes and can also be derived from a user or application secret using any key derivation algorithms like PBKDF2.

For AES GCM, encrypted data bytes will be of same length as the original data. 

```csharp

ReadOnlySpan<byte> EncryptData(ReadOnlySpan<byte> data, ReadOnlySpan<byte> encryptionKey)
{
    // encryptionKey = 32-bytes/ 256 bits
    using (var aes = new AesGcm(encryptionKey))
    {
        // AesGcm.NonceByteSizes.MaxSize = 12 bytes
        // AesGcm.TagByteSizes.MaxSize = 16 bytes
        Span<byte> buffer = new byte[data.Length + AesGcm.NonceByteSizes.MaxSize + AesGcm.TagByteSizes.MaxSize];
        var nonce = buffer.Slice(data.Length, AesGcm.NonceByteSizes.MaxSize);
        RandomNumberGenerator.Fill(nonce);
        aes.Encrypt(nonce, data, buffer.Slice(0, data.Length), buffer.Slice(data.Length + AesGcm.NonceByteSizes.MaxSize, AesGcm.TagByteSizes.MaxSize));
        // buffer has encrypted data bytes + 12 bytes of Nonce + 16 bytes of Tag
        return buffer;
    }
}

```

## Decryption in .NET

For Decryption, we will need the same `encryptionKey` and the `encryptedData`. 
We extract the tag, nonce from the encrypted data and the decrypt the actual plain text data.


```csharp
ReadOnlySpan<byte> DecryptData(ReadOnlySpan<byte> encryptedData, ReadOnlySpan<byte> encryptionKey)
{
    // encryptedData has encrypted data bytes + 12 bytes of Nonce + 16 bytes of Tag

    var tag = encryptedData.Slice(encryptedData.Length - AesGcm.TagByteSizes.MaxSize, AesGcm.TagByteSizes.MaxSize);
    var nonce = encryptedData.Slice(encryptedData.Length - AesGcm.TagByteSizes.MaxSize - AesGcm.NonceByteSizes.MaxSize, AesGcm.NonceByteSizes.MaxSize);
    var cipherBytes = encryptedData.Slice(0, encryptedData.Length - AesGcm.TagByteSizes.MaxSize - AesGcm.NonceByteSizes.MaxSize);
    Span<byte> buffer = new byte[cipherBytes.Length];
    using (var aes = new AesGcm(encryptionKey))
    {
        aes.Decrypt(nonce, cipherBytes, tag, buffer);
    }
    return buffer;
}
```

Lets now look at the same code for Node.

## Encryption/Decryption in Node

The equivalent of `ReadOnlySpan<byte> encryptedData` for Node is `Buffer`. We use the same methodology to encrypt with 12 bytes of nonce and 16 bytes of auth tag.

*For this example, I'm using Typescript.*

```ts
const NonceByteSizesMaxSize = 12
const TagByteSizesMaxSize = 16
```

We are using the cryptography methods from native `crypto` module.

```ts
import { createDecipheriv, CipherGCMTypes, createCipheriv, randomBytes } from 'crypto';
```

**Encryption**

```ts
const encryptData = (data: Buffer, encryptionKey: Buffer): Buffer => {

    const algo: CipherGCMTypes = 'aes-256-gcm';

    // 12 bytes of nonce
    var nonce = randomBytes(12); 

    var cipher = createCipheriv(algo, encryptionKey, nonce, { authTagLength: 16 });

    const d1 = cipher.update(data);
    const d2 = cipher.final();
    const encryptedData = Buffer.concat([d1, d2, nonce, cipher.getAuthTag()]);
    return encryptedData;
}
```

**Decryption**


```ts
const decryptData = (encryptedData: Buffer, encryptionKey: Buffer): Buffer => {
    const tag = encryptedData.subarray(encryptedData.length - TagByteSizesMaxSize, encryptedData.length);
    const nonce = encryptedData.subarray(encryptedData.length - TagByteSizesMaxSize - NonceByteSizesMaxSize, encryptedData.length - TagByteSizesMaxSize);
    const cipherBytes = encryptedData.subarray(0, encryptedData.length - TagByteSizesMaxSize - NonceByteSizesMaxSize);

    const algo: CipherGCMTypes = 'aes-256-gcm';
    var decipher = createDecipheriv(algo, encryptionKey, nonce, { authTagLength: 16 });
    decipher.setAuthTag(tag);

    const d1 = decipher.update(cipherBytes);
    const d2 = decipher.final();
    const data = Buffer.concat([d1, d2]);
    return data;
}
```
The above code works with modern frameworks like NextJs.

## Recomendation

If you are storing any sensitive information that needs to be encrypted at application level or in transport between various layers of the application, we can use the above methods to interchangeably encrypt/decrypt data in .NET and Node.


### Discussion


For any queries or feedback, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.



**Cover image Credits**

> Photo by [Towfiqu barbhuiya](https://unsplash.com/@towfiqu999999?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/data-security?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

  
