import { lazy } from 'react';

/** Lazy load — mỗi demo là chunk riêng, chỉ tải khi được chọn */
export const DefaultSection = lazy(() =>
  import('./sections/DefaultSection.jsx').then((m) => ({ default: m.DefaultSection })),
);

export const CompoundSection = lazy(() =>
  import('./sections/CompoundSection.jsx').then((m) => ({ default: m.CompoundSection })),
);

export const TailwindSlotSection = lazy(() =>
  import('./sections/TailwindSlotSection.jsx').then((m) => ({
    default: m.TailwindSlotSection,
  })),
);

export const BootstrapSlotSection = lazy(() =>
  import('./sections/BootstrapSlotSection.jsx').then((m) => ({
    default: m.BootstrapSlotSection,
  })),
);

export const MuiSlotSection = lazy(() =>
  import('./sections/MuiSlotSection.jsx').then((m) => ({ default: m.MuiSlotSection })),
);

export const CompoundSlotSection = lazy(() =>
  import('./sections/CompoundSlotSection.jsx').then((m) => ({
    default: m.CompoundSlotSection,
  })),
);

export const HeadlessSection = lazy(() =>
  import('./sections/HeadlessSection.jsx').then((m) => ({ default: m.HeadlessSection })),
);
