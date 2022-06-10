/** This module provides an application logging class using console.log */

import { stringifyException } from "@carnesen/error-like";
import { timestampFactory } from "./timestamp-factory";

/* eslint-disable no-console, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, no-nested-ternary */

/** Calls `console.log` on the provided arguments unless NODE_ENV === "test".
 * Note that Jest automatically sets NODE_ENV to "test" for unit tests. */
const consoleLog: typeof console["log"] =
  process.env.NODE_ENV === "test"
    ? () => {}
    : (...args) => {
        console.log(...args);
      };

/** Unicode "ESC" character */
const ESC = "\u001b";

/** Wrap the provided string in terminal escape codes for colorization */
const ansi = {
  blue(message: string): string {
    return `${ESC}[34m${message}${ESC}[39m`;
  },
  green(message: string): string {
    return `${ESC}[32m${message}${ESC}[39m`;
  },
  red(message: string): string {
    return `${ESC}[31m${message}${ESC}[39m`;
  },
};

/** Application logger
 * @param context Defines the application context for the emitted logs
 */
export class Logger {
  constructor(private readonly context: string) {}

  public debug(message?: any, ...optionalParams: any[]): void {
    consoleLog(this.fullMessage(message, "debug"), ...optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    consoleLog(this.fullMessage(message, "info"), ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]): void {
    consoleLog(this.fullMessage(message, "error"), ...optionalParams);
  }

  private fullMessage(message: any, level: string): string {
    const messageAsString =
      message instanceof Error
        ? stringifyException(message)
        : typeof message === "object"
        ? JSON.stringify(message)
        : message;
    const paddedLevel = level.padEnd(5);
    const colorizedLevel =
      level === "info"
        ? ansi.green(paddedLevel)
        : level === "error"
        ? ansi.red(paddedLevel)
        : paddedLevel;
    return `${timestampFactory()} ${colorizedLevel} ${
      this.context
    }: ${messageAsString}`;
  }
}
