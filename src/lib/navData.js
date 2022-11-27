import HomeIcon from '@mui/icons-material/Home';
import Person3Icon from '@mui/icons-material/Person3';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Dashboard",
        link: "/dashboard"
    },
    {
        id: 1,
        icon: <Person3Icon/>,
        text: "Profile",
        link: "/profile"
    },
    {
        id: 2,
        icon: <BarChartIcon/>,
        text: "Units",
        link: "/myunits"
    },
    {
        id: 3,
        icon: <PeopleAltIcon/>,
        text: "Students",
        link: "/students"
    },
    {
        id: 4,
        icon: <AssignmentIcon />,
        text: "Statistics",
        link: "/statistics"
    },
]