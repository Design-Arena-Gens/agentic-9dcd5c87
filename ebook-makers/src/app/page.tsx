"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  DocumentArrowDownIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

type AgentStatus = "idle" | "working" | "done";

type AgentLog = {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  notes: string[];
};

type Chapter = {
  title: string;
  summary: string;
  content: string[];
  spotlight: string;
};

type Ebook = {
  title: string;
  subtitle: string;
  author: string;
  theme: string;
  audience: string;
  positioning: string;
  chapters: Chapter[];
  highlights: string[];
  actionPlan: string[];
  closing: string;
  heroHook: string;
};

const tonePalettes = {
  visionary: {
    label: "Visionary",
    cadence: "sweeping narratives and bold contrasts",
    lexicon: "possibility, transformation, long-view strategy",
  },
  practical: {
    label: "Practical Strategist",
    cadence: "clean structure and actionable breakdowns",
    lexicon: "frameworks, constraints, execution rhythms",
  },
  empathetic: {
    label: "Empathetic Guide",
    cadence: "inviting language with reflective pauses",
    lexicon: "human stories, emotional intelligence, belonging",
  },
  highenergy: {
    label: "High-Energy Coach",
    cadence: "punchy sentences and kinetic pacing",
    lexicon: "momentum, acceleration, performance loops",
  },
} as const;

type ToneKey = keyof typeof tonePalettes;

type FormState = {
  title: string;
  author: string;
  topic: string;
  audience: string;
  tone: ToneKey;
  chapters: number;
  wordsPerChapter: number;
  brief: string;
  includeHighlights: boolean;
  includeActionPlan: boolean;
};

const agentBlueprint: AgentLog[] = [
  {
    id: "discovery",
    name: "Discovery Strategist",
    description:
      "Scans the landscape, extracts trendlines, and assembles raw insight clusters.",
    status: "idle",
    notes: [],
  },
  {
    id: "architecture",
    name: "Narrative Architect",
    description:
      "Converts the insight map into a cinematic chapter-by-chapter flow.",
    status: "idle",
    notes: [],
  },
  {
    id: "weaver",
    name: "Prose Weaver",
    description:
      "Drafts compelling chapters calibrated to the chosen voice and cadence.",
    status: "idle",
    notes: [],
  },
  {
    id: "editorial",
    name: "Editorial Finisher",
    description:
      "Elevates clarity, sculpts highlights, and packages tactical action plans.",
    status: "idle",
    notes: [],
  },
];

const baseForm: FormState = {
  title: "Agents of Imagination",
  author: "Studio Lambda",
  topic: "building AI-powered creative ecosystems",
  audience: "Product builders, strategists, and indie creators",
  tone: "visionary",
  chapters: 6,
  wordsPerChapter: 420,
  brief:
    "Show how multi-agent orchestration can accelerate ideation, design, and storytelling workflows without losing the human voice.",
  includeHighlights: true,
  includeActionPlan: true,
};

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const charCodeSum = (...values: string[]) =>
  values.join("").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

const rotatePick = <T,>(stack: T[], seed: number) =>
  stack[((seed % stack.length) + stack.length) % stack.length];

const formatSlug = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "ebook";

const paragraph = (parts: string[]) =>
  parts.filter(Boolean).join(" ");

const buildResearchInsights = (form: FormState, seed: number) => {
  const horizon = [
    "ecosystem orchestration replacing siloed automation",
    "trust tooling to make AI interpretable and coachable",
    "rituals that keep humans in the creative leadership loop",
    "micro-agents syncing to macro narratives across teams",
    "principles borrowed from world-building and systems design",
    "analytics feedback loops measuring story resonance",
    "playbooks that merge speculative design with delivery velocity",
  ];

  const catalysts = [
    "community-sourced prompts that act like live briefs",
    "modular knowledge graphs binding research and execution",
    "lightweight governance layers to audit emergent behaviors",
    "delight metrics that track moments of user surprise",
    "tempo-based rituals for sprinting from idea to artifact",
    "skill clouds mapping creator strengths to agent roles",
    "story-driven dashboards that narrate progress between agents",
  ];

  const emotionalDrivers = [
    "the fear of being replaced by automation instead of augmented",
    "the hunger to build signature experiences faster than incumbents",
    "the pride of orchestrating technology that feels conversational",
    "the relief of moving from chaotic brainstorming to guided flow",
    "the curiosity to prototype futures without heavy engineering lift",
    "the responsibility to create transparent AI collaborations",
  ];

  const opportunities = [
    "crafting starter kits so new contributors onboard in minutes",
    "teaching teams to debug narratives like they debug code",
    "blending quantitative dashboards with qualitative story labs",
    "packaging rituals into workshops and live cohort programs",
    "anchoring innovation stories in measurable business arcs",
    "using agents to shrink the distance between concept and launch",
  ];

  const insights = [
    paragraph([
      "Signal clusters reveal",
      rotatePick(horizon, seed),
      "as a defining opportunity.",
    ]),
    paragraph([
      "Successful teams choreograph",
      rotatePick(catalysts, seed + 13),
      "to align every agent around the mission.",
    ]),
    paragraph([
      "Emotional voltage comes from addressing",
      rotatePick(emotionalDrivers, seed + 27) + ".",
    ]),
    paragraph([
      "The breakout advantage is won by",
      rotatePick(opportunities, seed + 41) + ".",
    ]),
  ];

  return insights;
};

