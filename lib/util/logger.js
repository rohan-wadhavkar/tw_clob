"use strict";
/** This module provides an application logging class using console.log */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const error_like_1 = require("@carnesen/error-like");
const timestamp_factory_1 = require("./timestamp-factory");
/* eslint-disable no-console, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, no-nested-ternary */
/** Calls `console.log` on the provided arguments unless NODE_ENV === "test".
 * Note that Jest automatically sets NODE_ENV to "test" for unit tests. */
const consoleLog = process.env.NODE_ENV === "test"
    ? () => { }
    : (...args) => {
        console.log(...args);
    };
/** Unicode "ESC" character */
const ESC = "\u001b";
/** Wrap the provided string in terminal escape codes for colorization */
const ansi = {
    blue(message) {
        return `${ESC}[34m${message}${ESC}[39m`;
    },
    green(message) {
        return `${ESC}[32m${message}${ESC}[39m`;
    },
    red(message) {
        return `${ESC}[31m${message}${ESC}[39m`;
    },
};
/** Application logger
 * @param context Defines the application context for the emitted logs
 */
class Logger {
    constructor(context) {
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: context
        });
    }
    debug(message, ...optionalParams) {
        consoleLog(this.fullMessage(message, "debug"), ...optionalParams);
    }
    info(message, ...optionalParams) {
        consoleLog(this.fullMessage(message, "info"), ...optionalParams);
    }
    error(message, ...optionalParams) {
        consoleLog(this.fullMessage(message, "error"), ...optionalParams);
    }
    fullMessage(message, level) {
        const messageAsString = message instanceof Error
            ? (0, error_like_1.stringifyException)(message)
            : typeof message === "object"
                ? JSON.stringify(message)
                : message;
        const paddedLevel = level.padEnd(5);
        const colorizedLevel = level === "info"
            ? ansi.green(paddedLevel)
            : level === "error"
                ? ansi.red(paddedLevel)
                : paddedLevel;
        return `${(0, timestamp_factory_1.timestampFactory)()} ${colorizedLevel} ${this.context}: ${messageAsString}`;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map