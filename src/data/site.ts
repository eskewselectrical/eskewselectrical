export const business = {
  name: "Eskew's Electrical Service",
  owner: 'David Eskew',
  phone: '662-213-9594',
  phoneHref: 'tel:+16622139594',
  email: 'business@eskewselectrical.com',
  facebook: 'https://www.facebook.com/groups/1024874514860590',
  hours: 'Call anytime, open 24/7',
  yearsInBusiness: 6,
  areaLabel: 'Northeast Mississippi',
  url: 'https://www.eskewselectrical.com',
};

export const cities = [
  'Fulton',
  'Tupelo',
  'Amory',
  'Nettleton',
  'Smithville',
  'Mantachie',
  'Belden',
  'Saltillo',
  'Pontotoc',
  'Booneville',
  'Oxford',
  'Columbus',
  'Starkville',
  'West Point',
];

export interface Service {
  slug: string;
  title: string;
  short: string; // card blurb on homepage
  description: string; // services page copy
  secondary?: boolean;
}

export const services: Service[] = [
  {
    slug: 'residential',
    title: 'Residential Electrical',
    short:
      'Wiring, lighting, panels, and repairs for homes across Northeast Mississippi — new builds and remodels included.',
    description:
      "From new construction wiring to swapping out a bad breaker, we handle the electrical work that keeps your home safe and running right. Panel upgrades, recessed lighting, ceiling fans, outlets and switches, remodels, and additions — done to code and done clean. Homeowners in Fulton, Tupelo, Saltillo, and all across Northeast Mississippi trust us because we show up, communicate honestly, and treat your house like our own.",
  },
  {
    slug: 'commercial',
    title: 'Commercial Electrical',
    short:
      'Dependable power for shops, offices, and light industrial buildings — built to code and built to last.',
    description:
      "Businesses can't afford electrical downtime. We wire and service shops, offices, retail spaces, and light industrial buildings throughout Northeast Mississippi — from Tupelo and Columbus to Starkville and West Point. Lighting layouts, dedicated circuits, service upgrades, equipment hookups, and code corrections, handled by a licensed and bonded contractor who understands that your building has a job to do.",
  },
  {
    slug: 'troubleshooting',
    title: 'Electrical Troubleshooting',
    short:
      'Flickering lights, dead outlets, tripping breakers — we specialize in finding the problem and fixing it right.',
    description:
      "Tracking down electrical problems is what we're known for. Flickering lights, breakers that won't stay on, outlets that quit working, mystery shorts — we diagnose the root cause instead of guessing at symptoms. With six years of troubleshooting experience across homes and businesses in Amory, Pontotoc, Booneville, and beyond, no problem is too stubborn. Available 24/7, because electrical problems don't keep business hours.",
  },
  {
    slug: 'generators',
    title: 'Generator Installation',
    short:
      'Standby generator installs are our specialty. Keep the lights on when the grid goes down.',
    description:
      "When storms roll through Northeast Mississippi, power goes with them. We specialize in standby generator installations that switch on automatically and keep your home or business running until the grid comes back. Sizing, transfer switch installation, dedicated wiring, and hookup — the whole job, done safely and to spec. Serving Fulton, Tupelo, Oxford, Columbus, and surrounding communities.",
  },
  {
    slug: 'overhead-doors',
    title: 'Overhead Door Solutions',
    short:
      'We also service and repair overhead doors — openers, tracks, springs, and everything in between.',
    description:
      "Alongside our electrical work, we provide overhead door solutions and repairs for garages, shops, and commercial buildings. Opener installs and replacements, track and spring repairs, and general service to keep your doors running smooth. One call covers your electrical and your overhead door needs anywhere in our Northeast Mississippi service area.",
    secondary: true,
  },
];
