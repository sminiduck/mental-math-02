export function renderTextWithMath(container, text) {
  container.replaceChildren();

  const regex = /\$(.*?)\$/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text))) {
    const plainText = text.slice(lastIndex, match.index);

    if (plainText) {
      container.append(document.createTextNode(plainText));
    }

    const span = document.createElement('span');

    katex.render(match[1], span, {
      throwOnError: false,
    });

    container.append(span);

    lastIndex = regex.lastIndex;
  }

  const remaining = text.slice(lastIndex);

  if (remaining) {
    container.append(document.createTextNode(remaining));
  }
}
