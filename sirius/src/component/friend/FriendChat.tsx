import { ChatContent } from "../chat/ChatContent";
import { useClientId } from "../store/FriendStore";

export const FriendChat =()=>{
   const {clientId, deleteClientId, setClientId}=useClientId();

    return(
        <div className="">
            <ChatContent/>
        </div>
    );
}