import React from "react";

function RestrictedContent() {
  return (
    <div>
      <h1>Restricted Content</h1>
      <p>Because you're under 10, you'll have access to kid-safe content only.</p>
      <h2>Parental Guide</h2>
      <p>Parents can explore curated content suitable for young children here.</p>
      {/* Optional: Display specific kid-friendly content or parental information */}
    </div>
  );
}

export default RestrictedContent;
