//Data
const NavsData = [
    {
        icon: "material-symbols:dashboard",
        name: "Dashboard",
        url: "/",
        id: "dashboard"
    },
    {
        icon: "mdi:book-open-blank-variant",
        name: "Academics",
        url: "/academics",
        id: "academics",
        sub: [
            { name: "Section", url: "/academics/section", id: "section" },
            { name: "Group", url: "/academics/group", id: "group" },
            { name: "Class", url: "/academics/class", id: "class" },
            { name: "Class Room", url: "/academics/class-room", id: "classRoom" },
            { name: "Period", url: "/academics/period", id: "period" },
            { name: "Class Routine", url: "/academics/class-routine", id: "cRoutine" },
            { name: "Teacher Routine", url: "/academics/teacher-routine", id: "tRoutine" }
        ]
    },
    {
        icon: "mdi:people-group",
        name: "Students",
        url: "/students",
        id: "students",
        sub: [
            { name: "Add Student", url: "/students/add-student", id: "addStudent" },
            { name: "Promote Student", url: "/students/promote-student", id: "promoteStudent" },
            { name: "Student List", url: "/students/student-list", id: "studentList" }
        ]
    },
    {
        icon: "ic:round-people",
        name: "Staff",
        url: "/staff",
        id: "staff",
        sub: [
            { name: "Add Teacher", url: "/staff/add-teacher", id: "addTeacher" },
            { name: "Teacher List", url: "/staff/teacher-list", id: "teacherList" }
        ]
    },
    {
        icon: "mdi:file-document",
        name: "Attendance",
        url: "/attendance",
        id: "attendance",
        sub: [
            { name: "Add Attendance", url: "/attendance/add-teacher", id: "addAttendance" },
            { name: "Attendance Report", url: "/attendance/attendance-report", id: "attendanceReport" }
        ]
    },
    {
        icon: "material-symbols:credit-card",
        name: "Fee",
        url: "/fee",
        id: "fee"
    },
    {
        icon: "material-symbols:settings",
        name: "Settings",
        url: "/settings",
        id: "settings"
    }
]

export default NavsData