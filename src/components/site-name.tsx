'use client';

import { useState } from 'react';
import { TextScramble } from '@/components/ui/text-scramble';

export default function SiteName() {
	const [isToggled, setIsToggled] = useState(false);
	const [trigger, setTrigger] = useState(false);

	const handleClick = () => {
		setTrigger(true);
		setIsToggled((prev) => !prev);
	};

	return (
		<button
			onClick={handleClick}
			// onMouseEnter={() => setTrigger(true)}
		>
			<TextScramble
				className="text-sm"
				as="span"
				speed={0.01}
				trigger={trigger}
				onScrambleComplete={() => setTrigger(false)}
			>
				{isToggled ? 'michael ciccarelli' : 'hael.cc'}
			</TextScramble>
		</button>
	);
}
