'use client';

import { useState, useRef } from 'react';
import { Drawer } from 'vaul';

interface ContactDrawerProps {
	processSteps: string[];
}

export default function ContactDrawer({ processSteps }: ContactDrawerProps) {
	return (
		<Drawer.Root direction="right" noBodyStyles handleOnly>
			<Drawer.Trigger className="text-foreground/90 transition-colors hover:text-foreground no-underline hover:underline hover:decoration-red-500 underline-offset-2 cursor-pointer uppercase">
				Project Inquiry
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
				<Drawer.Content
					className="fixed top-0 right-0 z-50 w-full max-w-md bg-background border-l border-border flex flex-col outline-none"
					style={{ height: '100dvh' }}
				>
					<div className="flex items-center justify-between px-6 py-3 border-b border-border shrink-0">
						<Drawer.Title className="text-sm uppercase tracking-wider m-0">
							Project Inquiry
						</Drawer.Title>
						<Drawer.Description className="sr-only">
							Send a project inquiry
						</Drawer.Description>
						<Drawer.Close className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors uppercase">
							Close
						</Drawer.Close>
					</div>
					<div className="flex-1 flex flex-col justify-center px-8 py-10">
						<div className="w-full max-w-sm mx-auto space-y-12">
							{/* Process */}
							<div className="space-y-3 text-xs text-foreground/80 uppercase">
								{processSteps.map((step, index) => (
									<div key={index} className="flex gap-3">
										<span className="text-muted-foreground shrink-0 w-4 text-right">
											{String(index + 1).padStart(2, '0')}
										</span>
										<span>{step}</span>
									</div>
								))}
							</div>

							{/* Form */}
							<ContactForm />
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

function ContactForm() {
	const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const loadedAt = useRef(Date.now());

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');

		const form = e.target as HTMLFormElement;
		const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value;
		if (honeypot) {
			setSubmitStatus('success');
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...formData, _t: loadedAt.current }),
			});

			if (response.ok) {
				setSubmitStatus('success');
				setFormData({ name: '', email: '', company: '', message: '' });
			} else {
				setSubmitStatus('error');
			}
		} catch {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const inputClass =
		'text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b border-border bg-transparent px-0 py-2 text-xs transition-colors focus:outline-none normal-case';

	if (submitStatus === 'success') {
		return (
			<div className="py-4">
				<p className="text-foreground text-xs uppercase">Thanks for reaching out.</p>
				<p className="text-muted-foreground text-xs mt-1 normal-case">I&apos;ll be in touch soon.</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<input type="text" name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0" />
			<div className="space-y-1">
				<label htmlFor="contact-name" className="text-muted-foreground block text-xs uppercase">Name</label>
				<input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
			</div>
			<div className="space-y-1">
				<label htmlFor="contact-email" className="text-muted-foreground block text-xs uppercase">Email</label>
				<input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="your@email.com" />
			</div>
			<div className="space-y-1">
				<label htmlFor="contact-company" className="text-muted-foreground block text-xs uppercase">Company (optional)</label>
				<input type="text" id="contact-company" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Your company" />
			</div>
			<div className="space-y-1">
				<label htmlFor="contact-message" className="text-muted-foreground block text-xs uppercase">Message</label>
				<textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={4} className={inputClass} placeholder="Tell me about your project..." />
			</div>
			<button type="submit" disabled={isSubmitting} className="w-full text-xs uppercase border border-border bg-transparent px-3 py-2 text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-white cursor-pointer disabled:opacity-50">
				{isSubmitting ? 'Sending...' : 'Send message'}
			</button>
			{submitStatus === 'error' && (
				<p className="text-muted-foreground text-xs normal-case">Something went wrong. Try again or email me directly.</p>
			)}
		</form>
	);
}
