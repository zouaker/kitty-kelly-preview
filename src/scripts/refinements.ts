let dispose = () => {};

function setupRefinements() {
  dispose();
  const controller = new AbortController();
  const { signal } = controller;
  const header = document.querySelector<HTMLElement>(".site-header");
  const strip = document.querySelector<HTMLElement>(".contact-strip");
  let headerFrame = 0;
  const updateHeader = () => {
    if (header) {
      const height = strip?.offsetHeight || 0;
      header.style.top = Math.max(0, height - window.scrollY) + "px";
      header.classList.toggle("is-scrolled", window.scrollY >= height);
    }
    headerFrame = 0;
  };
  const requestHeader = () => {
    if (!headerFrame) headerFrame = requestAnimationFrame(updateHeader);
  };
  window.addEventListener("scroll", requestHeader, { passive: true, signal });
  window.addEventListener("resize", requestHeader, { passive: true, signal });
  document.addEventListener(
    "click",
    (event) => {
      document
        .querySelectorAll<HTMLDetailsElement>(
          ".nav-disclosure[open],.mobile-menu[open]",
        )
        .forEach((menu) => {
          if (!menu.contains(event.target as Node)) menu.open = false;
        });
    },
    { signal },
  );
  updateHeader();

  const ribbon = document.querySelector<HTMLElement>("[data-client-ribbon]");
  let destroyRibbon = () => {};
  if (ribbon) destroyRibbon = setupRibbon(ribbon, signal);
  dispose = () => {
    controller.abort();
    cancelAnimationFrame(headerFrame);
    destroyRibbon();
  };
}

