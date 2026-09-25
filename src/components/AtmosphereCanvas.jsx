import React from 'react';

// A quiet, static atmosphere keeps the page fast and leaves the geometry to the content.
export default function AtmosphereCanvas() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="space-light space-light-one" />
      <div className="space-light space-light-two" />
    </div>
  );
}
