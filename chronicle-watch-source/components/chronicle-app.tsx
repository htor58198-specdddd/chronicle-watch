"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { heroAvatarById, heroAvatars } from "../lib/avatar-roster";
import { catalog, universeNames, type CatalogItem, type ContentType, type Universe } from "../lib/catalog";
import { platformFor, posterUrlFor } from "../lib/media-meta";

type Profile = {
  userId: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarId: string;
};

type ProgressRow = {
  contentId: string;
  completedUnits: number;
  totalUnits: number;
};

type Person = {
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  avatarId: string;
  following: boolean;
};

type WatchGroup = {
  id: string;
  name: string;
  description: string;
  inviteCode: string;
  ownerId: string;
  role: "owner" | "member";
  members: Array<{
    userId: string;
    username: string;
    displayName: string;
    avatarId: string;
    role: "owner" | "member";
  }>;
};

type View = "journey" | "completed" | "groups" | "discover" | "profile";
type AuthMode = "login" | "signup";

const formatLabels: Record<ContentType, string> = {
  film: "Film",
  season: "Dizi",
  special: "Özel",
  short: "Kısa",
};

const rankNames = [
  "Evrene Giriş",
  "Takım Üyesi",
  "Kahraman Arşivcisi",
  "Evren Yolcusu",
  "Zaman Ustası",
  "Multiverse Muhafızı",
  "Kronoloji Ustası",
];

function initials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function HeroAvatarImage({ avatarId, name, className = "" }: { avatarId: string; name: string; className?: string }) {
  const avatar = heroAvatarById(avatarId);
  return (
    <span className={`avatar ${className}`} title={avatar.name}>
      <span className="avatar-fallback" aria-hidden="true">{initials(name)}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avatar.imageUrl} alt={`${avatar.name} profil figürü`} style={{ objectPosition: avatar.position }} onError={(event) => { event.currentTarget.hidden = true; }} />
    </span>
  );
}

function unitXp(item: CatalogItem) {
  if (item.type === "film") return 250;
  if (item.type === "special") return 150;
  if (item.type === "short") return 75;
  return 60;
}

function ChronicleLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`chronicle-logo ${compact ? "compact" : ""}`}>
      <span className="chronicle-emblem" aria-hidden="true">
        <span className="chronicle-ring" />
        <span className="chronicle-axis" />
        <span className="chronicle-node" />
      </span>
      {!compact && (
        <span className="chronicle-wordmark">
          <strong>CHRONICLE</strong>
          <small>WATCH ORDER</small>
        </span>
      )}
    </span>
  );
}

function AuthShell({ onAuthenticated }: { onAuthenticated: (profile: Profile) => void }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: mode, email, password, username }),
      });
      const data = await response.json() as { profile?: Profile; error?: string };
      if (!response.ok || !data.profile) throw new Error(data.error ?? "Hesap işlemi tamamlanamadı.");
      onAuthenticated(data.profile);
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "İşlem tamamlanamadı.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-story" aria-label="Chronicle tanıtımı">
        <a className="brand brand-large" href="#" aria-label="Chronicle ana sayfa">
          <ChronicleLogo />
        </a>
        <div className="auth-story-copy">
          <p className="eyebrow">Üç evren · tek izleme yolculuğu</p>
          <h1>İzledikçe ilerle. Arkadaşlarınla aynı evrende buluş.</h1>
          <p>
            MCU, X-Men ve Fantastic Four kronolojilerini takip et; bölümleri işaretle,
            gruplar kur ve arkadaşlarının yolculuğunu gör.
          </p>
        </div>
        <div className="auth-proof" aria-label="Ürün özellikleri">
          <span>154 yapım</span>
          <span>Grup maratonları</span>
          <span>Takip sistemi</span>
        </div>
      </section>

      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="auth-panel-inner">
          <div>
            <p className="eyebrow">Arkadaş grubun için</p>
            <h2 id="auth-title">
              {mode === "login" ? "Yolculuğuna devam et" : "Chronicle hesabını oluştur"}
            </h2>
          </div>

          <div className="segmented" aria-label="Hesap işlemi">
            <button type="button" className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setError(""); }}>Giriş yap</button>
            <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>Kaydol</button>
          </div>

          <form className="auth-form" onSubmit={submit}>
            {mode === "signup" && (
              <label>
                Kullanıcı adı
                <input value={username} onChange={(event) => setUsername(event.target.value.toLowerCase())} placeholder="sw4mp" autoComplete="username" required />
              </label>
            )}
            <label>
              E-posta
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="sen@ornek.com" autoComplete="email" required />
            </label>
            <label>
              Şifre
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="En az 8 karakter" minLength={8} maxLength={128} autoComplete={mode === "signup" ? "new-password" : "current-password"} required />
            </label>

            {error && <p className="form-message error" role="alert">{error}</p>}

            <button className="button primary wide" type="submit" disabled={busy}>
              {busy ? "İşleniyor…" : mode === "login" ? "Giriş yap" : "Hesap oluştur"}
            </button>
          </form>

          <p className="privacy-note">Şifreler tek yönlü olarak korunur; açık biçimde saklanmaz.</p>
        </div>
      </section>
    </main>
  );
}

