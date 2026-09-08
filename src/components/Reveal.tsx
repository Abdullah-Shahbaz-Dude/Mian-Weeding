import { forwardRef, type ReactNode } from "react";
import { motion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  function Reveal({ children, className, id }, ref) {
    return (
      <motion.div
        ref={ref}
        id={id}
        className={className}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  },
);
