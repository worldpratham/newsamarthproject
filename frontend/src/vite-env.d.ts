/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        direction?: 'up' | 'down' | 'left' | 'right';
        scrollamount?: number | string;
        scrolldelay?: number | string;
        behavior?: 'scroll' | 'slide' | 'alternate';
        loop?: number | string;
        onmouseover?: string | (() => void);
        onmouseout?: string | (() => void);
        width?: string | number;
        height?: string | number;
      },
      HTMLElement
    >;
  }
}
