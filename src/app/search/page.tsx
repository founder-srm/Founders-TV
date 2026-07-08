"use client";

import { useState } from "react";

export default function SearchPage() {
    const [searchText, setSearchText] = useState("");
  return (
    <div className="p-8">
    <input
    type="text"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
/>
    </div>
  );
}