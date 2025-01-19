export const Button = ({
    disabled,
    children,
    onClick
}) => {
return <span onClick = {onClick} className={`px-32 py-8 rounded-2xl text-white cursor-pointer ${disabled ? "bg-blue-300" : "bg-red-300"}`}>
        {children}
    </span>
}