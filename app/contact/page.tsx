'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Cal, { getCalApi } from '@calcom/embed-react';
import { TextReveal } from '@/components/TextReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('message');

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          ...formData,
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="grid grid-cols-1 p-4 pt-28 md:grid-cols-4 md:pt-24">
      <section className="md:col-span-2 md:col-start-2">
        <TextReveal
          as="h2"
          className="text-muted-foreground mb-8 font-mono text-xs tracking-widest uppercase"
        >
          Contact
        </TextReveal>

        <TextReveal delay={0.25}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="relative z-10">
              <TabsTrigger value="message">send a message</TabsTrigger>
              <TabsTrigger value="call">schedule a call</TabsTrigger>
            </TabsList>

            <TabsContent value="message">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-muted-foreground block font-mono text-xs uppercase"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-muted-foreground/20 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-muted-foreground block font-mono text-xs uppercase"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-muted-foreground/20 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-muted-foreground block font-mono text-xs uppercase"
                  >
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="border-muted-foreground/20 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none"
                    placeholder="Your company"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-muted-foreground block font-mono text-xs uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="border-muted-foreground/20 text-foreground placeholder:text-muted-foreground/40 focus:border-foreground w-full border-0 border-b bg-transparent px-0 py-4 font-sans text-xl transition-colors focus:outline-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="pt-8">
                  <button type="submit" disabled={isSubmitting} className="btn w-full md:w-auto">
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="border border-green-500/20 bg-green-500/10 p-4 text-green-600">
                    <p className="font-mono text-sm">Thanks! I'll be in touch soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="border border-red-500/20 bg-red-500/10 p-4 text-red-600">
                    <p className="font-mono text-sm">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}
              </form>
            </TabsContent>

            <TabsContent value="call" className="-mx-4 mt-0 md:-mx-32 lg:-mx-48">
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
        </TextReveal>
      </section>
    </main>
  );
}
