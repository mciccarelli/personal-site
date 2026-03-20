'use client';

import { useState, useRef } from 'react';

export default function ContactForm() {
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
		'text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b border-border bg-transparent px-0 py-2 text-xs transition-colors focus:outline-none';

	if (submitStatus === 'success') {
		return (
			<div className="py-4">
				<p className="text-foreground text-xs">Thanks for reaching out.</p>
				<p className="text-muted-foreground text-xs mt-1">I&apos;ll be in touch soon.</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<input type="text" name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0" />
			<div className="space-y-1">
				<label htmlFor="contact-name" className="text-muted-foreground block text-xs">Name</label>
				<input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="your name" />
			</div>
			<div className="space-y-1">
				<label htmlFor="contact-email" className="text-muted-foreground block text-xs">Email</label>
				<input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="your@email.com" />
			</div>
			<div className="space-y-1">
				<label htmlFor="contact-company" className="text-muted-foreground block text-xs">Company (optional)</label>
				<input type="text" id="contact-company" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="your company" />
			</div>
			<div className="space-y-1">
				<label htmlFor="contact-message" className="text-muted-foreground block text-xs">Message</label>
				<textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={4} className={inputClass} placeholder="tell me about your project..." />
			</div>
			<button type="submit" disabled={isSubmitting} className="w-full text-xs border border-border bg-transparent px-3 py-2 text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-white cursor-pointer disabled:opacity-50">
				{isSubmitting ? 'Sending...' : 'Send message'}
			</button>
			{submitStatus === 'error' && (
				<p className="text-muted-foreground text-xs">Something went wrong. Try again or email me directly.</p>
			)}
		</form>
	);
}
