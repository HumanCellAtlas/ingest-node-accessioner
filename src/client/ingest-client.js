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

    assignUuid(shorthandCallbackLink) {
        const entityUrl = this.urlFor(shorthandCallbackLink);
        return this.retry(5, this._assignUuid, {'entityUrl': entityUrl}, "Retrying assignUuid...");
    }

    /**
     *
     * @param params - { entityUrl : <url of the entity to assign a uuid>}
     * @private
     */
    _assignUuid(params){
        const entityUrl = params['entityUrl'];

        return new Promise((resolve, reject) => {
            request.get({
                url: entityUrl,
                json: true
            }).then(resp => {
                if(resp['uuid'] && resp['uuid']['uuid']) {
                    resolve(resp)
                } else {
                    const uuidPatchPayload = {'uuid' : {'uuid': uuidv4()}};
                    request({
                        method: 'PATCH',
                        body: uuidPatchPayload,
                        json: true,
                        url: entityUrl
                    }).then(resp => {
                        resolve(resp);
                    }).catch(err => {
                        reject(err);
                    })
                }
            }).catch(err => {
                reject(err);
            })
        });
    }

    retry(maxRetries, func, args, retryMessage) {
        return this._retry(0, maxRetries, null, func, args, retryMessage);
    }

    _retry(attemptsSoFar, maxRetries, prevErr, func, args, retryMessage) {
        if(attemptsSoFar === maxRetries) {
            return Promise.reject(prevErr);
        } else {
            return func(args)
                .then(allGood => {return Promise.resolve(allGood)})
                .catch(err => {
                    const incAttempts = attemptsSoFar + 1;
                    console.info(retryMessage + " :: Attempt # " + incAttempts + " out of " + maxRetries);
                    return this._retry(attemptsSoFar + 1, maxRetries, err, func, args, retryMessage);
                });
        }
    }

    urlFor(entityCallback) {
        return this.ingestUrl + entityCallback;
    }
}

module.exports = IngestClient;