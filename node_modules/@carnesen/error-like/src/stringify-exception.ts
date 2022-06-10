import { stringifyErrorLike } from './stringify-error-like';
import { errorLikeFromException } from './error-like-from-exception';

export function stringifyException(exception: unknown): string {
	return stringifyErrorLike(errorLikeFromException(exception));
}
