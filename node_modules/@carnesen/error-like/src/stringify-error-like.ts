import { ErrorLike } from './error-like';

export function stringifyErrorLike(errorLike: ErrorLike): string {
	const parts = [`message=${errorLike.message}`];
	if (errorLike.code) {
		parts.push(`code=${errorLike.code}`);
	}
	parts.push(`stack=${errorLike.stack}`);
	return parts.join('\n');
}
