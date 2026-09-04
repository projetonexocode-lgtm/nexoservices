# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: homeowners and tenants in the Lisbon Metropolitan Area and Margem Sul (with national coverage subject to availability) who have an active home breakdown — a leaking pipe, tripped fuse box, blocked drain, broken garage door, etc. — and need a technician dispatched, usually urgently.

Secondary (confirmed): small businesses, landlords, and property managers who need the same repair categories handled for a property they operate or manage, not just their own home.

## Product Purpose

Nexo Services is the front door and coordinator for a network of partner repair technicians. A visitor with a home-repair emergency contacts Nexo Services (call or WhatsApp); Nexo Services dispatches a partner technician who diagnoses on-site, explains the quote before any work starts, and completes the repair under warranty. Success is measured in converting an urgent, stressful moment into a same-day (when possible) technician visit that resolves the problem.

## Positioning

Nexo Services coordinates a network of partner technicians (individually experienced — 5, 15, and 20+ years each) across 13 repair categories, rather than employing technicians directly. Its claim a competitor could not truthfully copy: same-day-priority response across the Lisbon Metro Area and Margem Sul, backed by a written warranty (6 months to 2 years depending on service type) and an on-site quote explained before work begins — combining network-scale coverage with per-job accountability.

## Operating Context

- Conversion channels are phone and WhatsApp (deep-linked `wa.me` messages, prefilled per service with an urgency-specific message). There is no online booking or payment flow on the site.
- An email contact path also exists via a contact form backed by Resend (`RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM_EMAIL`).
- The site is a single-page marketing/lead funnel: hero, trust bar, services, differentiators, how-it-works steps, reviews, coverage, FAQ, final CTA, plus a persistent floating CTA and header/footer navigation.
- Nexo Services is one brand/service line under the Projeto Nexo group (`projetonexo.pt`).

## Capabilities and Constraints

- 13 service categories: canalização (plumbing), eletricidade (electrical), desentupimentos (drain clearing), esquentadores/caldeiras/termoacumuladores (water heaters/boilers), estores e persianas (blinds/shutters), portões de garagem (garage doors), vidros e espelhos (glass/mirrors), serralharia (locksmithing), ar condicionado (AC), caixilharia (window/door frames), portas e janelas (doors/windows), deteção de infiltração e humidade (damp/leak detection), telhados e coberturas (roofing).
- Coverage: immediate-priority service in "Lisboa e região" and "Margem Sul" (specific city lists maintained in `lib/coverage.ts`); national coverage exists "mediante disponibilidade" (subject to availability) and must never be presented as equal to the priority area.
- Warranty: 6 months to 2 years depending on service type. Installations using client-supplied materials/equipment carry only a 6-month installation warranty; the material itself follows the manufacturer's/supplier's own warranty.
- No pricing is published on the site by design — each job is quoted individually on-site, after diagnosis, before work proceeds.
- An invoice with NIF is issued for every service (confirmed via the 2026-09 design brief).
- Explicitly undecided, pending the client (do not present as settled or invent values): exact operating hours, average technician arrival time, whether the on-site quote/travel is free or charged, weekend/holiday availability, the official count of jobs completed to date, and the exact technician identification procedure on arrival. These are already flagged as `[PLACEHOLDER]` inline in `lib/content.ts` and `lib/faq.ts`.

## Brand Commitments

- Name: "Nexo Services"; legal/full form: "Nexo Services — Reparações e Serviços Especializados."
- Part of the Projeto Nexo group (`projetonexo.pt`).
- Locale: pt-PT (European Portuguese). All copy is written for a Portugal audience, not Brazilian Portuguese.

## Evidence on Hand

- Real service photography exists for 6 of the 13 services (canalização, eletricidade, estores, ar condicionado, caixilharia, portas) at `public/nexo-services/`; the remaining 7 have no photo yet.
- The reviews in `lib/reviews.ts` are explicitly illustrative placeholders (`REVIEWS_DISCLAIMER: "Exemplos ilustrativos — a substituir por avaliações reais do cliente."`) — future work must not treat them as real testimonials, must not fabricate additional ones, and should keep the disclaimer until real reviews replace them.
- The "+N serviços realizados" trust-bar stat is an explicit placeholder awaiting the client's real number — do not invent a figure.

## Product Principles

- Urgency-first: every interaction should minimize time-to-contact for someone with an active, often stressful home breakdown.
- Trust before commitment: technician identification, an on-site quote explained before work starts, and clear warranty terms exist to earn confidence before a stranger enters someone's home or managed property.
- Coverage honesty: be explicit about where response is immediate versus available-on-request; never blur national reach into the same promise as the priority area.
- Placeholder discipline: never present an unconfirmed operational fact (hours, arrival time, review counts, pricing policy) as settled — keep it flagged until the client confirms it.
- Network trust transfer: because technicians are partners rather than direct employees, the site's credibility work (experience, identification, warranty) has to substitute for single-employer brand trust.
