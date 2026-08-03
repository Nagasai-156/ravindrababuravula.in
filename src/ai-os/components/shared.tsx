import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Section eyebrow, matching `.cp-sec-label` on the rest of the site: a short
 * gold rule followed by an uppercase gold label. (`index` is still accepted so
 * call sites didn't need touching, but the old SYS.xx terminal motif was a
 * different brand's language and is no longer shown.)
 */
export const SysLabel = ({ name }: { index?: string; name: string }) => (
  <div className="mb-8 md:mb-12">
    <span className="aios-sec-label">{name}</span>
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
