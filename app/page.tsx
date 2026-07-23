"use client";

import { type CSSProperties, useMemo, useState } from "react";
import { HERO_IMAGE, PROFILE_IMAGE, PROJECT_IMAGE } from "./assets";

type Musician = {
  name: string;
  role: string;
  location: string;
  genres: string[];
  match: number;
  image: string;
  accent: "blue" | "red" | "green";
  audio: string;
};

const musicians: Musician[] = [
  {
    name: "Alex N.",
    role: "Guitarist · Songwriter",
    location: "London · 2.4 miles",
    genres: ["Alt rock", "Indie", "Blues"],
    match: 96,
    image: PROFILE_IMAGE,
    accent: "blue",
    audio: "Midnight riff",
  },
  {
    name: "Sofia R.",
    role: "Vocalist · Producer",
    location: "Manchester · Remote",
    genres: ["Art pop", "Soul", "Electronic"],
    match: 91,
    image: HERO_IMAGE,
    accent: "red",
    audio: "Vocal idea 03",
  },
  {
    name: "Jamie T.",
    role: "Drummer · Percussion",
    location: "Brighton · 4.1 miles",
    genres: ["Indie", "Funk", "Post-punk"],
    match: 88,
    image: PROJECT_IMAGE,
    accent: "green",
    audio: "Live room take",
  },
];

const instruments = ["Guitar", "Vocals", "Drums", "Bass", "Keys", "Producer"];
const locations = ["London", "Manchester", "Brighton", "Bristol", "Anywhere"];
const goals = ["Join a band", "Start a project", "Remote collaboration", "Find gigs"];

function Waveform({ active }: { active: boolean }) {
  const bars = [8, 18, 12, 25, 16, 30, 20, 12, 27, 17, 32, 21, 14, 26, 10, 18, 7];
  return (
    <span className={`waveform ${active ? "is-playing" : ""}`} aria-hidden="true">
      {bars.map((height, index) => (
        <i key={index} style={{ height }} />
      ))}
    </span>
  );
}

