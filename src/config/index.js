module.exports = {
    SERVER : {
        PORT : process.env.PORT || 8452
    },
    REDIS: {
        HOST: process.env.REDIS_HOST || "127.0.0.1",
        PORT: process.env.REDIS_PORT || 6379,
        PASSWORD: process.env.REDIS_PASSWORD || "",
        USER: process.env.REDIS_USER || ""
    },
    EMAIL_SERVICE: {
        AWS_ACCESS_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        REGION: process.env.AWS_REGION,
        SENDER_EMAIL: process.env.SENDER_EMAIL
    },
    DBURL: process.env.DBURL
}