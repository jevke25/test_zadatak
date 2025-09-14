import { Navigate } from 'react-router-dom'

export default function CompanyRoute({ children }) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') // 'company' | 'candidate'

  if (!token) return <Navigate to="/login" replace />
  if (role !== 'company') return <Navigate to="/home" replace />

  return children
}
