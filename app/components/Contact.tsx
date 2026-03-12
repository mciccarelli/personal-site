'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Cal, { getCalApi } from '@calcom/embed-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('message');
  const loadedAt = useRef(Date.now());

  useEffect(() => {
    if (activeTab === 'call') {
      (async function () {
        const cal = await getCalApi({ namespace: '15min' });
        cal('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
          theme: 'dark',
          cssVarsPerTheme: {
            dark: {
              'cal-bg': 'transparent',
              'cal-text': 'hsl(348 45.45% 97.84%)',
              'cal-text-muted': 'hsl(240 5% 64.9%)',
              'cal-border': 'hsl(240 3.7% 15.9%)',
              'cal-border-subtle': 'hsl(240 3.7% 15.9%)',
              'cal-bg-emphasis': 'hsl(30 11.11% 7%)',
              'cal-brand': 'hsl(0 100% 47%)',
              'cal-brand-emphasis': 'hsl(0 100% 40%)',
              'cal-brand-text': 'hsl(348 45.45% 97.84%)',
            },
          },
        });
      })();
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.target as HTMLFormElement;
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value;

    // Honeypot filled = bot
    if (honeypot) {
      setSubmitStatus('success');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _t: loadedAt.current,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    'border-neutral-800/40 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none';

  return (
    <section id="contact" className="min-h-dvh px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-2 md:col-start-2">
          <div className="mb-8">
            <h2 className="text-foreground font-sans text-2xl font-bold tracking-tight md:text-3xl">
              Get in touch
            </h2>
            <p className="text-muted-foreground mt-3 font-mono text-[10px] uppercase tracking-widest">
              Available for consulting, freelance &amp; collaboration.
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div className="py-12">
              <p className="text-foreground font-sans text-lg font-medium">
                Thanks for reaching out.
              </p>
              <p className="text-muted-foreground mt-2 font-mono text-[10px] uppercase tracking-widest">
                I&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <>
              {/* Mobile: direct links */}
              <div className="mb-8 space-y-2 md:hidden">
                <a
                  href="mailto:m@ciccarel.li"
                  className="text-muted-foreground hover:text-foreground block font-mono text-[10px] uppercase tracking-widest transition-colors"
                >
                  &rarr;&nbsp;m@ciccarel.li
                </a>
                <a
                  href="https://cal.com/ciccarelli/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground block font-mono text-[10px] uppercase tracking-widest transition-colors"
                >
                  &rarr;&nbsp;Book a call
                </a>
              </div>

              {/* Desktop: tabs with embedded cal */}
              <div className="mb-8 hidden md:block">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <div className="mb-8">
                    <TabsList className="relative z-10">
                      <TabsTrigger value="message">send a message</TabsTrigger>
                      <TabsTrigger value="call">book a call</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="message">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Honeypot */}
                      <input
                        type="text"
                        name="website"
                        autoComplete="off"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="absolute h-0 w-0 overflow-hidden opacity-0"
                      />

                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name-desktop" className="text-muted-foreground block font-mono text-xs uppercase">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name-desktop"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={inputClass}
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email-desktop" className="text-muted-foreground block font-mono text-xs uppercase">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email-desktop"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={inputClass}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="company-desktop" className="text-muted-foreground block font-mono text-xs uppercase">
                          Company (optional)
                        </label>
                        <input
                          type="text"
                          id="company-desktop"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Your company"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message-desktop" className="text-muted-foreground block font-mono text-xs uppercase">
                          Message
                        </label>
                        <textarea
                          id="message-desktop"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className={inputClass}
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <div className="pt-8">
                        <button type="submit" disabled={isSubmitting} className="btn w-full md:w-auto">
                          {isSubmitting ? 'Sending...' : 'Send message'}
                        </button>
                      </div>

                      {submitStatus === 'error' && (
                        <div className="border-neutral-800/40 border p-4">
                          <p className="text-muted-foreground font-mono text-sm">
                            Something went wrong. Please try again or email me directly.
                          </p>
                        </div>
                      )}
                    </form>
                  </TabsContent>

                  <TabsContent value="call" className="-mx-32 mt-0 lg:-mx-48">
                    <div className="-mt-4 h-[700px] overflow-hidden">
                      <Cal
                        namespace="15min"
                        calLink="ciccarelli/15min"
                        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
                        config={{ layout: 'month_view', theme: 'dark' }}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Mobile: form only (no tabs) */}
              <form onSubmit={handleSubmit} className="space-y-8 md:hidden">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute h-0 w-0 overflow-hidden opacity-0"
                />

                <div className="grid gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name-mobile" className="text-muted-foreground block font-mono text-xs uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name-mobile"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email-mobile" className="text-muted-foreground block font-mono text-xs uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email-mobile"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company-mobile" className="text-muted-foreground block font-mono text-xs uppercase">
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    id="company-mobile"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your company"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message-mobile" className="text-muted-foreground block font-mono text-xs uppercase">
                    Message
                  </label>
                  <textarea
                    id="message-mobile"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={inputClass}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="pt-8">
                  <button type="submit" disabled={isSubmitting} className="btn w-full">
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>

                {submitStatus === 'error' && (
                  <div className="border-neutral-800/40 border p-4">
                    <p className="text-muted-foreground font-mono text-sm">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
