"use strict"

const winston = require('winston');
const LOGLEVEL = process.env['LOGLEVEL'] || 'debug';

const Logger = function (txid) {
    txid = txid || '';
    const logger = new (winston.Logger)({
        filters: [
            function (level, msg, meta) {
                let new_msg = '[' + process.pid + '] '+msg;
                return new_msg;
            }
        ],
        transports: [
            new (winston.transports.Console)({
                level: LOGLEVEL,
                colorize: true,
                prettyPrint: true,
                label: txid,
            })
        ]  
    })

    logger.stream = {
        write: function (message) {
            logger.info(message.replace(/\n/, ''));
        }
    }

    return logger;
}

module.exports = Logger;