const buildOutline = (form: FormState, seed: number) => {
  const arcs = [
    "Foundations",
    "Systems Choreography",
    "Creative Rituals",
    "Experiments In Motion",
    "Momentum Mechanics",
    "Scaling The Narrative",
    "Signals And Story",
    "Future Horizons",
  ];
  const verbs = [
    "Igniting",
    "Mapping",
    "Designing",
    "Activating",
    "Elevating",
    "Orchestrating",
    "Harmonizing",
    "Amplifying",
  ];
  const throughlines = [
    "agent teaming",
    "feedback choreography",
    "narrative intelligence",
    "experience craft",
    "adaptive strategy",
    "creative autonomy",
    "insight harvesting",
    "domain mastery",
  ];

  return Array.from({ length: clamp(form.chapters, 3, 12) }).map(
    (_, index) => {
      const anchor = seed + index * 23;
      const verb = rotatePick(verbs, anchor);
      const arc = rotatePick(arcs, anchor + 5);
      const throughline = rotatePick(throughlines, anchor + 11);
      const summary = paragraph([
        `${verb} ${form.topic} by weaving`,
        `${throughline} with ${tonePalettes[form.tone].cadence}.`,
      ]);
      return {
        title: `Chapter ${index + 1}: ${arc}`,
        summary,
        content: [],
        spotlight: "",
      };
    }
  );
};

const craftChapterContent = (
  form: FormState,
  chapter: Chapter,
  index: number,
  seed: number
) => {
  const entryAngles = [
    `The ${form.audience.toLowerCase()} in this chapter confront the myths around ${form.topic}.`,
    `We slow down to map the moving pieces that make ${form.topic} feel slippery.`,
    `Each page treats ${form.topic} as a living studio instead of a static process.`,
    `Practical agency emerges when we script ${form.topic} like a multi-scene montage.`,
  ];

  const tensionAngles = [
    `The friction usually shows up when ambition outpaces instrumentation.`,
    `Teams that race ahead without storyboarded rituals struggle to stay coherent.`,
    `Confusion spikes whenever tools speak in metrics but teams crave meaning.`,
    `Momentum leaks out when creators can't see their fingerprints across the system.`,
  ];

  const resolutionAngles = [
    `Anchoring the work in vivid constraints creates room for daring leaps.`,
    `We stretch into experimentation with guardrails that talk back in real time.`,
    `Momentum builds when the toolkit invites riffing instead of rigid compliance.`,
    `Every iteration loops through reflection, remixing, and renewed commitments.`,
  ];

  const praxisAngles = [
    `Sketch prompt libraries that double as storyboards for every agent.`,
    `Co-create north star dashboards that narrate the customer journey.`,
    `Ship tiny theatre pieces: micro-deliverables that prove the arc is working.`,
    `Host weekly critique salons where agents and humans replay key decisions.`,
  ];

  const integrationAngles = [
    `Fuse qualitative insights with telemetry so the system keeps learning.`,
    `Interleave moments of human review so intuition guides automation.`,
    `Use narrative checkpoints to explain each recommendation before it ships.`,
    `Let every experiment end with a storytelling retrospective to surface texture.`,
  ];

  const measurementAngles = [
    `Tie progress to audience resonance metrics instead of vanity dashboards.`,
    `Track the tempo between ideas, prototypes, and market feedback in weeks.`,
    `Instrument each agent handoff so teams can see where energy compounds.`,
    `Translate data into story beats the executive team can retell with confidence.`,
  ];

  const closingAngles = [
    `The chapter lands on a promise: ${form.topic} can feel like guided improvisation.`,
    `We exit with the reminder that orchestration is a craft, not just automation.`,
    `The invitation is simple: design cues that help technology feel collaborative.`,
    `Creativity scales when we choreograph conversations between people and agents.`,
  ];

  const pickSeed = seed + index * 31;
  const p1 = paragraph([
    rotatePick(entryAngles, pickSeed),
    rotatePick(tensionAngles, pickSeed + 7),
  ]);
  const p2 = paragraph([
    rotatePick(resolutionAngles, pickSeed + 13),
    rotatePick(praxisAngles, pickSeed + 19),
  ]);
  const p3 = paragraph([
    rotatePick(closingAngles, pickSeed + 29),
    form.brief ? `Throughout, we honour the brief: ${form.brief}` : "",
  ]);
  const p4 = paragraph([
    rotatePick(integrationAngles, pickSeed + 23),
    rotatePick(measurementAngles, pickSeed + 41),
  ]);

  const targetParagraphs = clamp(
    Math.round(form.wordsPerChapter / 180),
    3,
    6
  );

  const spotlight = paragraph([
    "Agent Spotlight:",
    `Pair a ${rotatePick(
      ["Signal Scout", "Pattern Archivist", "Story Synthesizer", "Launch Conductor"],
      pickSeed + 17
    )} with a ${rotatePick(
      [
        "Feedback Choreographer",
        "Momentum Coach",
        "Experience Editor",
        "Ethics Custodian",
      ],
      pickSeed + 21
    )} to orchestrate this move.`,
  ]);

  return {
    ...chapter,
    content: [p1, p2, p3, p4, paragraph([
      "Next move:",
      rotatePick(
        [
          "Document what surprised you and feed it back into the agent prompts.",
          "Invite a partner team to stress test the workflow in a live session.",
          "Capture a short behind-the-scenes narrative to share with your community.",
          "Translate the lesson into a reusable template for the wider organization.",
        ],
        pickSeed + 53
      ),
    ])].slice(0, targetParagraphs),
    spotlight,
  };
};

