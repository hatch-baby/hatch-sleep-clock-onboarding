import { HscOnboardingFlow } from "./hsc/HscOnboardingFlow";
import { BlankPrototype } from "./prototype/BlankPrototype";
import { OnboardingPrototype } from "./prototype/OnboardingPrototype";
import { wireframe } from "./prototype/wireframeTokens";

function prototypeFromSearch(): "hsc" | "night" | "new" {
  const p = new URLSearchParams(window.location.search).get("p");
  if (p === "night") return "night";
  if (p === "new" || p === "blank") return "new";
  return "hsc";
}

export default function App() {
  const which = prototypeFromSearch();

  if (which === "hsc") {
    return <HscOnboardingFlow />;
  }

  const pageStyle = {
    minHeight: "100vh",
    margin: 0,
    display: "grid",
    placeItems: "center",
    padding: "24px 16px",
    background: wireframe.canvas,
  } as const;

  return (
    <main style={pageStyle}>
      {which === "night" ? <OnboardingPrototype /> : <BlankPrototype />}
    </main>
  );
}
