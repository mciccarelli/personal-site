import { type ClassValue, clsx } from 'clsx';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function useCopyToClipboard() {
	const [copiedText, setCopiedText] = useState(null);
	// @ts-ignore
	const copy = useCallback(async (text) => {
		if (!navigator?.clipboard) {
			console.warn('Clipboard not supported');
			return false;
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			console.warn('Copy failed', error);
			setCopiedText(null);
			return false;
		}
	}, []);

	return [copiedText, copy];
}

export function truncateWalletAddress(address: string | any[], chars = 4) {
	return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
