import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
	test("renders the local business landing sections", async ({ page }) => {
		await page.goto("/");
		await expect(
			page.getByRole("heading", {
				level: 1,
				name: "Una presenza online elegante per raccontare [Nome attività].",
			}),
		).toBeVisible();
		await expect(page.getByRole("link", { name: "Servizi", exact: true })).toBeVisible();
		await expect(
			page.getByRole("heading", { name: "Tre aree chiare per presentare cosa offri." }),
		).toBeVisible();
		await expect(
			page.getByRole("heading", { name: "Fiducia, chiarezza e attenzione al cliente." }),
		).toBeVisible();
		await expect(
			page.getByRole("heading", { name: "Raccogli richieste da clienti interessati." }),
		).toBeVisible();
	});

	test("loads the English version at /en", async ({ page }) => {
		await page.goto("/en");
		await expect(
			page.getByRole("heading", {
				level: 1,
				name: "An elegant online presence for [Business name].",
			}),
		).toBeVisible();
		await expect(page.getByRole("link", { name: "Services", exact: true })).toBeVisible();
		await expect(
			page.getByRole("heading", { name: "Three clear areas to present what you offer." }),
		).toBeVisible();
	});

	test("loads the Italian version at /", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByRole("link", { name: "Contattaci" })).toBeVisible();
		await expect(page.getByText("[Nome attività]")).toHaveCount(3);
	});
});
