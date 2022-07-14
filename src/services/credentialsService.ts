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