export default function Home() {
  const [instrument, setInstrument] = useState("Guitar");
  const [location, setLocation] = useState("London");
  const [goal, setGoal] = useState("Join a band");
  const [playing, setPlaying] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [studioMode, setStudioMode] = useState<"studio" | "pro">("studio");
  const [showJoin, setShowJoin] = useState(false);
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState("");

  const searchSummary = useMemo(
    () => `${instrument} · ${location} · ${goal}`,
    [instrument, location, goal],
  );
  const heroStyle = {
    "--hero-image": `url("${HERO_IMAGE}")`,
  } as CSSProperties;

  const toggleSaved = (name: string) => {
    setSaved((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  return (
    <main>
      <section className="hero-shell" id="discover" style={heroStyle}>
        <header className="site-header">
          <a className="wordmark" href="#discover" aria-label="Fusehit home">
            FUSE<span>HIT</span><i />
          </a>
          <nav aria-label="Primary navigation">
            <a className="active" href="#discover">Discover</a>
            <a href="#studio">Studio</a>
            <a href="#collaborate">Collaborate</a>
            <a href="#how-it-works">How it works</a>
          </nav>
          <div className="header-actions">
            <button className="text-button" type="button" onClick={() => setShowJoin(true)}>Log in</button>
            <button className="button button-small button-blue" type="button" onClick={() => setShowJoin(true)}>Start free</button>
          </div>
        </header>

        <div className="hero-content">
          <p className="eyebrow"><span /> Built for the music you haven&apos;t made yet</p>
          <h1>Find your sound.<br />Build something <em>original.</em></h1>
          <p className="hero-copy">
            Meet musicians nearby or worldwide, audition by sound, and turn
            first sparks into finished tracks.
          </p>
          <div className="hero-actions">
            <a className="button button-blue" href="#matches">
              Find musicians <span>↗</span>
            </a>
            <a className="button button-outline" href="#studio">
              Start a project <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="discovery-panel" aria-label="Find musicians">
        <div className="search-field">
          <label htmlFor="instrument">Instrument</label>
          <select id="instrument" value={instrument} onChange={(event) => setInstrument(event.target.value)}>
            {instruments.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="search-field">
          <label htmlFor="location">Location</label>
          <select id="location" value={location} onChange={(event) => setLocation(event.target.value)}>
            {locations.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="search-field">
          <label htmlFor="goal">Goal</label>
          <select id="goal" value={goal} onChange={(event) => setGoal(event.target.value)}>
            {goals.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <button
          className="button button-blue search-button"
          type="button"
          onClick={() => {
            setSearched(true);
            document.querySelector("#matches")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Search &amp; match <span>⌕</span>
        </button>
      </section>

      <section className="space-strip" aria-label="Fusehit spaces">
        <a className="space space-blue" href="#matches">
          <i>●●●</i>
          <span><strong>Lounge</strong><small>Connect. Share. Find your people.</small></span>
          <b>↗</b>
        </a>
        <a className="space space-red" href="#studio">
          <i>◉</i>
          <span><strong>Studio</strong><small>Create. Record. Finish tracks.</small></span>
          <b>↗</b>
        </a>
        <a className="space space-green" href="#how-it-works">
          <i>▰</i>
          <span><strong>On Stage</strong><small>Get exposed. Play live. Be heard.</small></span>
          <b>↗</b>
        </a>
      </section>

      <section className="matches-section" id="matches">
        <div className="section-heading">
          <div>
            <p className="kicker blue">Community / Lounge</p>
            <h2>{searched ? `Matches for ${searchSummary}` : "Musicians who fit your sound"}</h2>
          </div>
          <a href="#matches">View all 247 <span>↗</span></a>
        </div>

        <div className="musician-grid">
          {musicians.map((musician) => {
            const isPlaying = playing === musician.name;
            const isSaved = saved.includes(musician.name);
            return (
              <article className={`musician-card accent-${musician.accent}`} key={musician.name}>
                <div className="profile-image">
                  <img src={musician.image} alt={`${musician.name}, ${musician.role}`} />
                  <span className="match-score">{musician.match}% match</span>
                  <button
                    type="button"
                    className={`save-button ${isSaved ? "is-saved" : ""}`}
                    onClick={() => toggleSaved(musician.name)}
                    aria-label={`${isSaved ? "Remove" : "Save"} ${musician.name}`}
                  >
                    {isSaved ? "♥" : "♡"}
                  </button>
                </div>
                <div className="profile-content">
                  <div className="profile-title">
                    <div>
                      <h3>{musician.name} <span className="online-dot" /></h3>
                      <p>{musician.role}</p>
                    </div>
                    <button className="more-button" type="button" aria-label={`More about ${musician.name}`}>•••</button>
                  </div>
                  <p className="location">⌖ {musician.location}</p>
                  <div className="tags">
                    {musician.genres.map((genre) => <span key={genre}>{genre}</span>)}
                  </div>
                  <button
                    className="audio-player"
                    type="button"
                    onClick={() => setPlaying(isPlaying ? null : musician.name)}
                    aria-label={`${isPlaying ? "Pause" : "Play"} ${musician.audio}`}
                  >
                    <i className="play-icon">{isPlaying ? "Ⅱ" : "▶"}</i>
                    <span className="audio-name">{musician.audio}</span>
                    <Waveform active={isPlaying} />
                    <small>0:{musician.match % 30 + 20}</small>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="studio-section" id="studio">
        <div className="studio-intro">
          <p className="kicker red">Creation / Studio</p>
          <h2>A classified ad finds a player.<br /><em>Fusehit helps you make the record.</em></h2>
          <p>
            Open a private or public workspace, audition ideas in context, keep
            every version, and invite exactly the people your project needs.
          </p>
          <div className="mode-switch" aria-label="Studio mode">
            <button
              type="button"
              className={studioMode === "studio" ? "active" : ""}
              onClick={() => setStudioMode("studio")}
            >
              Studio
            </button>
            <button
              type="button"
              className={studioMode === "pro" ? "active" : ""}
              onClick={() => setStudioMode("pro")}
            >
              Studio Pro
            </button>
          </div>
        </div>

        <div className="project-workspace">
          <div className="project-visual">
            <img src={PROJECT_IMAGE} alt="Musicians collaborating on Midnight Drive in a recording studio" />
            <div className="project-status"><i /> Open for contribution</div>
            <div className="project-caption">
              <span>Now playing</span>
              <strong>Midnight Drive · Version 4</strong>
              <button type="button" aria-label="Play Midnight Drive" onClick={() => setPlaying(playing === "project" ? null : "project")}>
                {playing === "project" ? "Ⅱ" : "▶"}
              </button>
            </div>
          </div>
          <div className="project-detail">
            <div className="project-topline">
              <div>
                <p className="kicker red">{studioMode === "pro" ? "Studio Pro workspace" : "Live project workspace"}</p>
                <h3>Midnight Drive</h3>
              </div>
              <span className="project-count">4 / 5 members</span>
            </div>
            <p className="project-description">
              Cinematic alternative rock. Bass player wanted for a committed
              remote collaboration, with London sessions planned monthly.
            </p>
            <div className="version-list">
              {[
                ["04", "Vocal arrangement", "Sofia · 2h ago"],
                ["03", "Guitar textures", "Alex · yesterday"],
                ["02", "Drum room take", "Jamie · 3 days ago"],
                ["01", "Original demo", "Maya · 8 days ago"],
              ].map(([version, title, meta], index) => (
                <button type="button" className={index === 0 ? "active" : ""} key={version}>
                  <span>V{version}</span>
                  <strong>{title}</strong>
                  <small>{meta}</small>
                  <i>{index === 0 ? "▶" : "↗"}</i>
                </button>
              ))}
            </div>
            {studioMode === "pro" ? (
              <div className="rights-panel">
                <div>
                  <span>Agreed rights split</span>
                  <strong>Transparent from day one</strong>
                </div>
                <div className="split-bar" aria-label="Rights split: Maya 40%, Alex 25%, Sofia 20%, Jamie 15%">
                  <i style={{ width: "40%" }} />
                  <i style={{ width: "25%" }} />
                  <i style={{ width: "20%" }} />
                  <i style={{ width: "15%" }} />
                </div>
                <small>Creators keep control. Fusehit takes no ownership.</small>
              </div>
            ) : (
              <button className="button invite-button" type="button" onClick={() => setShowJoin(true)}>
                Request to contribute <span>↗</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="difference-section" id="collaborate">
        <div className="section-heading">
          <div>
            <p className="kicker green">Why Fusehit</p>
            <h2>Meet on chemistry, not keywords.</h2>
          </div>
          <p className="section-description">
            Local discovery when you want a rehearsal room. A shared creative
            space when the right person lives further away.
          </p>
        </div>
        <div className="difference-grid">
          <article className="difference-card feature-card">
            <span className="card-number">01</span>
            <div className="match-orbit" aria-hidden="true">
              <span>96%</span>
              <i />
              <i />
              <i />
            </div>
            <div>
              <p className="kicker blue">Smart matching</p>
              <h3>Ambition matters as much as genre.</h3>
              <p>Match on sound, influences, skill, availability, distance and what success means to you.</p>
            </div>
          </article>
          <article className="difference-card audio-card">
            <span className="card-number">02</span>
            <div className="mini-player">
              <button type="button" aria-label="Play audio profile" onClick={() => setPlaying(playing === "mini" ? null : "mini")}>
                {playing === "mini" ? "Ⅱ" : "▶"}
              </button>
              <Waveform active={playing === "mini"} />
              <small>0:31</small>
            </div>
            <div>
              <p className="kicker red">Audio first</p>
              <h3>Hear the person before you message.</h3>
              <p>Every profile leads with real playing, not a wall of classified text.</p>
            </div>
          </article>
          <article className="difference-card trust-card">
            <span className="card-number">03</span>
            <div className="trust-stack" aria-hidden="true">
              <span>✓ ID checked</span>
              <span>✓ References</span>
              <span>✓ Active this week</span>
            </div>
            <div>
              <p className="kicker green">Better signals</p>
              <h3>Know who is serious.</h3>
              <p>Clear availability, response rates and optional verification reduce dead-end conversations.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="how-copy">
          <p className="kicker blue">How it works</p>
          <h2>From first spark<br />to first show.</h2>
          <p>Create a sound-led profile in minutes. Fusehit does the hard work of finding people who fit.</p>
          <button className="button button-blue" type="button" onClick={() => setShowJoin(true)}>
            Create your profile <span>↗</span>
          </button>
        </div>
        <ol className="steps-list">
          <li>
            <span>01</span>
            <div>
              <h3>Show, don&apos;t just tell</h3>
              <p>Add short clips, influences, availability and the kind of project you want.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Match and audition</h3>
              <p>Listen, shortlist and exchange an idea before arranging a rehearsal.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Build it in Studio</h3>
              <p>Capture versions, invite contributors and take the strongest project On Stage.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="onstage-section">
        <div className="onstage-art" aria-hidden="true">
          <span>FUSEHIT</span>
          <span>ON STAGE</span>
          <span>FUSEHIT</span>
        </div>
        <div className="onstage-copy">
          <p className="kicker green">Exposure / On Stage</p>
          <h2>Don&apos;t wait to be discovered.<br />Put the work where people listen.</h2>
          <p>
            Monthly community showcases turn the strongest collaborations into
            live opportunities, audience feedback and industry introductions.
          </p>
          <div className="onstage-stats">
            <span><strong>128</strong> projects live now</span>
            <span><strong>42</strong> cities represented</span>
            <span><strong>18k</strong> listener votes</span>
          </div>
        </div>
      </section>

      <section className="join-section" id="join">
        <div>
          <p className="kicker red">The next track starts here</p>
          <h2>Your people are out there.<br />Let&apos;s find them.</h2>
        </div>
        <button className="button join-main-button" type="button" onClick={() => setShowJoin(true)}>
          Start free <span>↗</span>
        </button>
      </section>

      <footer>
        <a className="wordmark" href="#discover" aria-label="Fusehit home">
          FUSE<span>HIT</span><i />
        </a>
        <p>Find your sound. Build something original.</p>
        <div>
          <a href="#discover">Discover</a>
          <a href="#studio">Studio</a>
          <a href="#collaborate">Collaborate</a>
          <a href="#how-it-works">How it works</a>
        </div>
        <small>© 2026 Fusehit · A new kind of music community</small>
      </footer>

      {showJoin && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowJoin(false)}>
          <section
            className="join-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={() => setShowJoin(false)} aria-label="Close">×</button>
            {joined ? (
              <div className="success-message">
                <span>✓</span>
                <p className="kicker green">You&apos;re in</p>
                <h2>Let&apos;s find your sound.</h2>
                <p>We&apos;ve prepared your profile space. The next step is adding a short clip and your influences.</p>
                <button className="button button-blue" type="button" onClick={() => setShowJoin(false)}>Explore Fusehit</button>
              </div>
            ) : (
              <>
                <p className="kicker red">Create your free profile</p>
                <h2 id="join-title">What do you bring to the mix?</h2>
                <p className="modal-intro">Start with the essentials. You can add audio and project details next.</p>
                <form onSubmit={(event) => { event.preventDefault(); setJoined(true); }}>
                  <label>
                    Email address
                    <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
                  </label>
                  <label>
                    I&apos;m joining as
                    <select defaultValue="Musician">
                      <option>Musician</option>
                      <option>Band</option>
                      <option>Producer</option>
                      <option>Industry professional</option>
                    </select>
                  </label>
                  <button className="button button-blue" type="submit">Create my profile <span>↗</span></button>
                  <small>Free to join. No payment details required.</small>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
