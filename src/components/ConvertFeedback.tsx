interface ConvertFeedbackProps {
  message: string;
}

export default function ConvertFeedback({ message }: ConvertFeedbackProps) {
  return <p className="text-center text-red-400">{message}</p>;
}
