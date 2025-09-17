// get-token.js
import fetch from "node-fetch"; // Node 18+ varsa gerek yok

async function getJwtToken(username, password) {
  const res = await fetch("https://api.makcorps.com/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Token alınamadı: " + res.status);
  const data = await res.json();
  return data.access_token;
}

(async () => {
  const token = await getJwtToken("SENIN_USERNAME", "SENIN_PASSWORD");
  console.log("JWT TOKEN:", token);
})();
