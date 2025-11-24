import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0.25 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} // Sadece bir kere çalışsın, sürekli gir-çık yapmasın
      transition={{ duration: 0.5, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;