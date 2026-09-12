"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/utils";
import type { Locale, TeamMember } from "@/types/content";
import type { dictionaries } from "@/lib/i18n/dictionaries";

type Dict = (typeof dictionaries)["en"];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Team({
  locale,
  dict,
  team,
}: {
  locale: Locale;
  dict: Dict;
  team: TeamMember[];
}) {
  const members = [...team].filter((m) => m.active).sort((a, b) => a.order - b.order);
  if (members.length === 0) return null;

  return (
    <section id="team" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.nav.team} title={dict.sections.team} />

        <div className="mt-14 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-enactus-gray-100">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-enactus-black">
                      <span className="font-display text-5xl font-extrabold text-enactus-yellow">
                        {initials(member.name)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="inline-block rounded-full bg-enactus-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-enactus-black">
                      {t(member.position, locale)}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-enactus-black">{member.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-enactus-gray-600">
                  {t(member.bio, locale)}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
