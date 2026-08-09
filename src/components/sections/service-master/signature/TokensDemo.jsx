"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { downloadFile } from "@/lib/demo-mail";
import {
  DEFAULT_TOKENS,
  DENSITY_OPTIONS,
  FONT_OPTIONS,
  TOKEN_GROUPS,
  buildTokens,
  renderDesignExport,
} from "@/lib/design-export";
import {
  DemoPanel,
  DemoControls,
  DemoButton,
  DemoLabel,
  DemoSlider,
  DemoSegmented,
  DemoToggle,
  DemoEmailForm,
  DemoConsole,
} from "./demo-shell";
import DeviceOutlet from "./DeviceOutlet";

/**
 * The design-system editor on /services/ui-ux-design.
 *
 * Preview, download, and emailed attachment are all the same string. The editor
 * does not render a React approximation of the exported page, it renders the
 * export itself, into an iframe via `srcdoc`. So what you are looking at is
 * literally the file you get when you press Download; there is no gap for the
 * two to drift apart in, because there are not two things.
 *
 * The exported stylesheet has exactly one block containing raw values, the
 * `:root` token layer. Every rule beneath it reads from that block and mentions
 * no colour, size, or radius of its own. That constraint is the argument the
 * demo exists to make, and you can check it: open the file and search for a hex
 * code below `:root`. There are none.
 */

const VIEWS = [
  { id: "preview", label: "Preview" },
  { id: "tokens", label: "Tokens" },
  { id: "source", label: "Source" },
];

const DEVICES = [
  { id: "phone", label: "Phone" },
  { id: "tablet", label: "Tablet" },
  { id: "full", label: "Desktop" },
];

const PRESETS = [
  { id: "default", label: "House", tokens: DEFAULT_TOKENS },
  {
    id: "editorial",
    label: "Editorial",
    tokens: { hue: 14, radius: 2, space: 26, scaleStep: 133, dark: false, font: "serif", density: "comfortable" },
  },
  {
    id: "console",
    label: "Console",
    tokens: { hue: 158, radius: 6, space: 14, scaleStep: 115, dark: true, font: "mono", density: "compact" },
  },
  {
    id: "soft",
    label: "Consumer",
    tokens: { hue: 286, radius: 28, space: 24, scaleStep: 122, dark: false, font: "geometric", density: "comfortable" },
  },
];

