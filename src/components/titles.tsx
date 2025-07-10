'use client';

import { useState, useEffect } from 'react';
import { TextScramble } from '@/components/ui/text-scramble';

const titles = [
	'Software Engineer',
	'Frontend Engineer',
	'Creative Developer',
	'Design Engineer',
	'UI/UX Designer',
	'Product Designer',
	'Web Developer',
	'Full-Stack Engineer',
	'Creative Technologist',
	'UI Engineer',
	'Digital Designer',
	'Frontend Designer',
	'Product Engineer',
	'JavaScript Engineer',
	'Visual Designer',
	'Design Technologist',
	'Web Designer',
	'User Experience Designer'
];

export default function Titles() {
	const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
	const [trigger, setTrigger] = useState(false);

	const shuffleTitle = () => {
		setTrigger(true);
		setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
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
				{titles[currentTitleIndex]}
			</TextScramble>
		</span>
	);
}
