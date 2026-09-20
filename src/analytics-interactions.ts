import type { MouseEventHandler } from "react";
import type { Lang } from "./i18n";
import { trackProductEvent } from "./analytics";
import type { AnalyticsEventName } from "./analytics-events";

type Product = "farsio" | "neveshtyar" | "avayar";

type InteractionOptions = {
  event: AnalyticsEventName;
  product: Product;
  locale: Lang;
  ctaType: string;
  destinationType: string;
};

export function productInteraction({
  event,
  product,
  locale,
  ctaType,
  destinationType,
}: InteractionOptions): MouseEventHandler<HTMLAnchorElement> {
  return () => {
    trackProductEvent(event, {
      product,
      locale,
      cta_type: ctaType,
      destination_type: destinationType,
    });
  };
}
