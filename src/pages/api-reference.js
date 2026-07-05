import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Full-screen iframe page for the DocFX-generated API Reference.
 * 
 * This bypasses Docusaurus SPA routing entirely by embedding
 * the static DocFX site in an iframe — all DocFX internal navigation
 * (sidebar links, namespace links, etc.) works correctly inside 
 * the iframe without being intercepted by the Docusaurus router.
 */
export default function ApiReference() {
  const apiUrl = useBaseUrl('/sdk/api/api/index.html');

  return (
    <iframe
      src={apiUrl}
      title="Pt.Okx.Sdk API Reference"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        zIndex: 9999,
      }}
    />
  );
}
