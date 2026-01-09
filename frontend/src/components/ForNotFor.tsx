"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import Container, { SubContainer } from "./Container";
import { ACCENT_COLOR } from "@/lib/theme";

export default function ForNotFor() {
  return (
    <Section id="for-not-for" className="text-white" style={{ backgroundColor: ACCENT_COLOR }}>
      <Container maxWidth="7xl">
        <SubContainer>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold mb-12 font-heading text-left text-white"
          >
            Who This Is For (And Who It&apos;s Not)
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6 font-heading text-white">
                This is for you if…
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You have a clear business idea and need a production-ready MVP to validate it
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You&apos;re a non-technical founder who needs to launch without learning to code
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You have a realistic timeline (8–12 weeks) and budget for a serious product
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You need a structured process that reduces risk and protects your reputation
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You want to launch a real product, not a prototype or proof of concept
                  </p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6 font-heading text-white">
                This is not for you if…
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You&apos;re exploring ideas or need help deciding what to build
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You&apos;re looking for a hobby project or learning experience
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You need ongoing technical support or want to learn development yourself
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You have an unrealistic budget or expect to build a full product in a few weeks
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 text-white opacity-80">•</span>
                  <p className="leading-relaxed text-[15px] text-white opacity-90">
                    You need a quick prototype or wireframe rather than a production-ready application
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </SubContainer>
      </Container>
    </Section>
  );
}
