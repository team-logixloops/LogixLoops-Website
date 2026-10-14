import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { PROMISES } from "@/lib/constants";
import { SECTION } from "@/components/sections/service-master/tokens";

/**
 * The six promises every kit carries. Each card is a declaration, so it
 * takes `rule-draw`; `overflow-hidden` keeps the drawn rule inside the
 * rounded corners.
 */
export default function PromiseStrip() {
  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Every Loop, every time"
          title="Six things you can hold us to"
          description="These come with every Loop, whatever it costs."
        />
      </FadeInUp>
      <StaggerContainer className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {PROMISES.map((promise) => (
          <StaggerItem key={promise.title}>
            <div className="rule-draw h-full overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 p-6 md:p-8">
              <span className="material-symbols-outlined mb-4 block text-[28px] text-primary" aria-hidden="true">
                {promise.icon}
              </span>
              <h3 className="font-display text-xl text-on-surface mb-2">{promise.title}</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">{promise.detail}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
