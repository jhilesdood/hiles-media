import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { contactEmail } from "../data/site";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder handler — opens the user's mail client and shows a
    // confirmation. Swap for Formspree/Resend/an API route later.
    const subject = encodeURIComponent(`New project — ${form.name || "Hello"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full border-b border-paper/25 bg-transparent py-3 font-sans text-paper placeholder-paper/35 outline-none transition-colors focus:border-amber";

  return (
    <section
      id="contact"
      className="grain relative bg-night px-5 py-24 text-paper md:px-10 md:py-32"
    >
      <div className="relative z-[2] mx-auto max-w-[1500px]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* left: headline */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
                ( 06 ) — Start a project
              </p>
              <h2 className="font-display text-[13vw] font-extrabold uppercase leading-[0.85] tracking-tightest md:text-[7rem]">
                Let&rsquo;s make
                <br />
                <span className="font-serif font-normal normal-case italic text-amber">
                  something
                </span>{" "}
                good
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col gap-6">
                <a
                  href={`mailto:${contactEmail}`}
                  className="group inline-flex w-fit items-center gap-3 font-display text-2xl font-bold tracking-tight md:text-3xl"
                >
                  {contactEmail}
                  <ArrowUpRight
                    className="text-amber transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={24}
                  />
                </a>
                <div className="flex gap-10 font-mono text-[11px] uppercase tracking-widest text-paper/50">
                  <span>Houston, TX</span>
                  <span>Booking 2026</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* right: form */}
          <div className="lg:col-span-6 lg:pl-10">
            <Reveal delay={0.15}>
              <div className="relative min-h-[22rem]">
                <AnimatePresence mode="wait">
                  {!sent ? (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-7"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-paper/50"
                        >
                          Your name <span className="text-amber">*</span>
                        </label>
                        <input
                          id="name"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Jane Director"
                          className={field}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-paper/50"
                        >
                          Email <span className="text-amber">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="you@studio.com"
                          className={field}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-paper/50"
                        >
                          What are you building?
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                          placeholder="A launch film, a social series, something we haven't thought of yet…"
                          className={`${field} resize-none`}
                        />
                      </div>
                      <button
                        type="submit"
                        className="group mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-amber px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-night transition-colors duration-300 hover:bg-paper"
                      >
                        Send it
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="status"
                      aria-live="polite"
                      className="flex flex-col items-start gap-5 border border-paper/15 p-8"
                    >
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber text-night">
                        <Check size={26} />
                      </span>
                      <h3 className="font-display text-3xl font-bold tracking-tight">
                        Message on its way.
                      </h3>
                      <p className="max-w-sm font-sans text-sm leading-relaxed text-paper/60">
                        Your mail client should be open with the details ready to
                        send. We reply to every serious enquiry within two
                        business days.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSent(false)}
                        className="font-mono text-[11px] uppercase tracking-widest text-amber underline-offset-4 hover:underline"
                      >
                        Send another
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
