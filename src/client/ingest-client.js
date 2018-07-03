/**
 * Created by rolando on 13/04/2018.
 */
const uuidv4 = require('uuid/v4');
const request = require('request-promise');
const Promise = require('bluebird');

class IngestClient {
    constructor(ingestUrl) {
        this.ingestUrl = ingestUrl;
    }

    assignUuid(entityCallback){
        const entityUrl = this.urlFor(entityCallback);

        return new Promise((resolve, reject) => {
            request.get({
                url: entityUrl,
                json: true
            }).then(resp => {
                if(resp.body['uuid']['uuid']) {
                    resolve(resp)
                } else {
                    const uuidPatchPayload = {'uuid' : {'uuid': uuidv4()}};
                    request.patch({
                        url: entityUrl,
                        json: true,
                        data: uuidPatchPayload
                    }).then(patchResponse => {
                        resolve(patchResponse);
                    })
                }
            }).catch(err => {
                reject(err);
            })
        });
    }

    urlFor(entityCallback) {
        return this.ingestUrl + entityCallback;
    }
}

module.exports = IngestClient;