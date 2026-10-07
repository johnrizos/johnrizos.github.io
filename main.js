// Screen stepper: each tab names the desktop and mobile screenshot to show side by side.
for (const stepper of document.querySelectorAll('[data-stepper]')) {
  const tabs = [...stepper.querySelectorAll('[data-desktop]')];
  const title = stepper.dataset.stepper;

  const select = (tab) => {
    const label = tab.textContent.replace(/^\d+ · /, '');
    for (const t of tabs) t.setAttribute('aria-selected', String(t === tab));
    for (const kind of ['desktop', 'mobile']) {
      const src = tab.dataset[kind];
      const img = stepper.querySelector(`[data-img="${kind}"]`);
      img.src = src;
      img.alt = `${kind === 'desktop' ? 'Desktop' : 'Mobile'}: ${label}, ${title}`;
      stepper.querySelector(`[data-full="${kind}"]`).href = src;
    }
    stepper.querySelector('.phone-frame a').scrollTop = 0;
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const next = { ArrowRight: i + 1, ArrowLeft: i - 1 }[e.key];
      if (next === undefined) return;
      const target = tabs[(next + tabs.length) % tabs.length];
      target.focus();
      select(target);
    });
  });

  // Warm the cache so switching screens is instant.
  for (const t of tabs) for (const kind of ['desktop', 'mobile']) new Image().src = t.dataset[kind];
}
