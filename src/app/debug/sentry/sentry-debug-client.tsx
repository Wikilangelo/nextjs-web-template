"use client";

import Link from "next/link";

type SentryDebugClientProps = {
	appEnv: "development" | "staging" | "production";
};

export function SentryDebugClient({ appEnv }: SentryDebugClientProps) {
	function generateClientError() {
		setTimeout(() => {
			throw new Error("Sentry debug client error");
		}, 0);
	}

	return (
		<main style={{ maxWidth: 720, margin: "48px auto", padding: "0 24px", lineHeight: 1.5 }}>
			<h1>Sentry Debug</h1>
			<p>
				Smoke test temporaneo per verificare l’inizializzazione client di Sentry nel runtime
				React/Next.js.
			</p>
			<p>
				APP_ENV corrente: <code>{appEnv}</code>
			</p>
			<p>
				In development Sentry è disabilitato, quindi il test client non deve inviare eventi. In
				staging deve arrivare con <code>environment=staging</code>.
			</p>
			<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
				<button
					type="button"
					onClick={generateClientError}
					style={{
						padding: "10px 14px",
						border: "1px solid #111",
						borderRadius: 8,
						background: "#111",
						color: "#fff",
						cursor: "pointer",
					}}
				>
					Genera errore client
				</button>
				<Link
					href="/debug/sentry/server-error"
					style={{
						display: "inline-block",
						padding: "10px 14px",
						border: "1px solid #111",
						borderRadius: 8,
						background: "#111",
						color: "#fff",
						textDecoration: "none",
					}}
				>
					Genera errore server
				</Link>
			</div>
		</main>
	);
}
