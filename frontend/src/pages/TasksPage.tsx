import { AdminTaskView, ManagerTaskView, UserTaskView } from '../components/tasks'
import { useAuth } from '../contexts/useAuth'

export default function TasksPage() {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case 'Admin':
      return <AdminTaskView />
    case 'Manager':
      return <ManagerTaskView />
    default:
      return <UserTaskView />
  }
}
