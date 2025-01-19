export const Input = ({
    type,
    placeholder
}) => {
    return <span className={`p-8 text-white cursor-pointer bg-[#173f6a] rounded-2xl`}>
        <input type={type} placeholder={placeholder} className="bg-[#173f6a] outline-none"></input>
    </span>
}