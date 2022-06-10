import { ErrorLike } from './error-like';

/** Convert an unknown exception into an ErrorLike object literal */
export function errorLikeFromException(exception: unknown): ErrorLike {
	switch (typeof exception) {
		case 'string':
		case 'bigint':
		case 'boolean':
		case 'number':
		case 'symbol':
		case 'undefined': {
			return {
				message: `Encountered a "${typeof exception}" exception "${String(
					exception,
				)}"`,
				stack: stackFactory(),
			};
		}
		case 'function':
		case 'object':
		default: {
			if (!exception) {
				// Presumably null
				return {
					message: `A non-truthy object or function exception has been encountered ${exception}`,
					stack: stackFactory(),
				};
			}
			const { message, code, stack } = exception as Record<string, unknown>;
			const errorLike: ErrorLike = {
				message: typeof message === 'string' ? message : '',
				stack: typeof stack === 'string' ? stack : stackFactory(),
			};
			if (typeof code !== 'undefined') {
				errorLike.code = String(code);
			}
			return errorLike;
		}
	}
}

function stackFactory(): string {
	return new Error().stack || '';
}
