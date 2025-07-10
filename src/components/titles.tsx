'use client';

import { useState, useEffect } from 'react';
import { TextScramble } from '@/components/ui/text-scramble';

import data from '@/app/data.json';

export default function Titles() {
	const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
	const [trigger, setTrigger] = useState(false);

	const shuffleTitle = () => {
		setTrigger(true);
		setCurrentTitleIndex((prev) => (prev + 1) % data?.titles.length);
	};

	useEffect(() => {
		const interval = setInterval(shuffleTitle, 3000);
		return () => clearInterval(interval);
	}, []);

	const handleClick = () => {
		shuffleTitle();
	};

	return (
		<span onClick={handleClick} className="inline lowercase">
			<TextScramble
				className="inline"
				as="span"
				speed={0.01}
				trigger={trigger}
				onScrambleComplete={() => setTrigger(false)}
			>
				{data?.titles[currentTitleIndex]}
			</TextScramble>
		</span>
	);
}
