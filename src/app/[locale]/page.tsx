import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSiteContent } from "@/lib/content/getContent";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

import { IntroSequence } from "@/components/intro/IntroSequence";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { WhatIsEnactus } from "@/components/home/WhatIsEnactus";
import { WhyJoin } from "@/components/home/WhyJoin";
import { Culture } from "@/components/home/Culture";
import { Stats } from "@/components/home/Stats";
import { SDGSection } from "@/components/home/SDGSection";
import { ZaghouanMap } from "@/components/home/ZaghouanMap";
import { Ambition } from "@/components/home/Ambition";
import { Competition } from "@/components/home/Competition";
import { Team } from "@/components/home/Team";
import { UpcomingEvent } from "@/components/home/UpcomingEvent";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Partners } from "@/components/home/Partners";
import { Contact } from "@/components/home/Contact";

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const content = await getSiteContent();

  return (
    <>
      <IntroSequence
        locale={locale}
        dict={dict}
        general={content.general}
        competitionPhotos={content.competitionPhotos}
      />
      <Hero locale={locale} dict={dict} hero={content.hero} general={content.general} />
      <About locale={locale} dict={dict} about={content.about} />
      <WhatIsEnactus locale={locale} dict={dict} explainer={content.enactusExplainer} />
      <WhyJoin locale={locale} dict={dict} items={content.whyJoin} />
      <Culture locale={locale} dict={dict} culture={content.culture} />
      <Stats locale={locale} dict={dict} stats={content.stats} />
      <SDGSection locale={locale} dict={dict} sdgs={content.sdgs} />
      <ZaghouanMap locale={locale} dict={dict} localImpact={content.localImpact} />
      <Ambition locale={locale} dict={dict} vision={content.vision} />
      <Competition
        locale={locale}
        dict={dict}
        competition={content.competition}
        photos={content.competitionPhotos}
      />
      <Team locale={locale} dict={dict} team={content.team} />
      <UpcomingEvent locale={locale} dict={dict} events={content.events} />
      <GalleryPreview locale={locale} dict={dict} photos={content.gallery} />
      <Partners locale={locale} dict={dict} partners={content.partners} contact={content.contact} />
      <Contact locale={locale} dict={dict} contact={content.contact} social={content.social} />
    </>
  );
}