const craftHighlights = (chapters: Chapter[], form: FormState) => {
  const highlightStarters = [
    "Agent handoffs become vibrant when",
    "Creativity scales the moment",
    "Momentum multiplies once",
    "Teams stay calibrated because",
    "Vision translates into delivery when",
    "Unexpected delight appears as soon as",
  ];

  return chapters.slice(0, 6).map((chapter, index) => {
    const start = rotatePick(highlightStarters, index * 5 + chapters.length);
    return `${start} ${chapter.summary
      .replace("This chapter", "the work")
      .replace("we", "teams")} so ${form.audience.toLowerCase()} can move faster with ${form.topic}.`;
  });
};

const craftActionPlan = (form: FormState, seed: number) => {
  const verbs = [
    "Map the agent cohort and name their personalities.",
    "Storyboard one flagship journey with narrative beats and proof points.",
    "Draft the instrumentation ritual that keeps humans in the driver seat.",
    "Prototype a feedback salon and invite cross-functional voices.",
    "Publish a manifesto declaring how the ecosystem creates value together.",
    "Measure resonance using story-aligned metrics instead of vanity dashboards.",
    "Run a live scenario test where agents mediate a customer challenge.",
  ];

  return Array.from({ length: 5 }).map((_, index) =>
    rotatePick(verbs, seed + index * 7)
  );
};

const craftClosing = (form: FormState, seed: number) => {
  const resonances = [
    "The promise is not speed for its own sake, but fidelity to the story you want people to live inside.",
    "When we teach agents to collaborate like ensemble casts, every launch feels like a premiere.",
    "The craft is learning to choreograph possibility without losing the human fingerprints on the work.",
    "The future belongs to studios that can turn intelligence into experiences with warmth and verve.",
  ];

  return rotatePick(resonances, seed);
};

const buildMarkdown = (ebook: Ebook) => {
  const sections = [
    `# ${ebook.title}`,
    `_${ebook.subtitle}_`,
    "",
    `**Author:** ${ebook.author}`,
    `**Audience:** ${ebook.audience}`,
    `**Positioning:** ${ebook.positioning}`,
    "",
    `## Hero Hook`,
    ebook.heroHook,
    "",
    `## Table of Contents`,
    ...ebook.chapters.map((chapter, index) => `${index + 1}. ${chapter.title}`),
    "",
    ...ebook.chapters.flatMap((chapter) => [
      `## ${chapter.title}`,
      `_${chapter.summary}_`,
      "",
      ...chapter.content,
      "",
      `> ${chapter.spotlight}`,
      "",
    ]),
    ebook.highlights.length ? "## Highlights" : "",
    ...ebook.highlights.map((highlight) => `- ${highlight}`),
    ebook.actionPlan.length ? "\n## Action Plan\n" : "",
    ...ebook.actionPlan.map((step, index) => `${index + 1}. ${step}`),
    "\n## Closing Thoughts\n",
    ebook.closing,
  ];

  return sections.filter(Boolean).join("\n");
};

