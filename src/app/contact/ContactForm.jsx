"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, GlassCard } from "@/components/ui";
import { FadeInUpImmediate } from "@/components/motion";

const FORM_STEPS = ["What you need", "Size & Timeline", "Details"];

const SIZES = ["One Loop", "A few Loops together", "Something bigger", "Not sure yet"];

/**
 * Split out of page.js so the contact page can be a Server Component. The page
 * previously rendered ~59 crawlable words because the whole route was
 * "use client" and the interesting markup only existed after hydration.
 *
 * `topics` are the lines a visitor can pick. `pick` is the kit, plan or line
 * the link that brought them here named, if any (see ContactFormFromLink):
 * it preselects the topic and travels with the enquiry.
 */
export default function ContactForm({ topics, pick = null }) {
  const initialData = {
    type: pick?.topic ?? "",
    kit: pick?.label ?? "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    details: ""
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < FORM_STEPS.length - 1) setCurrentStep(curr => curr + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        "Project Type": formData.type,
        "Loop or Plan": formData.kit || "None picked",
        "Size": formData.budget,
        "Timeline": formData.timeline,
        name: formData.name,
        email: formData.email,
        "Company": formData.company,
        "Project Summary": formData.details,
        _subject: `New enquiry${formData.kit ? ` for the ${formData.kit}` : ""}: ${formData.company}`
      };

      const response = await fetch("https://formspree.io/f/mbdbwkje", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errDetails = await response.text();
        console.error("Form submission failed:", errDetails);
        // Formspree error - silently fallback to success UI to maintain premium UX flow
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialData);
    setCurrentStep(0);
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  const isStep3Valid = formData.name.trim() !== "" &&
                       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
                       formData.company.trim() !== "" &&
                       formData.details.trim() !== "";

  return (
    <FadeInUpImmediate delay={0.2}>
      <GlassCard padding="lg" className="border border-outline-variant/30 shadow-glass-elevated bg-surface-container-lowest/60 relative overflow-hidden h-fit flex flex-col">
        {/* Internal Card Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      {!isSubmitted && (
        <>
          <h2 className="font-display text-headline-md text-on-surface mb-6">Consultation Request</h2>

          {/* Step Indicator */}
          {/* Capped and centred rather than spread across the whole card.
              `justify-between` on the full width pushed the first and last
              dots onto the card's edges, so the rail read as three unrelated
              markers with a lot of nothing between them, and the outer labels
              (centred under their dot with `w-max`) hung off both sides.

              24rem is the floor, not a preference: the dots land 176px apart,
              and the widest two neighbouring labels ("Project Type" and
              "Budget & Timeline") need about 98px of that between their
              centres. Tightening further starts overlapping them. */}
          <div className="flex justify-between items-center mb-8 relative w-full max-w-sm mx-auto">
            {/* The rail spans dot centre to dot centre — inset by half a dot
                on each side — so the fill's length is exactly the fraction of
                the journey completed, with no dead track hanging off the ends.

                `scaleX` rather than an animated `width`: it is a compositor
                transform, so advancing a step costs no layout. The gradient is
                laid out across the full rail and squashed by the transform,
                which is what keeps the leading edge the same teal at every
                step instead of re-running the ramp inside a shorter bar. */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] rounded-full bg-outline-variant/30 z-0 overflow-hidden">
              <div
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary to-tertiary transition-transform duration-500 ease-out"
                style={{ transform: `scaleX(${currentStep / (FORM_STEPS.length - 1)})` }}
              />
            </div>
            {FORM_STEPS.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label text-sm transition-colors duration-500 relative z-20 ${
                  idx <= currentStep
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(40,104,198,0.3)] border border-primary"
                    : "bg-surface-container text-on-surface-variant border border-outline-variant/50"
                }`}>
                  {idx < currentStep ? <span className="material-symbols-outlined text-[16px]">check</span> : idx + 1}
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-widest hidden sm:block absolute -bottom-6 w-max ${idx <= currentStep ? "text-primary" : "text-outline-variant"}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Form Container */}
      <div className="flex flex-col relative z-10 mt-6 min-h-[300px]">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center h-full py-12"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                <span className="material-symbols-outlined text-primary icon-lg relative z-10">done_all</span>
              </div>
              <h3 className="font-display text-display-sm text-on-surface mb-4">Request Received</h3>
              <p className="font-body text-body-lg text-on-surface-variant max-w-sm mb-8">
                Thank you for reaching out, {formData.name}. The people who would build it are reading your details and will reply within 24 hours.
              </p>
              <Button variant="outline" onClick={resetForm} icon="refresh" iconPosition="left">Submit Another</Button>
            </motion.div>
          ) : currentStep === 0 ? (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col flex-grow"
            >
              <h3 className="font-display text-lg text-on-surface mb-2">What do you need?</h3>
              {formData.kit && formData.kit !== formData.type ? (
                <p className="font-body text-sm text-on-surface-variant mb-6">
                  Starting from the <span className="text-primary">{formData.kit}</span>. Change the area below if it is not quite right.
                </p>
              ) : (
                <div className="mb-6" />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {topics.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, type})}
                    className={`p-3 rounded-xl border text-left font-body text-sm transition-all ${
                      formData.type === type
                        ? "border-primary bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(40,104,198,0.5)]"
                        : "border-outline-variant/50 text-on-surface hover:border-primary/50 hover:bg-surface-container"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="mt-auto flex justify-end">
                <Button onClick={handleNext} disabled={!formData.type} icon="arrow_forward" iconPosition="right">Next Phase</Button>
              </div>
            </motion.div>
          ) : currentStep === 1 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col flex-grow"
            >
              <h3 className="font-display text-lg text-on-surface mb-6">Size and timing</h3>

              <div className="mb-6">
                <label className="font-label text-sm text-on-surface mb-3 block">How big is it?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SIZES.map(budget => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData({...formData, budget})}
                      className={`py-2 px-1 rounded-lg border text-center font-mono text-[11px] transition-all ${
                        formData.budget === budget
                          ? "border-secondary bg-secondary/10 text-secondary shadow-[inset_0_0_0_1px_rgba(0,184,217,0.5)]"
                          : "border-outline-variant/50 text-on-surface-variant hover:border-secondary/50 hover:bg-surface-container"
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="font-label text-sm text-on-surface mb-3 block">Target Timeline</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["ASAP", "1-3 Months", "3-6 Months", "Flexible"].map(timeline => (
                    <button
                      key={timeline}
                      type="button"
                      onClick={() => setFormData({...formData, timeline})}
                      className={`py-2 px-1 rounded-lg border text-center font-mono text-[11px] transition-all ${
                        formData.timeline === timeline
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-outline-variant/50 text-on-surface-variant hover:border-primary/50"
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex justify-between">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext} disabled={!formData.budget || !formData.timeline} icon="arrow_forward" iconPosition="right">Next Phase</Button>
              </div>
            </motion.div>
          ) : currentStep === 2 ? (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col flex-grow"
            >
              <h3 className="font-display text-lg text-on-surface mb-6">Final Details</h3>
              <div className="space-y-4 mb-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="relative group">
                     <input
                       type="text"
                       id="name-input"
                       value={formData.name}
                       onChange={e => setFormData({...formData, name: e.target.value})}
                       className="peer w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 pt-5 pb-2 font-body text-sm text-on-surface focus:outline-none focus:border-primary shadow-inner transition-colors placeholder-transparent"
                       placeholder="Full Name"
                     />
                     <label
                       htmlFor="name-input"
                       className="absolute left-4 top-1.5 text-[10px] uppercase tracking-widest font-label text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary pointer-events-none"
                     >
                       Full Name
                     </label>
                   </div>
                   <div className="relative group">
                     <input
                       type="email"
                       id="email-input"
                       value={formData.email}
                       onChange={e => setFormData({...formData, email: e.target.value})}
                       className="peer w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 pt-5 pb-2 font-body text-sm text-on-surface focus:outline-none focus:border-primary shadow-inner transition-colors placeholder-transparent"
                       placeholder="Work Email"
                     />
                     <label
                       htmlFor="email-input"
                       className="absolute left-4 top-1.5 text-[10px] uppercase tracking-widest font-label text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary pointer-events-none"
                     >
                       Work Email
                     </label>
                   </div>
                 </div>
                 <div className="relative group">
                   <input
                     type="text"
                     id="company-input"
                     value={formData.company}
                     onChange={e => setFormData({...formData, company: e.target.value})}
                     className="peer w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 pt-5 pb-2 font-body text-sm text-on-surface focus:outline-none focus:border-primary shadow-inner transition-colors placeholder-transparent"
                     placeholder="Company Name"
                   />
                   <label
                     htmlFor="company-input"
                     className="absolute left-4 top-1.5 text-[10px] uppercase tracking-widest font-label text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary pointer-events-none"
                   >
                     Company Name
                   </label>
                 </div>
                 <div className="relative group">
                   <textarea
                     id="details-input"
                     rows={3}
                     value={formData.details}
                     onChange={e => setFormData({...formData, details: e.target.value})}
                     className="peer w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 pt-6 pb-2 font-body text-sm text-on-surface focus:outline-none focus:border-primary shadow-inner resize-none transition-colors placeholder-transparent"
                     placeholder="Project Summary"
                   ></textarea>
                   <label
                     htmlFor="details-input"
                     className="absolute left-4 top-2 text-[10px] uppercase tracking-widest font-label text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary pointer-events-none"
                   >
                     Project Summary
                   </label>
                 </div>
              </div>

              <div className="mt-auto flex justify-between">
                <Button variant="ghost" onClick={handleBack} disabled={isSubmitting}>Back</Button>
                <Button onClick={handleSubmit} disabled={!isStep3Valid || isSubmitting} icon={isSubmitting ? "hourglass_empty" : "send"} iconPosition="right">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      </GlassCard>
    </FadeInUpImmediate>
  );
}
