import axios from 'axios'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

function OrganizingMode(props) {
  const deleteMeeting = async () => {
    await axios.delete('http://localhost:8000/api/meetings/' + props.id)
  }
  return (
    <div className="flex gap-4 absolute top-4 right-12 ">
      <AiOutlineEdit
        className="text-3xl stroke-slate-500"
        onClick={() => console.log('sad')}
      />
      <AiOutlineDelete
        className="text-3xl stroke-slate-500"
        onClick={deleteMeeting}
      />
    </div>
  )
}

export default OrganizingMode
