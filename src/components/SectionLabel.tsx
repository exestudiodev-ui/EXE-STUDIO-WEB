interface SectionLabelProps {
  number: string;
  text: string;
}

export function SectionLabel({ number, text }: SectionLabelProps) {
  return (
    <p className="font-inter font-medium text-xs uppercase tracking-[0.15em] text-teal-accent mb-4">
      {number} / {text}
    </p>
  );
}
