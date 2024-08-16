import * as openpgp from 'openpgp';

export const generateKeys = async (userName: string, email: string) => {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'ecc',
    curve: 'curve25519',
    userIDs: [{ name: userName, email: email }],
    passphrase: '',
  });

  return { privateKey, publicKey };
};

export const encryptMessage = async (message: string, recipientPublicKeys: string[]) => {
  
  const encryptionKeys = await Promise.all(
    recipientPublicKeys.map(async (key) => {
      if (key) {
        return openpgp.readKey({ armoredKey: key });
      } else {
        throw new Error('Invalid public key');
      }
    })
  );

  const encryptedMessage = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: message }),
    encryptionKeys,
  });
  return encryptedMessage;
};

export const decryptMessage = async (encryptedMessage: string, recipientPrivateKey: string) => {
  const { data: decryptedMessage } = await openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: encryptedMessage }),
    decryptionKeys: await openpgp.readPrivateKey({ armoredKey: recipientPrivateKey }),
  });
  return decryptedMessage;
};