export default function TokensDemo({ color }) {
  const a = accent(color);

  const [tokens, setTokens] = useState(DEFAULT_TOKENS);
  const [view, setView] = useState("preview");
  const [device, setDevice] = useState("full");

  const set = (key) => (value) => setTokens((prev) => ({ ...prev, [key]: value }));

  // One render feeds the iframe, the download, and the byte count. Memoised
  // because it is a few kilobytes of string building on every slider tick.
  const html = useMemo(() => renderDesignExport(tokens), [tokens]);
  const resolved = useMemo(() => buildTokens(tokens), [tokens]);

  const cssVariables = useMemo(
    () =>
      `:root {\n${Object.entries(resolved)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join("\n")}\n}`,
    [resolved]
  );

  const bytes = new Blob([html]).size;

  const activePreset = PRESETS.find((preset) =>
    Object.keys(preset.tokens).every((key) => preset.tokens[key] === tokens[key])
  );

  return (
    <DemoPanel>
      <DemoControls>
        <DemoSegmented color={color} label="Panel" value={view} options={VIEWS} onChange={setView} />
        <div className="flex items-center gap-2">
          <DemoLabel>Preset</DemoLabel>
          {PRESETS.map((preset) => (
            <DemoButton
              key={preset.id}
              color={color}
              active={activePreset?.id === preset.id}
              onClick={() => setTokens(preset.tokens)}
            >
              {preset.label}
            </DemoButton>
          ))}
        </div>
      </DemoControls>

      <div className="grid gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        {/* ── the control rail ── */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <p className="mb-4 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Token layer
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <DemoSlider
                  label="Hue"
                  value={tokens.hue}
                  min={0}
                  max={359}
                  onChange={set("hue")}
                  format={(v) => `${v}°`}
                />
                <div
                  className="mt-2 h-2 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(0 68% 46%), hsl(60 68% 46%), hsl(120 68% 46%), hsl(180 68% 46%), hsl(240 68% 46%), hsl(300 68% 46%), hsl(359 68% 46%))",
                  }}
                />
              </div>

              <DemoSlider
                label="Radius"
                value={tokens.radius}
                min={0}
                max={40}
                onChange={set("radius")}
                format={(v) => `${v}px`}
              />
              <DemoSlider
                label="Spacing"
                value={tokens.space}
                min={8}
                max={40}
                onChange={set("space")}
                format={(v) => `${v}px`}
              />
              <DemoSlider
                label="Scale"
                value={tokens.scaleStep}
                min={105}
                max={140}
                onChange={set("scaleStep")}
                format={(v) => `${(v / 100).toFixed(2)}×`}
              />

              {/* Stacked: the rail is 260px and a four-option pill will clip
                  rather than wrap. */}
              <DemoSegmented
                color={color}
                stacked
                label="Type"
                value={tokens.font}
                options={FONT_OPTIONS.map((f) => ({ id: f.id, label: f.label }))}
                onChange={set("font")}
              />
              <DemoSegmented
                color={color}
                stacked
                label="Density"
                value={tokens.density}
                options={DENSITY_OPTIONS.map((d) => ({ id: d.id, label: d.label }))}
                onChange={set("density")}
              />
              <DemoToggle color={color} checked={tokens.dark} onChange={set("dark")} label="Dark" />
            </div>
          </div>

          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <p className="mb-3 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Export
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => downloadFile("logixloops-design-system.html", html)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 font-label text-label-caps uppercase tracking-widest transition-colors",
                  a.soft,
                  a.text,
                  a.ring
                )}
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Download HTML
              </button>
              <DemoButton
                color={color}
                onClick={() =>
                  downloadFile("tokens.css", cssVariables, "text/css;charset=utf-8")
                }
              >
                Download tokens.css
              </DemoButton>
              <p className="font-body text-body-sm text-on-surface-variant">
                {(bytes / 1024).toFixed(1)} KB · no dependencies, no build step.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
            <p className="mb-2 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Email it to yourself
            </p>
            <DemoEmailForm
              color={color}
              template="design-export"
              payload={() => tokens}
              stacked
              cta="Send file"
              hint="The exact file, attached. Sent over SMTP, one message, nothing stored."
            />
          </div>
        </div>

        {/* ── the panel ── */}
        <div className="flex min-w-0 flex-col gap-3">
          {view === "preview" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <DemoLabel>Outlet</DemoLabel>
                {DEVICES.map((option) => (
                  <DemoButton
                    key={option.id}
                    color={color}
                    active={device === option.id}
                    onClick={() => setDevice(option.id)}
                  >
                    {option.label}
                  </DemoButton>
                ))}
                <span className="ml-auto font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  This is the exported file, rendered
                </span>
              </div>

              {/* Zooms to fit rather than scrolling, so the whole document is
                  on the board at once and no scrollbar sits over the artwork. */}
              <DeviceOutlet device={device} html={html} boardHeight={660} />
            </>
          )}

          {view === "tokens" && (
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
              <p className="mb-4 font-body text-body-sm leading-relaxed text-on-surface-variant">
                {Object.keys(resolved).length} resolved custom properties. Every one of them is
                derived from the seven controls on the left, which is why a rebrand is a number,
                not a sprint.
              </p>

              <div className="flex flex-col gap-5">
                {TOKEN_GROUPS.map((group) => {
                  const entries = Object.entries(resolved).filter(([key]) => group.match(key));
                  if (entries.length === 0) return null;
                  return (
                    <div key={group.name}>
                      <p className="mb-2 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {group.name}
                      </p>
                      <div className="grid gap-1.5 sm:grid-cols-2">
                        {entries.map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-surface px-2.5 py-1.5"
                          >
                            {group.name === "Colour" && (
                              <span
                                className="h-4 w-4 shrink-0 rounded border border-outline-variant/40"
                                style={{ background: value }}
                              />
                            )}
                            <span className={cn("shrink-0 font-mono text-[10px]", a.text)}>{key}</span>
                            <span className="truncate font-mono text-[10px] text-on-surface-variant">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === "source" && (
            <DemoConsole title={`logixloops-design-system.html · ${(bytes / 1024).toFixed(1)} KB`} className="max-h-[620px]">
              <pre className="whitespace-pre-wrap break-words">{html}</pre>
            </DemoConsole>
          )}
        </div>
      </div>

      <p className="px-6 pb-6 font-body text-body-md leading-relaxed text-on-surface-variant">
        Nothing in the preview was restyled by hand. Move a slider and the whole document follows,
        because every rule below <span className="font-mono">:root</span> reads a token instead of a
        value. <span className={a.text}>Download it and check</span>, the preview, the file, and the
        emailed attachment are the same string.
      </p>
    </DemoPanel>
  );
}