function Dashboard({
  profile,
  apiFetch,
  onProfile,
  onSignOut,
}: {
  profile: Profile;
  apiFetch: <T>(path: string, init?: RequestInit) => Promise<T>;
  onProfile: (profile: Profile) => void;
  onSignOut: () => void;
}) {
  const [view, setView] = useState<View>("journey");
  const [universe, setUniverse] = useState<Universe>("mcu");
  const [format, setFormat] = useState<"all" | ContentType>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [groups, setGroups] = useState<WatchGroup[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [undoAction, setUndoAction] = useState<{ item: CatalogItem; previousUnits: number } | null>(null);

  const showToast = useCallback((message: string) => {
    setUndoAction(null);
    setToast(message);
  }, []);

  const reloadSocial = useCallback(async () => {
    const [groupData, peopleData] = await Promise.all([
      apiFetch<{ groups: WatchGroup[] }>("/api/groups"),
      apiFetch<{ people: Person[] }>("/api/discover"),
    ]);
    setGroups(groupData.groups);
    setPeople(peopleData.people);
  }, [apiFetch]);

  useEffect(() => {
    let active = true;
    Promise.all([
      apiFetch<{ progress: ProgressRow[] }>("/api/progress"),
      apiFetch<{ groups: WatchGroup[] }>("/api/groups"),
      apiFetch<{ people: Person[] }>("/api/discover"),
    ])
      .then(([progressData, groupData, peopleData]) => {
        if (!active) return;
        setProgress(Object.fromEntries(progressData.progress.map((row) => [row.contentId, row.completedUnits])));
        setGroups(groupData.groups);
        setPeople(peopleData.people);
      })
      .catch((loadError) => showToast(loadError instanceof Error ? loadError.message : "Veriler yüklenemedi."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [apiFetch, showToast]);

  const releasedCatalog = useMemo(() => catalog.filter((item) => item.availableUnits > 0), []);
  const completedUnits = useMemo(
    () => releasedCatalog.reduce((sum, item) => sum + Math.min(progress[item.id] ?? 0, item.availableUnits), 0),
    [progress, releasedCatalog],
  );
  const totalUnits = useMemo(
    () => releasedCatalog.reduce((sum, item) => sum + item.availableUnits, 0),
    [releasedCatalog],
  );
  const xp = useMemo(
    () => releasedCatalog.reduce((sum, item) => sum + (progress[item.id] ?? 0) * unitXp(item), 0),
    [progress, releasedCatalog],
  );
  const level = Math.floor(xp / 600) + 1;
  const levelProgress = xp % 600;
  const rank = rankNames[Math.min(level - 1, rankNames.length - 1)];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    return catalog
      .filter((item) => item.universes.includes(universe))
      .filter((item) => item.availableUnits < 1 || (progress[item.id] ?? 0) < item.availableUnits)
      .filter((item) => format === "all" || item.type === format)
      .filter((item) => !normalized || `${item.title} ${item.story}`.toLocaleLowerCase("tr-TR").includes(normalized))
      .sort((a, b) => (a.orderByUniverse[universe] ?? 9999) - (b.orderByUniverse[universe] ?? 9999));
  }, [format, progress, query, universe]);

  const visible = expanded || query || format !== "all" ? filtered : filtered.slice(0, 12);
  const nextItem = filtered.find((item) => item.availableUnits > 0 && (progress[item.id] ?? 0) < item.availableUnits);
  const completedCatalog = useMemo(
    () => releasedCatalog
      .filter((item) => (progress[item.id] ?? 0) >= item.availableUnits)
      .sort((a, b) => a.title.localeCompare(b.title, "tr")),
    [progress, releasedCatalog],
  );

  async function changeProgress(item: CatalogItem, finish = false) {
    if (!item.availableUnits) return;
    const current = progress[item.id] ?? 0;
    const completedUnits = current >= item.availableUnits ? 0 : finish ? item.availableUnits : Math.min(item.availableUnits, current + 1);
    setProgress((previous) => ({ ...previous, [item.id]: completedUnits }));
    try {
      await apiFetch("/api/progress", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ contentId: item.id, completedUnits }),
      });
      const gained = Math.max(0, completedUnits - current) * unitXp(item);
      if (completedUnits >= item.availableUnits) {
        setUndoAction({ item, previousUnits: current });
        setToast(`${item.title} tamamlandı · listeden kaldırıldı · +${gained} XP`);
      } else {
        showToast(completedUnits === 0 ? `${item.title} ilerlemeden çıkarıldı.` : `${item.title} ilerledi · +${gained} XP`);
      }
    } catch (updateError) {
      setProgress((previous) => ({ ...previous, [item.id]: current }));
      showToast(updateError instanceof Error ? updateError.message : "İlerleme kaydedilemedi.");
    }
  }

  async function undoLastCompletion() {
    const action = undoAction;
    if (!action) return;
    const completedUnits = progress[action.item.id] ?? action.item.availableUnits;
    setUndoAction(null);
    setProgress((previous) => ({ ...previous, [action.item.id]: action.previousUnits }));
    try {
      await apiFetch("/api/progress", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ contentId: action.item.id, completedUnits: action.previousUnits }),
      });
      setToast(`${action.item.title} önceki ilerlemesine geri döndü.`);
    } catch (error) {
      setProgress((previous) => ({ ...previous, [action.item.id]: completedUnits }));
      showToast(error instanceof Error ? error.message : "İşlem geri alınamadı.");
    }
  }

  async function restoreCompleted(item: CatalogItem) {
    const completedUnits = progress[item.id] ?? item.availableUnits;
    setProgress((previous) => ({ ...previous, [item.id]: 0 }));
    try {
      await apiFetch("/api/progress", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ contentId: item.id, completedUnits: 0 }),
      });
      showToast(`${item.title} izleme listesine geri alındı.`);
    } catch (error) {
      setProgress((previous) => ({ ...previous, [item.id]: completedUnits }));
      showToast(error instanceof Error ? error.message : "Yapım listeye geri alınamadı.");
    }
  }

  async function toggleFollow(person: Person) {
    try {
      const result = await apiFetch<{ following: boolean }>("/api/follows", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: person.userId }),
      });
      setPeople((current) => current.map((entry) => entry.userId === person.userId ? { ...entry, following: result.following } : entry));
    } catch (followError) {
      showToast(followError instanceof Error ? followError.message : "Takip işlemi tamamlanamadı.");
    }
  }

  if (loading) {
    return <div className="loading-screen"><ChronicleLogo compact /><p>Yolculuğun yükleniyor…</p></div>;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => setView("journey")}>
          <ChronicleLogo />
        </button>
        <nav aria-label="Ana menü">
          <button className={view === "journey" ? "active" : ""} onClick={() => setView("journey")}>Yolculuk</button>
          <button className={view === "completed" ? "active" : ""} onClick={() => setView("completed")}>İzlenenler <span className="nav-count">{completedCatalog.length}</span></button>
          <button className={view === "groups" ? "active" : ""} onClick={() => setView("groups")}>Gruplar</button>
          <button className={view === "discover" ? "active" : ""} onClick={() => setView("discover")}>Kişiler</button>
        </nav>
        <button className="profile-chip" type="button" onClick={() => setView("profile")}> 
          <HeroAvatarImage avatarId={profile.avatarId} name={profile.displayName} className="small" />
          <span className="profile-chip-copy"><strong>{profile.displayName}</strong><small>@{profile.username}</small></span>
        </button>
      </header>

      <main className="main-content">
        {view === "journey" && (
          <>
            <section className="journey-hero">
              <div className="journey-heading">
                <div><p className="eyebrow">İzleme Yolculuğu</p><h1>Seviye {level} · {rank}</h1></div>
                <div className="xp-copy"><strong>{levelProgress} / 600 XP</strong><small>{600 - levelProgress} XP sonra yeni rütbe</small></div>
              </div>
              <div className="journey-track" role="progressbar" aria-label="Yeni rütbeye ilerleme" aria-valuemin={0} aria-valuemax={600} aria-valuenow={levelProgress}>
                <span style={{ width: `${(levelProgress / 600) * 100}%` }} />
                <i /><i /><i />
              </div>
              <div className="journey-summary">
                <span><strong>{completedUnits}</strong> / {totalUnits} izleme parçası</span>
                <span><strong>{Object.keys(progress).filter((id) => progress[id] > 0).length}</strong> yapımda ilerleme</span>
                <span><strong>{groups.length}</strong> izleme grubu</span>
              </div>
              <div className="achievement-row">
                <span className={completedUnits > 0 ? "earned" : ""}><b>1</b> İlk İz</span>
                <span className={releasedCatalog.some((item) => item.type === "season" && (progress[item.id] ?? 0) >= item.availableUnits) ? "earned" : ""}><b>S</b> Sezon Avcısı</span>
                <span><b>3</b> Üç Evrene Dokun</span>
                <span className="doomsday"><b>◈</b> Doomsday · 18.12.2026</span>
              </div>
            </section>

            <section className="universe-switch" aria-label="Evren seçimi">
              {(Object.keys(universeNames) as Universe[]).map((key) => (
                <button key={key} className={universe === key ? "active" : ""} onClick={() => { setUniverse(key); setExpanded(false); }}>
                  <span>{universeNames[key]}</span>
                  <small>{catalog.filter((item) => item.universes.includes(key) && item.availableUnits > 0).length} yapım</small>
                </button>
              ))}
            </section>

            {nextItem && (
              <section className="next-watch">
                <div className="poster-mini">
                  {posterUrlFor(nextItem.id) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={posterUrlFor(nextItem.id) ?? ""} alt="" loading="eager" />
                  ) : <span>{nextItem.code}</span>}
                </div>
                <div className="next-watch-copy"><p className="eyebrow">Sıradaki Durak</p><h2>{nextItem.title}</h2><span>{nextItem.type === "season" ? `${(progress[nextItem.id] ?? 0) + 1}. bölüm` : formatLabels[nextItem.type]} · {nextItem.story}</span></div>
                <button className="button primary" onClick={() => changeProgress(nextItem)}>{nextItem.type === "season" ? "+1 bölüm" : "İzlendi işaretle"}</button>
              </section>
            )}

            <section className="catalog-section">
              <div className="catalog-tools">
                <div><p className="eyebrow">{universeNames[universe]} · Tam koleksiyon</p><h2>Kronolojik rota</h2></div>
                <div className="tool-fields">
                  <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Film veya dizi ara" aria-label="İçerik ara" />
                  <select value={format} onChange={(event) => setFormat(event.target.value as "all" | ContentType)} aria-label="Format seç">
                    <option value="all">Tüm formatlar</option><option value="film">Filmler</option><option value="season">Diziler</option><option value="special">Özel sunumlar</option><option value="short">Kısa filmler</option>
                  </select>
                </div>
              </div>
              <div className="catalog-grid">
                {visible.map((item) => {
                  const current = progress[item.id] ?? 0;
                  const complete = item.availableUnits > 0 && current >= item.availableUnits;
                  const posterUrl = posterUrlFor(item.id);
                  const platform = platformFor(item.id, item.availableUnits);
                  return (
                    <article className="catalog-item" key={item.id}>
                      <div className={`poster-art universe-${universe} ${complete ? "complete" : ""} ${!item.availableUnits ? "locked" : ""}`}>
                        <div className="archive-poster" aria-label={posterUrl ? undefined : `${item.title} arşiv kapağı`} aria-hidden={posterUrl ? "true" : undefined}>
                          <span>{item.code}</span>
                          <small>Chronicle Archive</small>
                        </div>
                        {posterUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className="poster-image" src={posterUrl} alt={`${item.title} afişi`} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.hidden = true; }} />
                        )}
                        <div className="poster-vignette" />
                        <div className="poster-top"><span>{formatLabels[item.type]}</span><span>{item.releaseYear}</span></div>
                        <div className="poster-caption"><small>{item.story}</small><h3>{item.title}</h3></div>
                      </div>
                      <div className="catalog-copy"><h3>{item.title}</h3><p>{item.type === "season" ? `${current} / ${item.availableUnits} bölüm` : item.story}</p></div>
                      <div className={`platform-line ${platform.includes("değil") || platform === "Yayımlanmadı" ? "unavailable" : ""}`} title="Türkiye kataloğu · Ağustos 2026">
                        <span aria-hidden="true" />
                        <small>Türkiye</small>
                        <strong>{platform}</strong>
                      </div>
                      {item.type === "season" && item.availableUnits > 0 && <div className="episode-track"><span style={{ width: `${(current / item.availableUnits) * 100}%` }} /></div>}
                      <div className="catalog-actions">
                        <button className={`button ${complete ? "secondary" : "primary"}`} disabled={!item.availableUnits} onClick={() => changeProgress(item)}>{!item.availableUnits ? "Kilitli" : complete ? "Tamamlandı" : item.type === "season" ? "+1 bölüm" : "İzlendi"}</button>
                        {item.type === "season" && item.availableUnits > 1 && !complete && <button className="button ghost" onClick={() => changeProgress(item, true)}>Sezonu bitir</button>}
                      </div>
                    </article>
                  );
                })}
                {visible.length === 0 && (
                  <div className="empty-panel catalog-empty">
                    <h3>{query ? "Aramana uyan yapım bulunamadı" : format === "film" ? "Bu rotada bekleyen film kalmadı" : "Bu görünümde bekleyen yapım kalmadı"}</h3>
                    <p>{query ? "Arama ifadesini değiştirip tekrar deneyebilirsin." : "Tamamladığın film ve diziler listeden otomatik olarak kaldırıldı. Başka bir evrene veya formata geçebilirsin."}</p>
                  </div>
                )}
              </div>
              {filtered.length > 12 && !query && format === "all" && <button className="button ghost load-more" onClick={() => setExpanded((value) => !value)}>{expanded ? "İlk 12 yapımı göster" : `Tüm ${filtered.length} yapımı göster`}</button>}
              <p className="media-note">Platform bilgileri Türkiye kataloğu için Ağustos 2026 görünümüdür ve değişebilir. Afiş verileri <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a> kaynaklıdır.</p>
            </section>
          </>
        )}

        {view === "completed" && <CompletedView items={completedCatalog} onRestore={restoreCompleted} />}
        {view === "groups" && <GroupsView groups={groups} apiFetch={apiFetch} onReload={async () => { await reloadSocial(); showToast("Gruplar güncellendi."); }} onToast={showToast} />}
        {view === "discover" && <DiscoverView people={people} onToggle={toggleFollow} />}
        {view === "profile" && <ProfileView profile={profile} groups={groups} people={people} apiFetch={apiFetch} onProfile={onProfile} onSignOut={onSignOut} onToast={showToast} />}
      </main>

      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          {undoAction && <button className="toast-undo" type="button" onClick={undoLastCompletion}>Geri al</button>}
          <button className="toast-close" type="button" onClick={() => { setToast(""); setUndoAction(null); }} aria-label="Bildirimi kapat">×</button>
        </div>
      )}
    </div>
  );
}

