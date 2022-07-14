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

    const checkId = await checkUserId(paramsId, userId);

    const credentials = await credentialRepository.getCredentials(userId);

    const credentialsDecryptedPassword = decryptPasswords(credentials);

    return credentialsDecryptedPassword;
}

export async function checkUserId (paramsId : number, userId : number) {

    if (paramsId !== userId) {
         throw {
            name: "notAuthorized",
            message: "Invalid id"
        }
    }
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

export async function deleteCredentials (paramsId : number, userId : number) {

    const credential = await credentialRepository.getCredentialById(paramsId);

    if (!credential) {
        throw {
            name: "notFound",
            message: "Credential not found"
        }
    }

    console.log(credential.userId, userId);

    if (credential.userId !== userId) {
        throw {
            name: "notAuthorized",
            message: "Credential not belong to user"
        }
    }

    await credentialRepository.deleteCredentials(credential.id);
}