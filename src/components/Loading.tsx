import "../assets/scss/global.scss";

type LoadingProps = {
    color?: string;
}

export default function Loading({ color }: LoadingProps) {
    return (
        <div className="spinner-1" style={ { borderColor: color ? color : "#000 transparent" }} />
    )
}