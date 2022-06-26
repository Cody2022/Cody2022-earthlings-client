import React, { useEffect } from 'react'

const Conversation = ({ conversation, currentUser }) => {
    console.log(`convo is:`, conversation)
    // const [user, setUser] = useState(null);

    //Get the user
    useEffect(() => {
         const chatMembers = conversation.members.find(member => member !== currentUser.email);
        console.log(chatMembers);
    },[])

  return (
    <div>Ryan</div>
  )
}

export default Conversation