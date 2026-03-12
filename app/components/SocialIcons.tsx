import { Github, Instagram, Linkedin } from 'lucide-react';

interface SocialIconsProps {
  className?: string;
  size?: number;
}

export default function SocialIcons({ className, size = 16 }: SocialIconsProps) {
  return (
    <ul className={`text-muted-foreground flex list-none gap-3 ${className ?? ''}`}>
      <li>
        <a href="https://github.com/mciccarelli" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <Github size={size} />
        </a>
      </li>
      <li>
        <a href="https://x.com/mciccarelli" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
      </li>
      <li>
        <a href="https://instagram.com/mciccarelli" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <Instagram size={size} />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/mciccarelli/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <Linkedin size={size} />
        </a>
      </li>
    </ul>
  );
}
