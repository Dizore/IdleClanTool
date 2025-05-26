import { useEffect, useState } from "react";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPlayer() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://query.idleclans.com/api/Player/profile/${playerName}`);
      if (!res.ok) throw new Error("Fehler beim Laden der Daten");
      const json = await res.json();
      setPlayerData(json?.data?.[0] || null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 20, maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>🔍 Idle Clans Spielerinfo</h1>

      <div style={{ display: 'flex', gap: 8, marginTop: 16, marginBottom: 16 }}>
        <input
          placeholder="Spielername eingeben"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={fetchPlayer} disabled={loading || !playerName} style={{ padding: 8 }}>
          Suchen
        </button>
      </div>

      {loading && <p>Lade...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {playerData && (
        <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
          <h2 style={{ fontSize: 18, fontWeight: 'bold' }}>{playerData.username}</h2>
          <p><strong>Clan:</strong> {playerData.clan?.name || "Kein Clan"}</p>
          <p><strong>Level:</strong> {playerData.level}</p>
          <p><strong>Location:</strong> {playerData.location}</p>
        </div>
      )}
    </main>
  );
}
