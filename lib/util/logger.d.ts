/** This module provides an application logging class using console.log */
/** Application logger
 * @param context Defines the application context for the emitted logs
 */
export declare class Logger {
    private readonly context;
    constructor(context: string);
    debug(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    private fullMessage;
}
//# sourceMappingURL=logger.d.ts.map