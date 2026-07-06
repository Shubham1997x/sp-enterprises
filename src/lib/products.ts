export type Theme = {
  bg: string;
  text: string;
  badgeBg: string;
  badgeText: string;
};

export const THEMES: Record<string, Theme> = {
  'Diwali Lights': { bg: 'bg-amber-50', text: 'text-amber-600', badgeBg: 'bg-amber-100', badgeText: 'text-amber-700' },
  'Rechargeable Fans': { bg: 'bg-sky-50', text: 'text-sky-600', badgeBg: 'bg-sky-100', badgeText: 'text-sky-700' },
  'Solar Lanterns': { bg: 'bg-emerald-50', text: 'text-emerald-600', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700' },
  'LED Lights': { bg: 'bg-indigo-50', text: 'text-indigo-600', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700' },
  'Rechargeable Lights': { bg: 'bg-orange-50', text: 'text-orange-600', badgeBg: 'bg-orange-100', badgeText: 'text-orange-700' },
  Raincoats: { bg: 'bg-rose-50', text: 'text-rose-600', badgeBg: 'bg-rose-100', badgeText: 'text-rose-700' },
  'LED Bulbs': { bg: 'bg-yellow-50', text: 'text-yellow-600', badgeBg: 'bg-yellow-100', badgeText: 'text-yellow-700' },
  'Car Fans': { bg: 'bg-teal-50', text: 'text-teal-600', badgeBg: 'bg-teal-100', badgeText: 'text-teal-700' },
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
  'Diwali Lights': 'A festive decorative light piece built for the Diwali season, made to run reliably night after night.',
  'Rechargeable Fans': 'A cordless rechargeable fan for use during power cuts or on the move, with a long-running battery.',
  'Solar Lanterns': 'A solar-charged lantern that stores daylight and lights up homes and shops after dark, no wiring needed.',
  'LED Lights': 'An energy-efficient LED fixture built for everyday home and shop lighting.',
  'Rechargeable Lights': 'A rugged rechargeable torch or lamp for outdoor use, power cuts, and everyday carry.',
  Raincoats: 'A waterproof raincoat built for the monsoon, lightweight enough for daily commuting.',
  'LED Bulbs': 'A drop-in LED bulb replacement built for both AC mains and DC/inverter supply.',
  'Car Fans': 'A 12V/24V DC fan built for dashboards and cabins, running directly off the vehicle battery.',
};

function specsFor(category: string): { label: string; value: string }[] {
  switch (category) {
    case 'Diwali Lights':
      return [
        { label: 'Power Source', value: 'Button cell / plug-in' },
        { label: 'Occasion', value: 'Diwali & festivals' },
        { label: 'Material', value: 'Plastic body' },
      ];
    case 'Rechargeable Fans':
      return [
        { label: 'Battery', value: 'Li-ion rechargeable' },
        { label: 'Charging Time', value: '3-4 hours' },
        { label: 'Backup', value: 'Up to 6 hours' },
      ];
    case 'Solar Lanterns':
      return [
        { label: 'Charging', value: 'Solar panel, USB backup' },
        { label: 'Light Source', value: 'LED' },
        { label: 'Usage', value: 'Indoor & outdoor' },
      ];
    case 'LED Lights':
      return [
        { label: 'Light Source', value: 'SMD LED' },
        { label: 'Usage', value: 'Home & shop lighting' },
        { label: 'Wattage', value: 'Model dependent' },
      ];
    case 'Rechargeable Lights':
      return [
        { label: 'Battery', value: 'Rechargeable Li-ion' },
        { label: 'Body', value: 'ABS / metal' },
        { label: 'Usage', value: 'Outdoor & power-cut use' },
      ];
    case 'Raincoats':
      return [
        { label: 'Material', value: 'Waterproof PVC/polyester' },
        { label: 'Fit', value: 'Unisex, adjustable hood' },
        { label: 'Usage', value: 'Monsoon commute' },
      ];
    case 'LED Bulbs':
      return [
        { label: 'Input', value: 'AC/DC compatible' },
        { label: 'Base Type', value: 'B22 / E27' },
        { label: 'Lifespan', value: '25,000+ hours' },
      ];
    case 'Car Fans':
      return [
        { label: 'Voltage', value: '12V / 24V DC' },
        { label: 'Mount', value: 'Dashboard / clip-on' },
        { label: 'Usage', value: 'Car & truck cabins' },
      ];
    default:
      return [{ label: 'Availability', value: 'In stock' }];
  }
}

const RAW_PRODUCTS: { id: number; name: string; tag: string; price: number; category: string; image: string }[] = [
  { id: 1, name: 'Ram Mandir Diya', tag: 'Bestseller', price: 65, category: 'Diwali Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/9/451112972/RG/DE/YQ/127290824/product-jpeg-250x250.jpg' },
  { id: 2, name: 'Shivling Sensor Water Diya', tag: '', price: 9, category: 'Diwali Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/9/344732270/BG/XC/SU/127290824/product-jpeg-250x250.jpg' },
  { id: 3, name: 'Panchmukhi Water Sensor Diya', tag: '', price: 50, category: 'Diwali Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/9/344718032/ZF/ON/KQ/127290824/product-jpeg-250x250.jpg' },
  { id: 4, name: 'Musical Shivling Diya', tag: 'New', price: 90, category: 'Diwali Lights', image: 'https://5.imimg.com/data5/SELLER/Default/2025/1/483261561/WK/NF/YC/127290824/musical-shivling-diya-250x250.jpg' },
  { id: 5, name: 'LED Floating Diya', tag: '', price: 10, category: 'Diwali Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/8/444801037/DR/FP/VO/127290824/product-jpeg-250x250.jpg' },
  { id: 6, name: 'Fancy LED Tree Light', tag: '', price: 350, category: 'Diwali Lights', image: 'https://5.imimg.com/data5/SELLER/Default/2025/1/483250372/MP/YA/GG/127290824/fancy-trees-light-250x250.jpg' },
  { id: 7, name: 'Rechargeable Fan With LED Light', tag: 'Bestseller', price: 115, category: 'Rechargeable Fans', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/3/400851924/US/DL/WM/127290824/product-jpeg-250x250.jpg' },
  { id: 8, name: 'Speed Fan Rechargeable 8 inch', tag: '', price: 100, category: 'Rechargeable Fans', image: 'https://5.imimg.com/data5/ANDROID/Default/2026/4/601734244/BX/XQ/AN/127290824/product-jpeg-250x250.jpg' },
  { id: 9, name: 'Rechargeable Table Fan With LED Light', tag: '', price: 200, category: 'Rechargeable Fans', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/1/376118968/PU/NF/CH/127290824/product-jpeg-250x250.jpg' },
  { id: 10, name: 'Clip Rechargeable Battery Fan', tag: '', price: 230, category: 'Rechargeable Fans', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/3/403437440/GZ/AK/SP/127290824/product-jpeg-250x250.jpg' },
  { id: 11, name: 'Neck Fan Rechargeable', tag: '', price: 230, category: 'Rechargeable Fans', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/3/403436208/TB/LF/OS/127290824/product-jpeg-250x250.jpg' },
  { id: 12, name: 'Pakiza Solar Lantern', tag: '', price: 110, category: 'Solar Lanterns', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/6/319823184/BD/RW/OQ/127290824/product-jpeg-250x250.jpg' },
  { id: 13, name: 'UFO Solar Lantern Lamp', tag: '', price: 220, category: 'Solar Lanterns', image: 'https://5.imimg.com/data5/ANDROID/Default/2022/12/SG/HX/OQ/127290824/product-jpeg-250x250.jpg' },
  { id: 14, name: 'LED Solar Lamp', tag: 'New', price: 135, category: 'Solar Lanterns', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/1/376117088/HT/QY/PM/127290824/product-jpeg-250x250.jpg' },
  { id: 15, name: 'Solar Table Top Light', tag: '', price: 180, category: 'Solar Lanterns', image: 'https://5.imimg.com/data5/ANDROID/Default/2022/12/NP/IC/VB/127290824/product-jpeg-250x250.jpg' },
  { id: 16, name: 'LED Study Table Light', tag: '', price: 85, category: 'LED Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/1/376119280/HI/OI/KU/127290824/product-jpeg-250x250.jpg' },
  { id: 17, name: 'Mushroom LED Night Lamp', tag: 'Bestseller', price: 45, category: 'LED Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/12/364873376/JC/OL/FO/127290824/product-jpeg-250x250.jpg' },
  { id: 18, name: 'LED Flood Light', tag: '', price: 280, category: 'LED Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/2/388787701/KP/HA/LZ/127290824/product-jpeg-250x250.jpg' },
  { id: 19, name: 'Rechargeable LED Torch Light', tag: '', price: 80, category: 'Rechargeable Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/12/476018953/II/IZ/MY/127290824/product-jpeg-250x250.jpg' },
  { id: 20, name: 'Rechargeable Kisan Torch', tag: '', price: 250, category: 'Rechargeable Lights', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/12/475315310/ZB/NF/CS/127290824/product-jpeg-250x250.jpg' },
  { id: 21, name: 'Rain Poncho Raincoat', tag: '', price: 20, category: 'Raincoats', image: 'https://5.imimg.com/data5/ANDROID/Default/2026/6/616069700/HQ/PH/HX/127290824/product-jpeg-250x250.jpg' },
  { id: 22, name: 'Unisex Rain Suit', tag: 'New', price: 160, category: 'Raincoats', image: 'https://5.imimg.com/data5/ANDROID/Default/2026/6/620734311/IU/OH/BC/127290824/product-jpeg-250x250.jpg' },
  { id: 23, name: 'School Bag Raincoat', tag: '', price: 140, category: 'Raincoats', image: 'https://5.imimg.com/data5/ANDROID/Default/2026/6/616068124/GV/TE/ZX/127290824/product-jpeg-250x250.jpg' },
  { id: 24, name: '9W AC/DC LED Bulb', tag: 'Bestseller', price: 60, category: 'LED Bulbs', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/7/321690599/WS/NW/GR/127290824/product-jpeg-250x250.jpg' },
  { id: 25, name: '12V DC LED Bulb', tag: '', price: 65, category: 'LED Bulbs', image: 'https://5.imimg.com/data5/SELLER/Default/2023/12/367616832/XW/MT/KD/127290824/12v-dc-led-bulb-250x250.jpg' },
  { id: 26, name: '6 inch 12V DC Car Fan', tag: '', price: 85, category: 'Car Fans', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/1/376119952/UB/XG/KI/127290824/product-jpeg-250x250.jpg' },
  { id: 27, name: 'Cooling Mist Fan', tag: '', price: 280, category: 'Car Fans', image: 'https://5.imimg.com/data5/ANDROID/Default/2024/5/416143517/WL/EJ/HT/127290824/product-jpeg-250x250.jpg' },
];

export const products: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  description: CATEGORY_DESCRIPTIONS[p.category] ?? 'A quality product sourced and stocked by S.P. Enterprises.',
  specs: specsFor(p.category),
}));

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
