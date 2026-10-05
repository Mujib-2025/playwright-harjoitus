const { test, expect } = require("@playwright/test");
test("sivulla näkyy otsikko", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(
    page.getByRole("heading", {
      name: "Tehtävälista",
    }),
  ).toBeVisible();
});

test("Siis käyttäjä vois lisätä tehtävän", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByLabel("uus tehtävä").fill("Opiskele Playwrightia");
  await page
    .getByRole("button", {
      name: "Äddä",
    })
    .click();
  await expect(page.getByText("Opiskele Playwrightia")).toBeVisible();
});

test("lomakekenttä tyhjennetään tehtävän lisäämisen jälkeen", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");
  await page.getByLabel("uus tehtävä").fill("Osta kahvia");
  await page
    .getByRole("button", {
      name: "Äddä",
    })
    .click();
  await expect(page.getByLabel("uus tehtävä")).toHaveValue("");
});

test("tyhjää tehtävää ei voi lisätä", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page
    .getByRole("button", {
      name: "Äddä",
    })
    .click();
  await expect(
    page.getByText("Omd Bro tehtävä ei voi olla tyhjä! 🤦‍♂️"),
  ).toBeVisible();
});

test("3 tehtävii vois lisätä ja ne näkyvät listalla", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByLabel("uus tehtävä").fill("Opiskele JavaScriptia");
  await page.getByRole("button", { name: "Äddä" }).click();

  await page.getByLabel("uus tehtävä").fill("Opiskele Node.js:ää");
  await page.getByRole("button", { name: "Äddä" }).click();

  await page.getByLabel("uus tehtävä").fill("Opiskele Playwrightia");
  await page.getByRole("button", { name: "Äddä" }).click();

  await expect(page.getByText("Opiskele JavaScriptia")).toBeVisible();
  await expect(page.getByText("Opiskele Node.js:ää")).toBeVisible();
  await expect(page.getByText("Opiskele Playwrightia")).toBeVisible();

  const tasks = page.locator("#task-list li");
  await expect(tasks).toHaveCount(3);
});

test("kaks tehtävii vois lisätä peräkkäin ja vahvistusviesti näky", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  await page.getByLabel("uus tehtävä").fill("Ensimmäinen tehtävä");
  await page.getByRole("button", { name: "Äddä" }).click();

  await page.getByLabel("uus tehtävä").fill("Toinen tehtävä");
  await page.getByRole("button", { name: "Äddä" }).click();

  await expect(page.getByText("Ensimmäinen tehtävä")).toBeVisible();
  await expect(page.getByText("Toinen tehtävä")).toBeVisible();

  const tasks = page.locator("#task-list li");
  await expect(tasks).toHaveCount(2);

  await expect(page.getByLabel("uus tehtävä")).toHaveValue("");

  await expect(page.getByText("Tehtävä lisätty.")).toBeVisible();
});
