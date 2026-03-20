'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789/.@_-';
const DEFAULT_TEXT = 'mciccarelli';

const links = [
	{ label: 'x', href: 'https://x.com/mciccarelli', reveal: 'x.com/mciccarelli' },
	{ label: 'ig', href: 'https://instagram.com/mciccarelli', reveal: 'instagram.com/mciccarelli' },
	{ label: 'tg', href: 'https://t.me/mciccarelli', reveal: 't.me/mciccarelli' },
	{ label: 'li', href: 'https://linkedin.com/in/mciccarelli', reveal: 'linkedin.com/in/mciccarelli' },
	{ label: 'gh', href: 'https://github.com/mciccarelli', reveal: 'github.com/mciccarelli' },
];

export default function SocialLinks() {
	const [displayText, setDisplayText] = useState(DEFAULT_TEXT);
	const frameRef = useRef<number>(0);
	const iterRef = useRef(0);

	const scrambleTo = useCallback((target: string) => {
		cancelAnimationFrame(frameRef.current);
		iterRef.current = 0;

		const maxLen = Math.max(displayText.length, target.length);
		const totalIterations = maxLen + 8;

		const step = () => {
			iterRef.current++;
			const progress = iterRef.current;

			let result = '';
			for (let i = 0; i < target.length; i++) {
				if (progress > i + 8) {
					result += target[i];
				} else if (progress > i) {
					result += CHARS[Math.floor(Math.random() * CHARS.length)];
				}
			}

			setDisplayText(result || target[0] || '');

			if (progress < totalIterations) {
				frameRef.current = requestAnimationFrame(step);
			} else {
				setDisplayText(target);
			}
		};

		frameRef.current = requestAnimationFrame(step);
	}, []);

	useEffect(() => {
		return () => cancelAnimationFrame(frameRef.current);
	}, []);

	return (
		<>
			{links.map((link, i) => (
				<span key={link.label}>
					{i > 0 && ' / '}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						onMouseEnter={() => scrambleTo(link.reveal)}
						onMouseLeave={() => scrambleTo(DEFAULT_TEXT)}
					>
						{link.label}
					</a>
				</span>
			))}
			{'  '}
			<span className="text-foreground/50 select-all inline-block min-w-[7ch]">
				{displayText}
			</span>
		</>
	);
}