function setupRibbon(ribbon: HTMLElement, signal: AbortSignal) {
  const viewport = ribbon.querySelector<HTMLElement>(".ribbon-viewport")!;
  const group = ribbon.querySelector<HTMLElement>(".ribbon-group")!;
  const toggle = ribbon.querySelector<HTMLButtonElement>(
    "[data-ribbon-toggle]",
  )!;
  const controls = ribbon.querySelector<HTMLElement>(".ribbon-controls")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0,
    raf = 0,
    last = 0,
    visible = false,
    paused = reduced.matches,
    focused = false;
  let speed = 28,
    targetSpeed = 28,
    pointer: number | null = null,
    startX = 0,
    startY = 0,
    lastX = 0,
    dragging = false;
  let resumeAt = 0;
  let subpixel = 0;
  let direction = 1;
  let lastPointerTime = 0;
  let releaseSpeed = 28;
  ribbon.classList.add("is-ready");
  controls.hidden = false;
  const normalise = () => {
    if (!width) return;
    if (viewport.scrollLeft < width * 0.5) viewport.scrollLeft += width;
    else if (viewport.scrollLeft > width * 1.5) viewport.scrollLeft -= width;
  };
  const measure = () => {
    const old = width;
    width = group.getBoundingClientRect().width;
    viewport.scrollLeft = old ? (viewport.scrollLeft / old) * width : width;
  };
  const updateToggle = () => {
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute(
      "aria-label",
      reduced.matches
        ? "Automatic movement disabled for reduced motion"
        : paused
          ? "Play automatic logo movement"
          : "Pause automatic logo movement",
    );
    toggle.querySelector("span")!.textContent = reduced.matches
      ? "Paused"
      : paused
        ? "Play"
        : "Pause";
    toggle.disabled = reduced.matches;
  };
  const canRun = () =>
    visible && !document.hidden && !paused && !focused && !reduced.matches;
  const tick = (now: number) => {
    raf = 0;
    const dt = Math.min((now - last) / 1000 || 0, 0.04);
    last = now;
    if (!dragging && pointer === null && now > resumeAt) {
      speed += (targetSpeed - speed) * Math.min(1, dt * 2.5);
      // Keep fractional travel: scrollLeft rounds small deltas on some browsers.
      subpixel += speed * dt;
      const travel = Math.trunc(subpixel);
      subpixel -= travel;
      viewport.scrollLeft += travel;
      normalise();
    }
    if (canRun()) raf = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (!canRun()) {
      cancelAnimationFrame(raf);
      raf = 0;
      return;
    }
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  };
  const step = (nextDirection: number) => {
    direction = nextDirection;
    speed = targetSpeed = direction * 28;
    viewport.scrollLeft += direction * 180;
    normalise();
    resumeAt = performance.now() + 1800;
  };
  toggle.addEventListener(
    "click",
    () => {
      paused = !paused;
      updateToggle();
      sync();
    },
    { signal },
  );
  ribbon
    .querySelector("[data-ribbon-prev]")!
    .addEventListener("click", () => step(-1), { signal });
  ribbon
    .querySelector("[data-ribbon-next]")!
    .addEventListener("click", () => step(1), { signal });
  viewport.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        step(event.key === "ArrowRight" ? 1 : -1);
      }
    },
    { signal },
  );
  viewport.addEventListener(
    "pointerdown",
    (event) => {
      if (event.button !== 0) return;
      focused = false;
      sync();
      pointer = event.pointerId;
      startX = lastX = event.clientX;
      startY = event.clientY;
      lastPointerTime = performance.now();
      releaseSpeed = 28;
      dragging = false;
    },
    { signal },
  );
  viewport.addEventListener(
    "pointermove",
    (event) => {
      if (pointer === event.pointerId) {
        if (
          !dragging &&
          Math.abs(event.clientX - startX) > 6 &&
          Math.abs(event.clientX - startX) > Math.abs(event.clientY - startY)
        ) {
          dragging = true;
          viewport.setPointerCapture(event.pointerId);
          viewport.classList.add("is-dragging");
        }
        if (dragging) {
          const delta = lastX - event.clientX;
          const now = performance.now();
          if (Math.abs(delta) > 0.2) {
            direction = Math.sign(delta);
            releaseSpeed = Math.min(260, Math.max(28, Math.abs(delta) / Math.max(0.008, (now - lastPointerTime) / 1000)));
          }
          lastPointerTime = now;
          viewport.scrollLeft += delta;
          normalise();
        }
        lastX = event.clientX;
      } else if (event.pointerType === "mouse") {
        const bounds = viewport.getBoundingClientRect();
        targetSpeed =
          direction * (28 +
          Math.abs((event.clientX - bounds.left) / bounds.width - 0.5) * 160);
      }
    },
    { signal },
  );
  const finish = (event: PointerEvent) => {
    if (pointer !== event.pointerId) return;
    if (viewport.hasPointerCapture(event.pointerId))
      viewport.releasePointerCapture(event.pointerId);
    if (dragging) {
      speed = direction * releaseSpeed;
      subpixel = 0;
    }
    pointer = null;
    dragging = false;
    viewport.classList.remove("is-dragging");
    resumeAt = 0;
    targetSpeed = direction * 28;
    sync();
  };
  window.addEventListener("pointerup", finish, { signal });
  viewport.addEventListener("pointercancel", finish, { signal });
  viewport.addEventListener(
    "pointerleave",
    () => {
      targetSpeed = direction * 28;
    },
    { signal },
  );
  viewport.addEventListener("scroll", normalise, { passive: true, signal });
  viewport.addEventListener(
    "wheel",
    () => {
      resumeAt = performance.now() + 1500;
    },
    { passive: true, signal },
  );
  viewport.addEventListener(
    "focus",
    () => {
      focused = viewport.matches(":focus-visible");
      sync();
    },
    { signal },
  );
  viewport.addEventListener(
    "blur",
    () => {
      focused = false;
      sync();
    },
    { signal },
  );
  document.addEventListener("visibilitychange", sync, { signal });
  reduced.addEventListener(
    "change",
    () => {
      paused = reduced.matches;
      updateToggle();
      sync();
    },
    { signal },
  );
  const resize = new ResizeObserver(measure);
  resize.observe(viewport);
  const observer = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    sync();
  });
  observer.observe(ribbon);
  measure();
  updateToggle();
  return () => {
    cancelAnimationFrame(raf);
    resize.disconnect();
    observer.disconnect();
  };
}

document.addEventListener("astro:before-swap", () => dispose());
document.addEventListener("astro:page-load", setupRefinements);
setupRefinements();
