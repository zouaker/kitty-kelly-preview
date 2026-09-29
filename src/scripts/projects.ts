// Progressive enhancement: without JavaScript, every project remains visible.
function setupProjects() {
  const selector = document.querySelector<HTMLElement>(".project-selector");
  const stage = document.querySelector<HTMLElement>(".project-stage");
  if (!selector || !stage || selector.dataset.ready) return;
  selector.dataset.ready = "true";
  const buttons = [
    ...selector.querySelectorAll<HTMLButtonElement>(
      "button[data-project-choice]",
    ),
  ];
  const panels = [
    ...stage.querySelectorAll<HTMLElement>("[data-project-panel]"),
  ];
  function select(id: string) {
    document.dispatchEvent(new Event("kitty:stop-films"));
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.projectChoice === id),
      ),
    );
    panels.forEach((panel) => {
      const inactive = panel.dataset.projectPanel !== id;
      panel.hidden = inactive;
    });
  }
  buttons.forEach((button) =>
    button.addEventListener("click", () =>
      select(button.dataset.projectChoice!),
    ),
  );
  stage.classList.add("is-enhanced");
  selector.hidden = false;
  select(buttons[0].dataset.projectChoice!);
}
document.addEventListener("astro:page-load", setupProjects);
setupProjects();
