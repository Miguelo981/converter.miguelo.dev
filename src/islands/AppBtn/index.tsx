type AppBtnProps = {
    text: string;
    onClick: () => void
}

export const AppBtn = ({ onClick, text }: AppBtnProps) => {
    return (
        <button className="text-4xl p-4 rounded-lg border border-black bg-slate-400 text-white" onClick={onClick}>{text}</button>
    )
}