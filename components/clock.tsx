'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
	const [time, setTime] = useState('');

	useEffect(() => {
		function tick() {
			setTime(
				new Date().toLocaleTimeString('en-US', {
					timeZone: 'America/Los_Angeles',
					hour: 'numeric',
					minute: '2-digit',
					hour12: true,
				}) + ' PT'
			);
		}
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, []);

	if (!time) return null;

	return <span className="text-xs text-muted-foreground/50 inline-flex items-baseline"><span className="mx-1.5">·</span>{time}</span>;
}