const buildHeroHook = (form: FormState, seed: number) => {
  const tone = tonePalettes[form.tone];
  const hooks = [
    `What if ${form.topic} felt like a stage where ${tone.lexicon} invite audiences to lean forward?`,
    `Imagine ${form.topic} tuned to ${tone.cadence}, delivering momentum to ${form.audience.toLowerCase()}.`,
    `This ebook is a field guide for ${form.audience.toLowerCase()} who want to orchestrate ${form.topic} with elegance.`,
    `A manifesto for anyone ready to script ${form.topic} as a living ecosystem, not a static asset.`,
  ];

  return rotatePick(hooks, seed + 5);
};

export default function Home() {
  const [formState, setFormState] = useState<FormState>(baseForm);
  const [logs, setLogs] = useState<AgentLog[]>(agentBlueprint);
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const seed = useMemo(
    () =>
      charCodeSum(
        formState.title,
        formState.topic,
        formState.audience,
        formState.brief,
        formState.tone
      ) + formState.chapters * 11,
    [formState]
  );

  const updateLogStatus = useCallback((id: string, status: AgentStatus) => {
    setLogs((current) =>
      current.map((agent) =>
        agent.id === id ? { ...agent, status } : agent
      )
    );
  }, []);

  const appendLogNote = useCallback((id: string, note: string) => {
    setLogs((current) =>
      current.map((agent) =>
        agent.id === id
          ? { ...agent, notes: [...agent.notes, note] }
          : agent
      )
    );
  }, []);

  const resetLogs = useCallback(() => {
    setLogs(agentBlueprint.map((agent) => ({ ...agent, notes: [] })));
  }, []);

  const runAgents = useCallback(
    async (form: FormState) => {
      resetLogs();
      setError(null);
      setIsGenerating(true);

      try {
        updateLogStatus("discovery", "working");
        appendLogNote(
          "discovery",
          "Scanning signals, rituals, and use cases across the domain."
        );
        await delay(350);
        const insights = buildResearchInsights(form, seed);
        insights.forEach((insight) =>
          appendLogNote("discovery", `• ${insight}`)
        );
        await delay(200);
        updateLogStatus("discovery", "done");

        updateLogStatus("architecture", "working");
        appendLogNote(
          "architecture",
          "Metabolizing research into an emotionally-resonant structure."
        );
        await delay(320);
        const outline = buildOutline(form, seed + 17);
        outline.forEach((chapter, index) =>
          appendLogNote(
            "architecture",
            `${index + 1}. ${chapter.title} → ${chapter.summary}`
          )
        );
        await delay(260);
        updateLogStatus("architecture", "done");

        updateLogStatus("weaver", "working");
        appendLogNote(
          "weaver",
          "Drafting chapters with calibrated pacing and calls to action."
        );
        await delay(340);
        const draftedChapters = outline.map((chapter, index) =>
          craftChapterContent(form, chapter, index, seed + 37)
        );
        draftedChapters.forEach((chapter) =>
          appendLogNote(
            "weaver",
            `${chapter.title} drafted with ${chapter.content.length} scenes.`
          )
        );
        await delay(200);
        updateLogStatus("weaver", "done");

        updateLogStatus("editorial", "working");
        appendLogNote(
          "editorial",
          "Sculpting highlights, action plans, and a resonant closing."
        );
        const highlights = form.includeHighlights
          ? craftHighlights(draftedChapters, form)
          : [];
        const actionPlan = form.includeActionPlan
          ? craftActionPlan(form, seed + 73)
          : [];
        const closing = craftClosing(form, seed + 89);
        const heroHook = buildHeroHook(form, seed + 101);
        await delay(260);
        appendLogNote(
          "editorial",
          `${highlights.length} highlights and ${actionPlan.length} action steps composed.`
        );
        updateLogStatus("editorial", "done");

        const assembled: Ebook = {
          title: form.title.trim() || "Untitled Ebook",
          subtitle: `An agentic playbook for ${form.topic}`,
          author: form.author.trim() || "Unknown Author",
          theme: form.topic,
          audience: form.audience,
          positioning: `Crafted for ${form.audience.toLowerCase()} with a ${tonePalettes[form.tone].label.toLowerCase()} cadence.`,
          chapters: draftedChapters,
          highlights,
          actionPlan,
          closing,
          heroHook,
        };

        setEbook(assembled);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went sideways in the agent pipeline."
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [
      appendLogNote,
      resetLogs,
      seed,
      updateLogStatus,
      setError,
      setIsGenerating,
      setEbook,
    ]
  );

  const handleGenerate = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await runAgents(formState);
    },
    [runAgents, formState]
  );

  const handleDownload = useCallback(() => {
    if (!ebook) return;
    const blob = new Blob([buildMarkdown(ebook)], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${formatSlug(ebook.title)}.md`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [ebook]);

  const handleCopy = useCallback(async () => {
    if (!ebook) return;
    await navigator.clipboard.writeText(buildMarkdown(ebook));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }, [ebook]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pb-16 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-12 lg:px-8">
        <header className="flex flex-col gap-6 rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Agentic Ebook Studio
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                Launch a swarm of specialist agents to research, architect,
                draft, and polish a publication-ready ebook around your next big
                idea.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
              <SparklesIcon className="h-4 w-4" />
              Multi-Agent Workflow
            </span>
          </div>
          <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Orchestration
              </p>
              <p className="mt-1">
                Discovery → Architecture → Drafting → Editorial finishing, each
                agent leaving traceable notes.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Output
              </p>
              <p className="mt-1">
                Structured chapters, spotlights, highlights, and action plans
                formatted for a ready-to-publish ebook.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Export
              </p>
              <p className="mt-1">Download markdown or copy to clipboard in one click.</p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <section className="flex h-full flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Project Blueprint
              </h2>
              <span className="text-xs font-medium text-slate-500">
                Configure your ebook spec
              </span>
            </div>
            <form className="flex flex-col gap-6" onSubmit={handleGenerate}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-700">Title</span>
                  <input
                    required
                    value={formState.title}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="e.g. Architecting with Agents"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-700">Author</span>
                  <input
                    value={formState.author}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        author: event.target.value,
                      }))
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Your name, team, or studio"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-700">Core Topic</span>
                  <input
                    required
                    value={formState.topic}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        topic: event.target.value,
                      }))
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Describe the central subject"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-700">
                    Primary Audience
                  </span>
                  <input
                    value={formState.audience}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        audience: event.target.value,
                      }))
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Who is this for?"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-700">
                  Creative Brief
                </span>
                <textarea
                  value={formState.brief}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      brief: event.target.value,
                    }))
                  }
                  className="min-h-[120px] rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Key context, promises, or constraints the agents should honor."
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-700">
                    Narrative Tone
                  </span>
                  <select
                    value={formState.tone}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        tone: event.target.value as ToneKey,
                      }))
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    {Object.entries(tonePalettes).map(([value, tone]) => (
                      <option key={value} value={value}>
                        {tone.label}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-500">
                    Voice: {tonePalettes[formState.tone].cadence}
                  </span>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-slate-700">
                      Chapters
                    </span>
                    <input
                      type="number"
                      min={3}
                      max={12}
                      value={formState.chapters}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          chapters: clamp(
                            Number.parseInt(event.target.value, 10),
                            3,
                            12
                          ),
                        }))
                      }
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-slate-700">
                      Words / Chapter
                    </span>
                    <input
                      type="number"
                      min={200}
                      max={800}
                      value={formState.wordsPerChapter}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          wordsPerChapter: clamp(
                            Number.parseInt(event.target.value, 10),
                            200,
                            1000
                          ),
                        }))
                      }
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={formState.includeHighlights}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        includeHighlights: event.target.checked,
                      }))
                    }
                    className="size-4 rounded border border-slate-300 text-indigo-500 focus:ring-indigo-400"
                  />
                  Include highlights reel
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={formState.includeActionPlan}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        includeActionPlan: event.target.checked,
                      }))
                    }
                    className="size-4 rounded border border-slate-300 text-indigo-500 focus:ring-indigo-400"
                  />
                  Include action plan
                </label>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {isGenerating ? (
                  <>
                    <ArrowPathIcon className="h-4 w-4 animate-spin" />
                    Running Agents
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4" />
                    Generate Ebook
                  </>
                )}
              </button>
              {error ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              ) : null}
            </form>
          </section>

          <section className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Agent Activity
                </h2>
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Live Ops Log
                </span>
              </div>
              <div className="mt-4 space-y-4">
                {logs.map((agent) => (
                  <div
                    key={agent.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {agent.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {agent.description}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          agent.status === "done"
                            ? "bg-emerald-100 text-emerald-600"
                            : agent.status === "working"
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {agent.status === "done" ? (
                          <CheckCircleIcon className="h-3.5 w-3.5" />
                        ) : agent.status === "working" ? (
                          <ArrowPathIcon className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <BookOpenIcon className="h-3.5 w-3.5" />
                        )}
                        {agent.status === "done"
                          ? "Complete"
                          : agent.status === "working"
                          ? "In Flight"
                          : "Queued"}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 text-xs text-slate-600">
                      {agent.notes.length ? (
                        agent.notes.map((note, index) => (
                          <li key={index} className="leading-relaxed">
                            {note}
                          </li>
                        ))
                      ) : (
                        <li className="italic text-slate-400">
                          Awaiting output…
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Ebook Preview
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review the draft, copy or export, then take it live wherever
                    you publish.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleCopy}
                    disabled={!ebook}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ClipboardDocumentCheckIcon className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy Markdown"}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!ebook}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    <DocumentArrowDownIcon className="h-4 w-4" />
                    Download .md
                  </button>
                </div>
              </div>

              {ebook ? (
                <article className="mt-5 space-y-6 text-sm leading-relaxed text-slate-700">
                  <header className="space-y-2 rounded-2xl bg-slate-50 px-4 py-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {ebook.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      {ebook.subtitle}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {ebook.author} • Crafted for {ebook.audience}
                    </p>
                  </header>

                  <section className="space-y-2 rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-indigo-700">
                    <p className="text-xs font-semibold uppercase tracking-wide">
                      Hero Hook
                    </p>
                    <p>{ebook.heroHook}</p>
                  </section>

                  <section className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Table of Contents
                    </p>
                    <ol className="space-y-1 text-sm">
                      {ebook.chapters.map((chapter, index) => (
                        <li key={chapter.title} className="text-slate-600">
                          {index + 1}. {chapter.title}
                        </li>
                      ))}
                    </ol>
                  </section>

                  {ebook.chapters.map((chapter) => (
                    <section
                      key={chapter.title}
                      className="rounded-3xl border border-slate-100 bg-white/70 p-5 shadow-inner"
                    >
                      <h4 className="text-lg font-semibold text-slate-900">
                        {chapter.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {chapter.summary}
                      </p>
                      <div className="mt-4 space-y-3 text-sm text-slate-700">
                        {chapter.content.map((paragraphText, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraphText}</p>
                        ))}
                      </div>
                      <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-600">
                        {chapter.spotlight}
                      </p>
                    </section>
                  ))}

                  {ebook.highlights.length ? (
                    <section className="space-y-3 rounded-3xl border border-amber-100 bg-amber-50/70 p-5 text-amber-800">
                      <h4 className="text-sm font-semibold uppercase tracking-wide">
                        Highlights
                      </h4>
                      <ul className="space-y-2 text-sm leading-relaxed">
                        {ebook.highlights.map((highlight, index) => (
                          <li key={index}>• {highlight}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {ebook.actionPlan.length ? (
                    <section className="space-y-3 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 text-emerald-800">
                      <h4 className="text-sm font-semibold uppercase tracking-wide">
                        Action Plan
                      </h4>
                      <ol className="space-y-2 text-sm leading-relaxed">
                        {ebook.actionPlan.map((step, index) => (
                          <li key={index}>
                            <span className="font-semibold text-emerald-600">
                              {index + 1}.
                            </span>{" "}
                            {step}
                          </li>
                        ))}
                      </ol>
                    </section>
                  ) : null}

                  <section className="space-y-2 rounded-3xl border border-slate-100 bg-white/60 p-5">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                      Closing
                    </h4>
                    <p className="text-sm text-slate-700">{ebook.closing}</p>
                  </section>

                  <footer className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1">
                      <SparklesIcon className="h-3.5 w-3.5" />
                      Agent-crafted narrative
                    </span>
                    <a
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700"
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Deploy on Vercel
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                    </a>
                  </footer>
                </article>
              ) : (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 p-12 text-center text-sm text-slate-500">
                  <p className="text-base font-medium text-slate-600">
                    Ready when you are.
                  </p>
                  <p className="mt-2">
                    Configure your blueprint and launch the agents to see a full
                    ebook preview here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
