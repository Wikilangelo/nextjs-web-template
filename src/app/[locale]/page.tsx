import { getTranslations, setRequestLocale } from "next-intl/server";
import { submitContact } from "@/actions/contact";
import { ContactForm } from "@/components/forms/contact-form";
import type { Locale } from "@/i18n/routing";

type HomePageProps = {
	params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	const t = await getTranslations("HomePage");
	const services = [
		{
			title: t("service1Title"),
			description: t("service1Description"),
		},
		{
			title: t("service2Title"),
			description: t("service2Description"),
		},
		{
			title: t("service3Title"),
			description: t("service3Description"),
		},
	];
	const benefits = [
		{
			title: t("benefit1Title"),
			description: t("benefit1Description"),
		},
		{
			title: t("benefit2Title"),
			description: t("benefit2Description"),
		},
		{
			title: t("benefit3Title"),
			description: t("benefit3Description"),
		},
	];

	return (
		<main className="min-h-screen bg-background text-foreground">
			<header className="sticky top-0 z-20 border-border/70 border-b bg-background/95 backdrop-blur">
				<nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
					<a className="font-semibold text-base" href="#hero">
						{t("brandName")}
					</a>
					<div className="hidden items-center gap-6 text-muted-foreground text-sm md:flex">
						<a className="transition-colors hover:text-foreground" href="#services">
							{t("navServices")}
						</a>
						<a className="transition-colors hover:text-foreground" href="#why-us">
							{t("navWhyUs")}
						</a>
						<a className="transition-colors hover:text-foreground" href="#contact">
							{t("navContact")}
						</a>
					</div>
					<a
						className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 font-medium text-primary-foreground text-sm shadow-sm transition-colors hover:bg-primary/90"
						href="#contact"
					>
						{t("navCta")}
					</a>
				</nav>
			</header>

			<section id="hero" className="border-border/60 border-b">
				<div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-center lg:py-28">
					<div className="max-w-3xl space-y-8">
						<div className="space-y-5">
							<p className="font-medium text-muted-foreground text-sm uppercase">{t("eyebrow")}</p>
							<h1 className="text-balance font-semibold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
								{t("heroTitle")}
							</h1>
							<p className="max-w-2xl text-base text-muted-foreground leading-7 sm:text-lg">
								{t("heroDescription")}
							</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<a
								className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 font-medium text-primary-foreground text-sm shadow-sm transition-colors hover:bg-primary/90"
								href="#contact"
							>
								{t("primaryCta")}
							</a>
							<a
								className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-5 font-medium text-sm transition-colors hover:bg-muted"
								href="#services"
							>
								{t("secondaryCta")}
							</a>
						</div>
					</div>

					<div className="rounded-lg border border-border bg-muted/40 p-6 shadow-sm">
						<div className="space-y-6">
							<p className="font-medium text-muted-foreground text-sm">{t("heroCardLabel")}</p>
							<div className="space-y-3">
								<p className="font-semibold text-2xl">{t("heroCardTitle")}</p>
								<p className="text-muted-foreground text-sm leading-6">
									{t("heroCardDescription")}
								</p>
							</div>
							<div className="grid gap-3 text-sm sm:grid-cols-2">
								<div className="rounded-md border border-border bg-background p-4">
									<p className="font-medium">{t("heroDetail1Title")}</p>
									<p className="mt-1 text-muted-foreground">{t("heroDetail1Text")}</p>
								</div>
								<div className="rounded-md border border-border bg-background p-4">
									<p className="font-medium">{t("heroDetail2Title")}</p>
									<p className="mt-1 text-muted-foreground">{t("heroDetail2Text")}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="services" className="border-border/60 border-b bg-muted/25 py-20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="max-w-2xl space-y-3">
						<p className="font-medium text-muted-foreground text-sm uppercase">
							{t("servicesEyebrow")}
						</p>
						<h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
							{t("servicesTitle")}
						</h2>
						<p className="text-muted-foreground leading-7">{t("servicesDescription")}</p>
					</div>
					<div className="mt-10 grid gap-4 md:grid-cols-3">
						{services.map((service) => (
							<article
								className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm"
								key={service.title}
							>
								<h3 className="font-semibold text-lg">{service.title}</h3>
								<p className="mt-3 text-muted-foreground text-sm leading-6">
									{service.description}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section id="why-us" className="border-border/60 border-b py-20">
				<div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
					<div className="max-w-xl space-y-3">
						<p className="font-medium text-muted-foreground text-sm uppercase">{t("whyEyebrow")}</p>
						<h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">{t("whyTitle")}</h2>
						<p className="text-muted-foreground leading-7">{t("whyDescription")}</p>
					</div>
					<div className="grid gap-4">
						{benefits.map((benefit, index) => (
							<article
								className="flex gap-4 rounded-lg border border-border p-5"
								key={benefit.title}
							>
								<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">
									{index + 1}
								</div>
								<div>
									<h3 className="font-semibold">{benefit.title}</h3>
									<p className="mt-1 text-muted-foreground text-sm leading-6">
										{benefit.description}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section id="contact" className="bg-muted/25 py-20">
				<div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(22rem,1fr)] lg:items-start">
					<div className="max-w-xl space-y-4">
						<p className="font-medium text-muted-foreground text-sm uppercase">
							{t("contactEyebrow")}
						</p>
						<h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
							{t("contactTitle")}
						</h2>
						<p className="text-muted-foreground leading-7">{t("contactDescription")}</p>
					</div>
					<div className="flex justify-center lg:justify-end">
						<ContactForm onSubmit={submitContact} />
					</div>
				</div>
			</section>

			<footer className="border-border/60 border-t">
				<div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
					<p>
						{t("footerBrand")} · {t("footerRights")}
					</p>
					<div className="flex gap-4">
						<span>{t("footerPrivacy")}</span>
						<span>{t("footerCookies")}</span>
					</div>
				</div>
			</footer>
		</main>
	);
}
