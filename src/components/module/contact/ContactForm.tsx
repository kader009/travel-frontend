"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { contactSchema, ContactFormValues } from "@/src/validation/contact.validation";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    // You can handle form submission here (e.g., API call)
    console.log("Form Data:", data);
    toast.success("Message sent successfully!");
    reset(); // Clear form after successful submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
            Full Name
          </label>
          <input
            {...register("fullName")}
            className={`w-full h-14 rounded-xl border ${
              errors.fullName ? "border-red-500 focus:ring-red-500" : "border-primary/10 focus:ring-primary focus:border-primary"
            } bg-background-light dark:bg-background-dark/50 focus:ring-1 px-4 outline-none transition-all`}
            placeholder="John Doe"
            type="text"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs ml-1 mt-1">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
            Email Address
          </label>
          <input
            {...register("email")}
            className={`w-full h-14 rounded-xl border ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-primary/10 focus:ring-primary focus:border-primary"
            } bg-background-light dark:bg-background-dark/50 focus:ring-1 px-4 outline-none transition-all`}
            placeholder="john@example.com"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs ml-1 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
          Subject
        </label>
        <input
          {...register("subject")}
          className={`w-full h-14 rounded-xl border ${
            errors.subject ? "border-red-500 focus:ring-red-500" : "border-primary/10 focus:ring-primary focus:border-primary"
          } bg-background-light dark:bg-background-dark/50 focus:ring-1 px-4 outline-none transition-all`}
          placeholder="How can we help?"
          type="text"
        />
        {errors.subject && (
          <p className="text-red-500 text-xs ml-1 mt-1">{errors.subject.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
          Message
        </label>
        <textarea
          {...register("message")}
          className={`w-full rounded-xl border ${
            errors.message ? "border-red-500 focus:ring-red-500" : "border-primary/10 focus:ring-primary focus:border-primary"
          } bg-background-light dark:bg-background-dark/50 focus:ring-1 p-4 outline-none transition-all resize-none`}
          placeholder="Tell us more about your inquiry..."
          rows={5}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs ml-1 mt-1">{errors.message.message}</p>
        )}
      </div>
      <button
        className="w-full md:w-auto px-10 py-4 bg-primary text-background-dark font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        type="submit"
      >
        Send Message
        <SendHorizontal className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ContactForm;
