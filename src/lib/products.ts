export type Theme = {
  bg: string;
  text: string;
  badgeBg: string;
  badgeText: string;
};

export const THEMES: Record<string, Theme> = {
  'Appliances': { bg: 'bg-amber-50', text: 'text-amber-600', badgeBg: 'bg-amber-100', badgeText: 'text-amber-700' },
  'Spare Parts': { bg: 'bg-sky-50', text: 'text-sky-600', badgeBg: 'bg-sky-100', badgeText: 'text-sky-700' },
  'Accessories': { bg: 'bg-emerald-50', text: 'text-emerald-600', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700' },
};

export function themeFor(category: string): Theme {
  return (
    THEMES[category] ?? {
      bg: 'bg-neutral-50',
      text: 'text-neutral-600',
      badgeBg: 'bg-neutral-100',
      badgeText: 'text-neutral-700',
    }
  );
}

export type Product = {
  id: number;
  name: string;
  tag: string;
  price: number;
  category: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Appliances': 'High-quality home appliances including mixer grinders and kettles.',
  'Spare Parts': 'Genuine spare parts for your appliances to keep them running smoothly.',
  'Accessories': 'Useful accessories and add-ons.',
};

function specsFor(category: string): { label: string; value: string }[] {
  switch (category) {
    case 'Appliances':
      return [
        { label: 'Condition', value: 'New' },
        { label: 'Warranty', value: 'Manufacturer Warranty' },
      ];
    case 'Spare Parts':
      return [
        { label: 'Condition', value: 'New' },
        { label: 'Type', value: 'Genuine Replacement' },
      ];
    default:
      return [{ label: 'Availability', value: 'In stock' }];
  }
}

const RAW_PRODUCTS: { id: number; name: string; tag: string; price: number; category: string; image: string; description?: string }[] = [
  { id: 1, name: 'SUJATA MG 02, 1000 Watts Black', tag: 'Best Seller', price: 6450, category: 'Appliances', image: '/products/sujata-mg02.png', description: '3 Jars - all 3 Stainless Steel Jars, Black body' },
  { id: 2, name: 'SUJATA MG 01, 1000W, Black', tag: '', price: 5750, category: 'Appliances', image: '/products/sujata-mg01.png', description: '3 Jars - 2 Stainless Steel Jar + 1 Polycarbonate Jar' },
  { id: 3, name: 'Prestige kettle 1.5 Lt', tag: '', price: 570, category: 'Appliances', image: '/products/prestige-kettle.jpg', description: 'Stainless steel, 360 degree swivel base' },
  { id: 4, name: 'SUJATA SUPERMIX MG', tag: '', price: 5300, category: 'Appliances', image: '/products/sujata-supermix.jpg', description: '900W, 2 SS & 1 Blender jar' },
  { id: 5, name: 'SUJATA POWERMATIC PLUS JMG', tag: '', price: 5600, category: 'Appliances', image: '/products/sujata-powermatic-plus.jpeg', description: '900w, 1 SS Jar +1 BLENDER JAR' },
  { id: 6, name: 'SUJATA DYNAMIX', tag: '', price: 6150, category: 'Appliances', image: '/products/sujata-dynamix.jpg', description: '900w, 3SS Jar, Mixer Grinder' },
  { id: 7, name: 'Prestige induction PIC 20 Neo', tag: '', price: 2200, category: 'Appliances', image: '/products/prestige-induction.jpg', description: '1600 Watts, push button 12 months warranty' },
  { id: 8, name: 'SUJATA MG 03, 1000 WATTS, 4 JARS', tag: '', price: 7200, category: 'Appliances', image: '/products/sujata-mg03.png', description: 'Copper winding. Double ball bearings' },
  { id: 9, name: 'OREVA E KETTLE 2.0 LT', tag: '', price: 590, category: 'Appliances', image: '/products/oreva-kettle.webp', description: '2 litre capacity, 1 year replacement policy' },

  { id: 10, name: 'Sujata complete tap for Megamix', tag: '', price: 171, category: 'Spare Parts', image: '/products/sujata-tap-megaflow.jpg', description: 'Tap for Megaflow Jar' },
  { id: 11, name: 'Sujata chatney jar for Dynamix New', tag: '', price: 108, category: 'Spare Parts', image: '/products/sujata-chatney-jar.jpg', description: 'New model jar cover with side lock clips and inner gasket' },
  { id: 12, name: 'Sujata gasket for blender jar', tag: '', price: 27, category: 'Spare Parts', image: '/products/sujata-blender-gasket.jpg', description: 'Suitable for blender jar of Supermix and JMG, set of 2 Ps' },
  { id: 13, name: 'Sujata Whip switch', tag: '', price: 72, category: 'Spare Parts', image: '/products/sujata-whip-switch.jpg', description: 'Suitable for all 900W models, Purple' },
  { id: 14, name: 'Sujata tap knob only', tag: '', price: 20, category: 'Spare Parts', image: '/products/sujata-tap-knob.jpg', description: 'Only knob for Megaflow jar, White' },
  { id: 15, name: 'SUJATA MOTOR BRACKET UPPER', tag: '', price: 369, category: 'Spare Parts', image: '/products/sujata-motor-bracket.jpg', description: 'Original spare parts from Sujata, die cast high quality' },
  { id: 16, name: 'Sujata Gasket for Megaflow Jar', tag: '', price: 144, category: 'Spare Parts', image: '/products/sujata-megaflow-gasket.jpg', description: 'Grey gasket ring, original product, set of 9 Ps' },

  { id: 17, name: 'Remote control for lights & fan', tag: '', price: 280, category: 'Accessories', image: '/products/remote-control.png', description: 'Can control up to 5 Lights and 1 Fan, speed control' },
];

export const products: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  description: p.description ?? CATEGORY_DESCRIPTIONS[p.category] ?? 'A quality product sourced and stocked by S.P. Enterprises.',
  specs: specsFor(p.category),
}));

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
