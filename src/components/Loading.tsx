interface LoadingProps {
  color?: string;
}

export default function Loading({ color }: LoadingProps) {
  return (
    <div
      className="spinner-1"
      style={{ borderColor: color || "#000 transparent" }}
    />
  );
}
