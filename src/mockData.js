import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { v4 as uuidv4 } from 'uuid'

const mockData = [
    {
        id: uuidv4(),
        title: ' 📃 To do',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn JavaScript',
                description:"javaScript description",
                date:"2023-10-10",
            },
            {
                id: uuidv4(),
                title: 'Learn Git',
                description:"Git description",
                date:"2023-10-10",
            },
            {
                id: uuidv4(),
                title: 'Learn Python',
                description:"Python description",
                date:"2023-10-10",
            },
        ]
    },
    {
        id: uuidv4(),
        title: ' ✏️ In progress',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn CSS',
                description:"CSS description",
                date:"2023-10-10",
            },
            {
                id: uuidv4(),
                title: 'Learn Golang',
                description:"Golang description",
                date:"2023-10-10",
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Completed',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML',
                description:"HTML description",
                date:"2023-10-10",
            }
        ]
    }
]

export default mockData

export const menuItem = [
   
    {
        path: "/boards",
        name: "Boards",
        icon:  <PeopleAltOutlinedIcon />
    },
    {
        path: "/manage",
        name: "Manage",
        icon: <ManageHistoryIcon  />
    },
    {
        path: "/schedule",
        name: "Schedule",
        icon: <AccessTimeSharpIcon  />
    },
    {
        path: "/reports",
        name: "Reports",
        icon: <ShoppingBagOutlinedIcon />
    },
       
]