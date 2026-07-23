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

type OpportunityType = "Paid gigs" | "Auditions" | "Hire pros" | "Mentors";

type Opportunity = {
  type: OpportunityType;
  title: string;
  owner: string;
  meta: string;
  reward: string;
  tags: string[];
  verified: string;
  deadline: string;
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
const locations = ["London", "Manchester", "Brighton", "Bristol", "Worldwide / remote"];
const goals = [
  "Join a band",
  "Start a project",
  "Remote collaboration",
  "Find paid work",
  "Hire a music pro",
  "Find a mentor",
];

const opportunityTypes: OpportunityType[] = ["Paid gigs", "Auditions", "Hire pros", "Mentors"];

const opportunities: Opportunity[] = [
  {
    type: "Paid gigs",
    title: "Indie support slot · 500-cap room",
    owner: "Northline Presents",
    meta: "London · 12 September",
    reward: "£650 guarantee",
    tags: ["Indie", "Originals", "Live"],
    verified: "Promoter verified",
    deadline: "Closes in 6 days",
  },
  {
    type: "Paid gigs",
    title: "Remote guitar session for alt-pop single",
    owner: "Sofia R.",
    meta: "Remote · stems supplied",
    reward: "£240 fixed",
    tags: ["Guitar", "Alt pop", "Remote"],
    verified: "Payment protected",
    deadline: "3 proposals",
  },
  {
    type: "Auditions",
    title: "Bassist for release-ready post-punk band",
    owner: "Static Bloom",
    meta: "Manchester · weekly rehearsal",
    reward: "Equal member",
    tags: ["Bass", "Post-punk", "Touring"],
    verified: "ID + credits checked",
    deadline: "Auditions 2–4 Aug",
  },
  {
    type: "Auditions",
    title: "Vocalist for electronic live project",
    owner: "Night Circuit",
    meta: "Berlin / remote · flexible",
    reward: "Fee + royalty split",
    tags: ["Vocals", "Electronic", "EU"],
    verified: "Split terms posted",
    deadline: "12 applicants",
  },
  {
    type: "Hire pros",
    title: "Mix engineer · cinematic alternative",
    owner: "Nadia Okafor",
    meta: "96 verified projects · 4.9 ★",
    reward: "From £320",
    tags: ["Mixing", "Atmospheric", "Dolby"],
    verified: "Credits verified",
    deadline: "Replies in 2 hours",
  },
  {
    type: "Hire pros",
    title: "Live photographer + vertical content",
    owner: "Leo Martins",
    meta: "UK / EU travel · 41 reviews",
    reward: "From £450",
    tags: ["Photo", "Video", "Tour"],
    verified: "Insured pro",
    deadline: "Next free: 18 Aug",
  },
  {
    type: "Mentors",
    title: "A&R office hours · positioning your release",
    owner: "Imani Cole",
    meta: "Former indie label A&R · remote",
    reward: "£45 / 45 min",
    tags: ["A&R", "Strategy", "Feedback"],
    verified: "Career verified",
    deadline: "4 slots this week",
  },
  {
    type: "Mentors",
    title: "Tour planning clinic for first-time artists",
    owner: "Marek Nowak",
    meta: "EU agent · group session",
    reward: "Free community clinic",
    tags: ["Touring", "Routing", "Budget"],
    verified: "Partner host",
    deadline: "Live on Thursday",
  },
];

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
  const [opportunityType, setOpportunityType] = useState<OpportunityType>("Paid gigs");
  const [applied, setApplied] = useState<string[]>([]);
  const [workspaceTab, setWorkspaceTab] = useState<"Tracks" | "Comments" | "Tasks" | "Rights" | "Release">("Tracks");
  const [taskDone, setTaskDone] = useState<number[]>([0]);
  const [comment, setComment] = useState("");
  const [commentSent, setCommentSent] = useState(false);
  const [releaseStep, setReleaseStep] = useState(3);
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

  const visibleOpportunities = opportunities.filter((item) => item.type === opportunityType);

  const toggleApplied = (title: string) => {
    setApplied((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
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
            <a href="#opportunities">Opportunities</a>
            <a href="#studio">Studio</a>
            <a href="#release">Release</a>
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
            Meet musicians nearby or worldwide, audition by sound, manage the
            work and take every collaboration from first spark to release.
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
        <a className="space space-green" href="#opportunities">
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

      <section className="opportunities-section" id="opportunities">
        <div className="section-heading">
          <div>
            <p className="kicker green">Work / Opportunities</p>
            <h2>Find the next move—not another dead-end post.</h2>
          </div>
          <button className="button button-outline" type="button" onClick={() => setShowJoin(true)}>
            Post an opportunity <span>↗</span>
          </button>
        </div>

        <div className="opportunity-toolbar">
          <div className="opportunity-tabs" role="tablist" aria-label="Opportunity type">
            {opportunityTypes.map((type) => (
              <button
                type="button"
                role="tab"
                aria-selected={opportunityType === type}
                className={opportunityType === type ? "active" : ""}
                key={type}
                onClick={() => setOpportunityType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="opportunity-filters" aria-label="Active opportunity filters">
            <span>◎ Anywhere</span>
            <span>Verified only</span>
            <span>Best match</span>
          </div>
        </div>

        <div className="opportunity-grid">
          {visibleOpportunities.map((item, index) => {
            const hasApplied = applied.includes(item.title);
            return (
              <article className="opportunity-card" key={item.title}>
                <div className="opportunity-card-top">
                  <span className={`opportunity-mark mark-${index + 1}`}>{item.type === "Hire pros" ? "PRO" : item.type === "Mentors" ? "1:1" : "LIVE"}</span>
                  <span className="verified-pill">✓ {item.verified}</span>
                </div>
                <p className="opportunity-owner">{item.owner}</p>
                <h3>{item.title}</h3>
                <p className="opportunity-meta">{item.meta}</p>
                <div className="tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="opportunity-footer">
                  <div>
                    <strong>{item.reward}</strong>
                    <small>{item.deadline}</small>
                  </div>
                  <button
                    type="button"
                    className={hasApplied ? "is-applied" : ""}
                    onClick={() => toggleApplied(item.title)}
                  >
                    {hasApplied ? "✓ Added" : opportunityType === "Hire pros" ? "Request quote" : opportunityType === "Mentors" ? "Book slot" : "Apply"} <span>↗</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="marketplace-assurance">
          <span><i>01</i><strong>Clear terms</strong><small>Fee, royalty, credit or skill exchange shown up front.</small></span>
          <span><i>02</i><strong>Safe agreements</strong><small>Proposals, milestones, revisions and delivery stay in one workroom.</small></span>
          <span><i>03</i><strong>Protected pay</strong><small>Funds release only when the agreed milestone is approved.</small></span>
          <span><i>04</i><strong>Real reputation</strong><small>Only completed work creates verified reviews and credits.</small></span>
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
            <div className="workspace-tabs" role="tablist" aria-label="Project workspace">
              {(["Tracks", "Comments", "Tasks", "Rights", "Release"] as const).map((tab) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={workspaceTab === tab}
                  className={workspaceTab === tab ? "active" : ""}
                  onClick={() => setWorkspaceTab(tab)}
                  key={tab}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="workspace-panel">
              {workspaceTab === "Tracks" && (
                <>
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
                  <button className="button invite-button" type="button" onClick={() => setShowJoin(true)}>
                    Upload stems or invite a player <span>↗</span>
                  </button>
                </>
              )}

              {workspaceTab === "Comments" && (
                <div className="comments-panel">
                  <div className="timeline-comments" aria-label="Time-coded feedback">
                    <span style={{ left: "18%" }}>0:27</span>
                    <span style={{ left: "53%" }}>1:18</span>
                    <span style={{ left: "81%" }}>2:41</span>
                  </div>
                  <article><i>0:27</i><div><strong>Maya</strong><p>Can the bass answer the vocal here, then leave the downbeat open?</p></div><span>2 replies</span></article>
                  <article><i>1:18</i><div><strong>Alex</strong><p>New guitar texture is in V04. A/B it against V03.</p></div><span>Resolved ✓</span></article>
                  {commentSent && <article><i>Now</i><div><strong>You</strong><p>{comment || "Listening now — I’ll add a take tonight."}</p></div><span>Sent</span></article>}
                  <form onSubmit={(event) => { event.preventDefault(); setCommentSent(true); }}>
                    <input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add feedback at 2:41…" />
                    <button type="submit">Send ↗</button>
                  </form>
                </div>
              )}

              {workspaceTab === "Tasks" && (
                <div className="task-panel">
                  {[
                    ["Approve V04 vocal comp", "Maya", "Today"],
                    ["Upload clean bass DI", "Open role", "Friday"],
                    ["Confirm August studio date", "Everyone", "6 Aug"],
                    ["Prepare final mix notes", "Sofia", "After bass"],
                  ].map(([task, owner, due], index) => {
                    const done = taskDone.includes(index);
                    return (
                      <button
                        type="button"
                        className={done ? "done" : ""}
                        onClick={() => setTaskDone((current) => done ? current.filter((item) => item !== index) : [...current, index])}
                        key={task}
                      >
                        <i>{done ? "✓" : ""}</i><strong>{task}</strong><span>{owner}</span><small>{due}</small>
                      </button>
                    );
                  })}
                  <div className="session-row"><span>◉ Group video room</span><strong>Soundcheck · Thu 19:30 BST</strong><button type="button">Join room ↗</button></div>
                </div>
              )}

              {workspaceTab === "Rights" && (
                <div className="rights-panel rights-panel-expanded">
                  <div>
                    <span>Agreed composition split</span>
                    <strong>{studioMode === "pro" ? "4 / 4 signed" : "Upgrade to e-sign"}</strong>
                  </div>
                  <div className="split-bar" aria-label="Rights split: Maya 40%, Alex 25%, Sofia 20%, Jamie 15%">
                    <i style={{ width: "40%" }} />
                    <i style={{ width: "25%" }} />
                    <i style={{ width: "20%" }} />
                    <i style={{ width: "15%" }} />
                  </div>
                  <div className="split-legend">
                    <span><i /> Maya · writer<strong>40%</strong></span>
                    <span><i /> Alex · writer<strong>25%</strong></span>
                    <span><i /> Sofia · writer / producer<strong>20%</strong></span>
                    <span><i /> Jamie · performer<strong>15%</strong></span>
                  </div>
                  <div className="metadata-row">
                    <span>✓ Legal names &amp; roles</span><span>✓ PRO / IPI details</span><span>✓ Master ownership</span><span>ISRC on release</span>
                  </div>
                  <small>Versioned split sheet and credits travel with the release. Fusehit takes no ownership.</small>
                </div>
              )}

              {workspaceTab === "Release" && (
                <div className="release-panel">
                  {["Final files", "Credits & splits", "Mastering", "Distribution", "Campaign", "Analytics"].map((step, index) => (
                    <button
                      type="button"
                      className={index < releaseStep ? "complete" : index === releaseStep ? "active" : ""}
                      onClick={() => setReleaseStep(index)}
                      key={step}
                    >
                      <i>{index < releaseStep ? "✓" : index + 1}</i>
                      <span><strong>{step}</strong><small>{index < releaseStep ? "Ready" : index === releaseStep ? "In progress" : "Next"}</small></span>
                    </button>
                  ))}
                  <div className="release-action">
                    <span><small>Next action</small><strong>{["Approve master files", "Collect final signatures", "Book mastering review", "Choose stores & release date", "Build EPK + pre-save", "Connect live insights"][releaseStep]}</strong></span>
                    <button type="button" onClick={() => setReleaseStep((current) => Math.min(5, current + 1))}>Continue ↗</button>
                  </div>
                </div>
              )}
            </div>
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

      <section className="career-section" id="release">
        <div className="career-heading">
          <p className="kicker blue">Career / Control room</p>
          <h2>One home for the whole journey.</h2>
          <p>
            Discovery is only the first mile. Fusehit connects the conversations,
            agreements, release work and audience signals that usually live in
            five different apps.
          </p>
        </div>
        <div className="career-grid">
          <article className="career-card career-comms">
            <span className="card-number">01 / Coordinate</span>
            <h3>Inbox, sessions and decisions.</h3>
            <div className="message-stack">
              <p><i>SR</i><span><strong>Sofia</strong>V04 vocals are ready for notes.</span><small>2m</small></p>
              <p><i>NC</i><span><strong>Night Circuit</strong>Audition moved to video room.</span><small>1h</small></p>
              <p><i>FH</i><span><strong>Fusehit</strong>Your split sheet is fully signed.</span><small>Now</small></p>
            </div>
            <div className="feature-chips"><span>Direct + group chat</span><span>Video rooms</span><span>Calendar sync</span><span>Smart notifications</span></div>
          </article>

          <article className="career-card career-business">
            <span className="card-number">02 / Work safely</span>
            <h3>From proposal to paid.</h3>
            <div className="milestone-box">
              <div><span>Mixing · Midnight Drive</span><strong>£320 funded</strong></div>
              <div className="milestone-track"><i /><i /><i /></div>
              <ol><li className="complete">Proposal agreed</li><li className="active">Revision 1</li><li>Approve &amp; release</li></ol>
            </div>
            <div className="feature-chips"><span>Scope + revisions</span><span>Milestone pay</span><span>Dispute support</span><span>Verified reviews</span></div>
          </article>

          <article className="career-card career-release">
            <span className="card-number">03 / Release</span>
            <h3>Credits that travel with the music.</h3>
            <div className="release-ticket">
              <p><span>Single</span><strong>Midnight Drive</strong></p>
              <ul><li>✓ Credits complete</li><li>✓ Splits signed</li><li>✓ Master approved</li><li>○ Store delivery</li></ul>
              <div><span>UPC pending</span><span>ISRC at delivery</span><span>Release: 18 Oct</span></div>
            </div>
            <div className="feature-chips"><span>Metadata</span><span>Split sheets</span><span>Mastering</span><span>Distribution handoff</span></div>
          </article>

          <article className="career-card career-growth">
            <span className="card-number">04 / Grow</span>
            <h3>Turn every release into momentum.</h3>
            <div className="growth-chart" aria-label="Audience growth preview">
              {[22, 31, 26, 46, 42, 67, 78, 92].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
            </div>
            <div className="growth-stats"><span><strong>18.4k</strong> listeners</span><span><strong>6.8%</strong> save rate</span><span><strong>12</strong> opportunities</span></div>
            <div className="feature-chips"><span>EPK + smart links</span><span>Pre-save</span><span>Audience insights</span><span>Showcase submissions</span></div>
          </article>
        </div>
        <div className="global-bar">
          <span><strong>Global by default</strong> Local radius or remote</span>
          <span>Timezone-aware sessions</span>
          <span>Language-ready profiles</span>
          <span>Local currency display</span>
          <span>Report · block · moderation</span>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="how-copy">
          <p className="kicker blue">How it works</p>
          <h2>From first spark<br />to real momentum.</h2>
          <p>Create a sound-led profile in minutes. Fusehit keeps every next step connected after the match.</p>
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
              <h3>Build, agree and release</h3>
              <p>Capture versions, gather feedback, sign splits, pay contributors and take the strongest project On Stage.</p>
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
            Build a live EPK, submit to verified gigs and challenges, collect
            audience feedback, and turn the strongest collaborations into
            shows, placements and industry introductions.
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
          <a href="#opportunities">Opportunities</a>
          <a href="#studio">Studio</a>
          <a href="#release">Release</a>
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
