import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Terminal-style section index — the OS boot sequence that threads the page. */
export const SysLabel = ({ index, name }: { index: string; name: string }) => (
  <div className="mb-8 flex items-center gap-3 md:mb-12">
    <span className="t-label font-semibold text-volt">SYS.{index}</span>
    <span className="h-px flex-1 bg-hairline" />
    <span className="t-label text-muted">{name}</span>
  </div>
);

export const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ y: 32, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section id={id} className={`relative mx-auto max-w-[1400px] px-5 md:px-10 ${className}`}>
    {children}
  </section>
);
