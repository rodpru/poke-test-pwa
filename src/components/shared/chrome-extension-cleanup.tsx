'use client';

import { useEffect } from 'react';

/**
 * Componente para limpar atributos injetados por extensões do Chrome
 * que causam hydration mismatch
 */
export function ChromeExtensionCleanup() {
  useEffect(() => {
    // Remove atributos injetados por extensões (ColorZilla, etc)
    if (document.body.hasAttribute('cz-shortcut-listen')) {
      document.body.removeAttribute('cz-shortcut-listen');
    }
    
    // Remove outros atributos conhecidos de extensões
    const extensionAttributes = ['data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];
    extensionAttributes.forEach(attr => {
      if (document.body.hasAttribute(attr)) {
        document.body.removeAttribute(attr);
      }
    });
  }, []);

  return null;
}
