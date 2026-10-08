import { Fragment, type ReactNode } from 'react';

// turns [label](href) in plain copy into links
export function renderInlineLinks(text: string): ReactNode[] {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    // site paths stay in the tab; everything else opens a new one
    const external = !match[2].startsWith('/');
    nodes.push(
      <a
        key={key++}
        href={match[2]}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {match[1]}
      </a>,
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}
