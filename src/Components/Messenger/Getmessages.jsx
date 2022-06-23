import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Getmessages = (props) => {
    const params = useParams();
    const id = params.id;
    const [conversation, setConversation] = useState([]);

    //Fetch all the conversations of that user
    useEffect(() => {
        const getConversation = async () => {
            try {
                const response = await fetch(
                  `/conversation/62a8bc6a5a6a080011440231`
                );
                console.log(response);
                const data = await response.json();
                console.log(data);
                setConversation(data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversation();
    }, [id])
  return (
    <div>Getmessages</div>
  )
}

export default Getmessages