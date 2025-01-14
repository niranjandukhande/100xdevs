import{atom,selector} from "recoil";
import axios from "axios";

export const notifications = atom({
    key: "networkAtom",
    defautl: selector({
        key: "networkAtomSelector",
        get: async()=>{
            const res = await axios.get("https://sum-server.100xdevs.com/notifications")
            return res.data
        }
    })
})

export const totolNotificationSelector = selector({
    key:"totalNotificationSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.network+
        allNotifications.jobs+
        allNotifications.messaging+
        allNotifications.notifications
    }
})