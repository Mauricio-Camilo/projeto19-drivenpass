import Cryptr from 'cryptr';

import * as credentialRepository from "./../repositories/credentialsRepository.js";

export async function createCredential (id, title, url, name, password) {

    const checkTitle = await credentialRepository.checkTitleCredential(title);

    if (checkTitle !== 0) {
        throw {
            name: "alreadyExists",
            message: "Title already exists"
        }
    }

    const crypt = new Cryptr("password");
    const encryptedPassword = crypt.encrypt(password);

    await credentialRepository.saveCredential(id, title, url, name, encryptedPassword);
}

export async function searchCredentials (paramsId : number, userId : number) {

    if (paramsId !== userId) {
        throw {
            name: "notAuthorized",
            message: "Invalid id"
        }
    }

    const credentials = await credentialRepository.getCredentials(userId);

    const credentialsDecryptedPassword = decryptPasswords(credentials);

    return credentialsDecryptedPassword;
}

export async function decryptPasswords (credentials) {

    const crypt = new Cryptr("password");
    const newCredentials = credentials.map(credential => {
       const password = crypt.decrypt(credential.password);
       return (
           {...credential, password : password}
       )
    })
    return newCredentials;
}