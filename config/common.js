const redis_API_Request_Checker =require('../config/apiRedis')
const CryptoJS =require('crypto-js')


const checkAndSetJobForCompletion= async ({ redisKey }) => {
    try {
        let hash = CryptoJS.SHA256(JSON.stringify({ redisKey }))
        let encryptedHash = hash.toString(CryptoJS.enc.Hex);
        const REQUEST_HOLD_TIME = 300;

        // Wait for Redis check before adding the key
        const getValue = await redis_API_Request_Checker.get(encryptedHash);
        console.log("getValue..getValue", getValue);

        if (!getValue) {
            let valueToStore = JSON.stringify({ hash: encryptedHash });
            let setValue = await redis_API_Request_Checker.setex(encryptedHash, REQUEST_HOLD_TIME, valueToStore);
            console.log("setValue....", setValue);
            return { success: true, message: "Key added in Redis", key: encryptedHash }
        } else {
            console.log("Duplicate job detected: Key already exists in Redis");
            return { success: false, message: "Key already exist in redis", tryAfter: 30 }
        }
    } catch (err) {
        console.error('Error interacting with Redis:', err);
        return { success: false, message: "Redis error" };
    }
}

const removeKeyAfterCompletion= async (hashKey) => {
    try {
        console.log("Requested Key", hashKey)
        const key = hashKey;
        console.log("Main Keyy", key)
        // const result = await redis.del(key);
        // console.log("Redis removed result", result)
        // if (result > 0 || result == 1) {
        //     customConsole.log(`Key "${key}" removed successfully.`);
        //     return { success: true, message: `Key "${key}" deleted.` };
        // } else {
        //     customConsole.log(`Key "${key}" does not exist.`);
        //     return { success: false, message: `Key "${key}" not found.` };
        // }
        if (key) {
            let keyDeleted = await redis_API_Request_Checker.del(key)
            console.log("keyDeleted..", keyDeleted);
            return { success: true, message: "key deleted from redis successfully!" }
        }
        else {
            return { success: true, message: "Key not provided" }
        }
    } catch (err) {
        console.error("Error deleting key from Redis:", err);
        return { success: false, message: "Redis error while deleting key." };
    }
}

const checkAndSetRedishKeyForLogin = async (key, value) => {
    // Use SET with NX (set if not exists) to avoid race conditions
    const REQUEST_HOLD_TIME = 86400; // 1 day in seconds (24 * 60 * 60)
    const result = await redis.set(key, value, "NX", "EX", REQUEST_HOLD_TIME);

    if (result === "OK") {
        console.log("Key locked in Redis:", key);
        return { success: true, message: "Key added in Redis" };
    } else {
        console.log("Key already exists in Redis:", key);
        return { success: false, message: "Key already exists in Redis", tryAfter: 30 };
    }
};


const deletRedisLoginKey = async (key) => {
    if (key) {
        let keyDeleted = await redis.del(key);
        console.log("Key deleted:", key);
        return { success: true, message: "Key deleted from Redis successfully!" };
    }
    return { success: true, message: "Key not provided" };
};

module.exports={checkAndSetJobForCompletion,removeKeyAfterCompletion,checkAndSetRedishKeyForLogin,deletRedisLoginKey}