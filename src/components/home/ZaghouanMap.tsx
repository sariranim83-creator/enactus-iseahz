"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { t } from "@/lib/utils";
import type { Locale, LocalImpactContent } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

/**
 * Real Tunisia mainland outline and the actual Zaghouan governorate boundary,
 * traced from geoBoundaries (OpenStreetMap-derived, ODbL) open administrative
 * boundary data — https://www.geoboundaries.org (ADM0/ADM1 for TUN), equirectangular
 * projection (longitude compressed by cos(mean latitude)), Douglas-Peucker
 * simplified for a clean decorative rendering. Offshore islands (Djerba,
 * Kerkennah, etc.) are omitted for simplicity; only the mainland is shown.
 */
const VIEWBOX = { width: 212, height: 432 };

const TUNISIA_PATH =
  "M115,6 L94.7,12.8 L90,13.7 L89.2,12.2 L84.3,17 L79.8,18.4 L70.4,28 L61.4,29.6 L60.1,35 L62.8,36 L62.3,37.2 L57.5,39.8 L50.5,40.7 L53.4,44.3 L51.5,49 L37,56.1 L39.9,59.1 L49.4,60.5 L47.9,64.9 L48.6,67.5 L46,69.9 L46.8,71.8 L44.5,75.2 L46.4,79.7 L42,90.6 L42.1,99.5 L46.9,105 L48.3,115.7 L44.9,120 L44.8,126 L49.5,130 L52.8,130.3 L47,138.7 L44.9,147.5 L41.5,149.1 L43.4,158.2 L45.3,160.3 L41.2,162.9 L42.9,165.5 L35.1,173.3 L22.4,179.6 L20.4,190.9 L16.3,193.5 L12.5,191.8 L10.5,196.8 L6.5,199.3 L7.9,202.6 L6,209.1 L7.2,213.1 L6.2,215.4 L8,216.6 L9.7,224.3 L16.5,237.4 L17.1,243.2 L18.5,243.4 L21.2,251.4 L35.2,256.6 L35.1,259.6 L45.3,272.9 L46.9,291.9 L81.7,316.4 L105.9,426 L124.8,416.9 L130.9,409.5 L140.9,392.3 L142.5,386.7 L141,378.1 L142,375.1 L134.1,352.3 L141.1,340.9 L146.5,336.8 L153.4,336.8 L158.7,328.6 L157.6,326.5 L159.3,323 L166.5,321.6 L169.8,315.3 L178,309.7 L203.5,297.4 L205.8,294.7 L206,290.9 L200,282.8 L200.9,267.4 L204.1,252.7 L192.6,246.8 L198.4,251.9 L185.2,250.2 L182.3,245.6 L182.9,243.9 L191,246.1 L183.2,240.7 L181.3,241.3 L183.4,239.7 L181.1,236.8 L182.1,233.6 L183,234.2 L182.2,230.8 L176.4,224.1 L175.2,225.8 L173,223.9 L173.9,225.5 L172.2,226.4 L173.6,230.2 L165.9,234.7 L161.8,233.5 L160.9,231 L163.6,226.9 L163,220.8 L155.6,223.9 L156.3,225.3 L154.7,225.4 L155.4,223.8 L149.3,225.8 L148.4,225 L151.1,224.2 L141.3,218.8 L133,209.8 L128.5,196.5 L128.3,192.8 L129.2,193.6 L129,191.3 L133.5,184.8 L136.9,182 L140.8,181.6 L141.6,178.8 L144.7,179.7 L143.7,178.8 L145.9,178.6 L150.1,173.5 L156.6,171.7 L159.4,166 L163.4,165 L164.5,160.8 L172.6,152.4 L172.9,146.4 L178.3,142 L177.7,138.4 L179.1,135.4 L180.9,135 L182.4,131.3 L184.7,130.9 L178.3,124.3 L178.7,118.2 L180.6,114.5 L178.2,112.6 L179,107.6 L168.3,103.3 L168.5,98 L160.9,98.4 L153.6,86.9 L149.9,85.1 L152.8,85.1 L153.6,86.9 L150.4,76 L154.2,63.3 L167.2,58.5 L175.2,42.6 L182.5,35.9 L183.3,33.9 L179.5,25.8 L180.2,23.4 L178.3,21.2 L172.1,23.5 L172.3,26 L164.7,32 L156.3,34.5 L153.9,40.8 L146.1,43.1 L141,38.5 L144.8,33.8 L138.2,28.3 L136.3,24.1 L138.3,17.4 L138.1,19.8 L134.1,18.1 L141.2,15.7 L138.1,15.5 L130.9,10.6 L126.4,11.9 L122.2,10.2 L118.8,13.2 L124.2,13.2 L123.8,16.3 L118.5,18.1 L116.6,12.3 L122.2,10 L120.8,6.7 Z";

const ZAGHOUAN_AREA_PATH =
  "M129.6,48.7 L128.4,46.4 L122.7,52.8 L122.1,51.7 L119.6,52 L118.9,54.2 L114.4,57.8 L115.8,61.3 L114,66.9 L107.6,70.3 L113.8,73.8 L114,75.8 L116.2,77 L115.5,78.8 L118.1,79.2 L119.1,82.2 L121.5,81 L122.7,83 L126.2,82.5 L129.7,85.4 L130.4,79.2 L131.3,81 L134.3,80.7 L133.7,79.2 L136.6,76.2 L140.5,75.7 L140.1,72.1 L143,72.9 L146.1,71.6 L146.6,69.9 L145,68.9 L146.7,67.6 L144.4,60.5 L144.6,56.7 L140,58.9 L140.8,55.8 L135.6,54 L134.6,49.9 L132.8,51.2 Z";

const ZAGHOUAN_LABEL_POINT = { x: 129, y: 67 };
const TUNIS_POINT = { x: 136.4, y: 37.9 };

export function ZaghouanMap({
  locale,
  dict,
  localImpact,
}: {
  locale: Locale;
  dict: Dict;
  localImpact: LocalImpactContent;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow={locale === "fr" ? "Impact local" : "Local Impact"}
            title={t(localImpact.headline, locale)}
            description={t(localImpact.description, locale)}
          />

          <div
            ref={ref}
            className="relative mx-auto aspect-[212/432] w-full max-w-[220px] overflow-hidden rounded-2xl border border-enactus-gray-100"
          >
            <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} className="h-full w-full">
              <motion.path
                d={TUNISIA_PATH}
                fill="#F7F7F5"
                stroke="#0A0A0A"
                strokeWidth={1.5}
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />

              <circle cx={TUNIS_POINT.x} cy={TUNIS_POINT.y} r={2} fill="#0A0A0A" opacity={0.4} />

              <motion.path
                d={ZAGHOUAN_AREA_PATH}
                fill="#FFC72C"
                stroke="#0A0A0A"
                strokeWidth={1}
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${ZAGHOUAN_LABEL_POINT.x}px ${ZAGHOUAN_LABEL_POINT.y}px` }}
              />
            </svg>

            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 text-[10px] font-bold uppercase tracking-[0.2em] text-enactus-gray-400">
              <span>{dict.map.tunisia}</span>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-enactus-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-enactus-yellow"
            >
              {dict.map.zaghouan}
            </motion.span>
          </div>
        </div>
      </Container>
    </section>
  );
}
