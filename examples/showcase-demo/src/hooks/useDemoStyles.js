import { useEffect } from 'react';
import bootstrapCssUrl from 'bootstrap/dist/css/bootstrap.min.css?url';

const STYLE_IDS = {
  bootstrap: 'showcase-style-bootstrap',
};

/**
 * Chỉ inject CSS framework khi demo tương ứng đang active.
 * Gỡ link khi chuyển demo khác — tránh Bootstrap reset ảnh hưởng Tailwind/MUI.
 */
export function useDemoStyles(activeId) {
  useEffect(() => {
    if (activeId !== 'bootstrap') {
      return undefined;
    }

    const existing = document.getElementById(STYLE_IDS.bootstrap);
    if (existing) {
      return undefined;
    }

    const link = document.createElement('link');
    link.id = STYLE_IDS.bootstrap;
    link.rel = 'stylesheet';
    link.href = bootstrapCssUrl;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [activeId]);
}