function CompletedView({ items, onRestore }: { items: CatalogItem[]; onRestore: (item: CatalogItem) => Promise<void> }) {
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState("");
  const normalized = query.trim().toLocaleLowerCase("tr-TR");
  const visible = items.filter((item) => !normalized || `${item.title} ${item.story}`.toLocaleLowerCase("tr-TR").includes(normalized));

  async function restore(item: CatalogItem) {
    setBusyId(item.id);
    try {
      await onRestore(item);
    } finally {
      setBusyId("");
    }
  }

  return (
    <section className="page-section completed-page">
      <div className="page-heading completed-heading">
        <div><p className="eyebrow">İzleme arşivi</p><h1>Tamamlananlar</h1></div>
        <p>Yanlışlıkla işaretlediğin film veya sezonu buradan tek tek izleme listesine geri koyabilirsin.</p>
      </div>
      <div className="completed-toolbar">
        <div><strong>{items.length}</strong><span>tamamlanan yapım</span></div>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tamamlananlarda ara" aria-label="Tamamlananlarda ara" />
      </div>
      <div className="completed-grid">
        {visible.map((item) => {
          const posterUrl = posterUrlFor(item.id);
          return (
            <article className="completed-card" key={item.id}>
              <div className="completed-poster">
                <span aria-hidden="true">{item.code}</span>
                {posterUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={posterUrl} alt={`${item.title} afişi`} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.hidden = true; }} />
                )}
              </div>
              <div className="completed-copy">
                <div><small>{formatLabels[item.type]} · {item.releaseYear}</small><h2>{item.title}</h2></div>
                <p>{item.universes.map((key) => universeNames[key]).join(" · ")} · {platformFor(item.id, item.availableUnits)}</p>
                <button className="button secondary" type="button" disabled={busyId === item.id} onClick={() => restore(item)}>
                  {busyId === item.id ? "Geri alınıyor…" : "İzleme listesine geri al"}
                </button>
              </div>
            </article>
          );
        })}
        {visible.length === 0 && (
          <div className="empty-panel completed-empty">
            <h3>{query ? "Aramana uyan tamamlanmış yapım yok" : "Henüz tamamlanan yapım yok"}</h3>
            <p>{query ? "Arama ifadesini değiştirip tekrar deneyebilirsin." : "Bitirdiğin yapımlar burada saklanacak ve istediğin zaman geri alınabilecek."}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function GroupsView({ groups, apiFetch, onReload, onToast }: { groups: WatchGroup[]; apiFetch: <T>(path: string, init?: RequestInit) => Promise<T>; onReload: () => Promise<void>; onToast: (value: string) => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(action: "create" | "join", event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      await apiFetch("/api/groups", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(action === "create" ? { action, name, description } : { action, inviteCode }) });
      setName(""); setDescription(""); setInviteCode("");
      await onReload();
    } catch (groupError) {
      onToast(groupError instanceof Error ? groupError.message : "Grup işlemi tamamlanamadı.");
    } finally { setBusy(false); }
  }

  async function removeGroup(group: WatchGroup) {
    const accepted = window.confirm(group.role === "owner" ? `${group.name} grubunu kalıcı olarak silmek istiyor musun?` : `${group.name} grubundan ayrılmak istiyor musun?`);
    if (!accepted) return;
    setBusy(true);
    try {
      await apiFetch("/api/groups", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ groupId: group.id }) });
      await onReload();
      onToast(group.role === "owner" ? "Grup silindi." : "Gruptan ayrıldın.");
    } catch (error) {
      onToast(error instanceof Error ? error.message : "Grup güncellenemedi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading"><div><p className="eyebrow">Birlikte izleyin</p><h1>İzleme grupları</h1></div><p>Maraton kur, davet kodunu paylaş ve aynı rotada ilerleyin.</p></div>
      <div className="group-actions-grid">
        <form className="action-panel" onSubmit={(event) => submit("create", event)}><span className="action-index">01</span><h2>Yeni grup kur</h2><label>Grup adı<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Gece Seansı" required /></label><label>Kısa açıklama<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Cuma geceleri MCU maratonu" /></label><button className="button primary" disabled={busy}>Grubu oluştur</button></form>
        <form className="action-panel" onSubmit={(event) => submit("join", event)}><span className="action-index">02</span><h2>Davet koduyla katıl</h2><p className="muted">Arkadaşının paylaştığı sekiz karakterli kodu gir.</p><label>Davet kodu<input className="invite-input" value={inviteCode} onChange={(event) => setInviteCode(event.target.value.toUpperCase())} placeholder="8F4K2M1Q" required /></label><button className="button secondary" disabled={busy}>Gruba katıl</button></form>
      </div>
      <div className="section-title"><h2>Gruplarım</h2><span>{groups.length} grup</span></div>
      <div className="groups-list">
        {groups.length === 0 && <div className="empty-panel"><h3>Henüz grubun yok</h3><p>İlk grubu kurduğunda üyeler ve davet kodu burada görünecek.</p></div>}
        {groups.map((group) => (
          <article className="group-row" key={group.id}>
            <div className="group-symbol">{initials(group.name)}</div>
            <div className="group-main">
              <div><h3>{group.name}</h3><p>{group.description || "Ortak izleme yolculuğu"} · {group.members.length} üye</p></div>
              <div className="member-stack" aria-label={`${group.members.length} üye`}>
                {group.members.slice(0, 5).map((member) => <HeroAvatarImage key={member.userId} avatarId={member.avatarId} name={member.displayName} className="mini" />)}
              </div>
            </div>
            <div className="group-code">
              <small>Davet kodu</small>
              <button type="button" onClick={() => { navigator.clipboard.writeText(group.inviteCode); onToast("Davet kodu kopyalandı."); }}>{group.inviteCode}</button>
              <button className="group-remove" type="button" disabled={busy} onClick={() => removeGroup(group)}>{group.role === "owner" ? "Grubu sil" : "Gruptan ayrıl"}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DiscoverView({ people, onToggle }: { people: Person[]; onToggle: (person: Person) => Promise<void> }) {
  const [query, setQuery] = useState("");
  const visible = people.filter((person) => `${person.displayName} ${person.username}`.toLocaleLowerCase("tr-TR").includes(query.toLocaleLowerCase("tr-TR")));
  return (
    <section className="page-section"><div className="page-heading"><div><p className="eyebrow">Topluluk</p><h1>Arkadaşlarını bul</h1></div><input className="people-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kullanıcı adı ara" /></div><div className="people-list">{visible.length === 0 && <div className="empty-panel"><h3>Henüz başka kullanıcı yok</h3><p>Arkadaşların kayıt olduğunda burada görünecek.</p></div>}{visible.map((person) => <article className="person-row" key={person.userId}><HeroAvatarImage avatarId={person.avatarId} name={person.displayName} /><div><h3>{person.displayName}</h3><p>@{person.username}{person.bio ? ` · ${person.bio}` : ""}</p></div><button className={`button ${person.following ? "secondary" : "primary"}`} onClick={() => onToggle(person)}>{person.following ? "Takip ediliyor" : "Takip et"}</button></article>)}</div></section>
  );
}

function ProfileView({ profile, groups, people, apiFetch, onProfile, onSignOut, onToast }: { profile: Profile; groups: WatchGroup[]; people: Person[]; apiFetch: <T>(path: string, init?: RequestInit) => Promise<T>; onProfile: (profile: Profile) => void; onSignOut: () => void; onToast: (value: string) => void }) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio);
  const [avatarId, setAvatarId] = useState(profile.avatarId);

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const result = await apiFetch<{ profile: Profile }>("/api/me", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: profile.username, displayName, bio, avatarId }),
      });
      onProfile(result.profile);
      onToast("Profil ve kahraman figürün güncellendi.");
    } catch (error) {
      onToast(error instanceof Error ? error.message : "Profil güncellenemedi.");
    }
  }

  return (
    <section className="page-section">
      <div className="profile-hero">
        <HeroAvatarImage avatarId={avatarId} name={displayName || profile.displayName} className="huge" />
        <div><p className="eyebrow">Chronicle profili</p><h1>{displayName || profile.displayName}</h1><p>@{profile.username} · {profile.email}</p></div>
        <button className="button ghost" onClick={onSignOut}>Çıkış yap</button>
      </div>
      <div className="profile-stats"><span><strong>{people.filter((person) => person.following).length}</strong> takip</span><span><strong>{groups.length}</strong> grup</span><span><strong>3</strong> evren</span></div>
      <form className="profile-form" onSubmit={submit}>
        <div><p className="eyebrow">Profil figürü</p><h2>Kahramanını seç</h2><p className="muted avatar-intro">MCU, X-Men ve Fantastic Four kadrosundan profilinde görünecek figürü seç.</p></div>
        <div className="avatar-roster">
          {(["MCU", "X-Men", "Fantastic Four"] as const).map((universeName) => (
            <fieldset key={universeName}>
              <legend>{universeName}</legend>
              <div className="avatar-picker-grid">
                {heroAvatars.filter((avatar) => avatar.universe === universeName).map((avatar) => (
                  <button className={avatarId === avatar.id ? "selected" : ""} type="button" key={avatar.id} aria-label={`${avatar.name} profil figürünü seç`} aria-pressed={avatarId === avatar.id} onClick={() => setAvatarId(avatar.id)}>
                    <HeroAvatarImage avatarId={avatar.id} name={avatar.name} className="picker" />
                    <span>{avatar.name}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <label>Görünen ad<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} /></label>
        <label>Biyografi<textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={160} placeholder="İzleme tarzını birkaç kelimeyle anlat" /></label>
        <button className="button primary">Değişiklikleri kaydet</button>
      </form>
    </section>
  );
}

export default function ChronicleApp() {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    fetch("/api/me", { credentials: "same-origin" })
      .then(async (response) => response.ok ? response.json() as Promise<{ profile: Profile | null }> : { profile: null })
      .then((data) => active && setProfile(data.profile))
      .catch(() => active && setProfile(null));
    return () => { active = false; };
  }, []);

  const apiFetch = useCallback(async <T,>(path: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(path, { ...init, credentials: "same-origin" });
    const payload = await response.json() as T & { error?: string };
    if (response.status === 401) setProfile(null);
    if (!response.ok) throw new Error(payload.error ?? "İşlem tamamlanamadı.");
    return payload;
  }, []);

  async function signOut() {
    await fetch("/api/auth", { method: "DELETE", credentials: "same-origin" });
    setProfile(null);
  }

  if (profile === undefined) return <div className="loading-screen"><ChronicleLogo compact /><p>Profilin açılıyor…</p></div>;
  if (!profile) return <AuthShell onAuthenticated={setProfile} />;

  return <Dashboard profile={profile} apiFetch={apiFetch} onProfile={setProfile} onSignOut={signOut} />;
}
